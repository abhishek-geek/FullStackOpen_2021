import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import {
  TextField,
  DiagnosisSelection,
  NumberField,
} from "../AddPatientModal/FormField";
import { EntryFormValues, HealthCheckRating } from "../types";
import { useStateValue } from "../state";

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isValidDate = (date: any): boolean => {
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    if (!date.match(regEx)) return false;
    const d = new Date(date);
    const dNum = d.getTime();
    if (!dNum && dNum !== 0) return false;
    return d.toISOString().slice(0, 10) === date;
  };
  const validate = (values: EntryFormValues) => {
    const requiredError = "Field is required";
    let errors:
      | { [field: string]: string }
      | {
          [key: string]: {
            [key: string]: string;
          };
        } = {};
    if (!values.description) {
      errors.description = requiredError;
    }
    if (!isValidDate(values.date)) {
      errors.date = "Date is required in the format YYYY-MM-DD";
    }
    if (!values.specialist) {
      errors.specialist = requiredError;
    }
    if (
      ![-1].includes(values.healthCheckRating) &&
      ![0, 1, 2, 3].includes(values.healthCheckRating)
    ) {
      errors.healthCheckRating =
        "Please provide value between 0 and 3 or -1 if none";
    }
    if (
      (values.sickLeave?.startDate || values.sickLeave?.endDate) &&
      !values.employerName &&
      [-1].includes(values.healthCheckRating)
    ) {
      errors.employerName = requiredError;
    }

    if (
      values.sickLeave?.startDate &&
      values.sickLeave?.endDate &&
      values.employerName &&
      values.healthCheckRating >= -1 &&
      (!isValidDate(values.sickLeave?.startDate) ||
        !isValidDate(values.sickLeave?.endDate))
    ) {
      errors = {
        ...errors,
        sickLeave: {
          startDate: "date must be in YYYY-MM-DD format.",
        },
      };
    }

    if (
      values.discharge?.date &&
      !values.employerName &&
      values.healthCheckRating >= -1 &&
      !isValidDate(values.discharge?.date)
    ) {
      errors = {
        ...errors,
        discharge: {
          date: "date must be in YYYY-MM-DD format.",
        },
      };
    }

    if (
      (values.employerName && values.discharge?.date) ||
      (values.employerName && values.discharge?.criteria)
    ) {
      errors = {
        ...errors,
        discharge: {
          date: "discharge date and/or criteria is not allowed in Occupational health entry",
        },
      };
    }
    if (![-1].includes(values.healthCheckRating) && values.employerName) {
      errors = {
        ...errors,
        employerName: "not allowed in Healthcheck entry",
      };
    }
    if (
      (![-1].includes(values.healthCheckRating) &&
        values.sickLeave?.startDate) ||
      (![-1].includes(values.healthCheckRating) && values.sickLeave?.endDate) ||
      (![-1].includes(values.healthCheckRating) && values.discharge.criteria) ||
      (![-1].includes(values.healthCheckRating) && values.employerName)
    ) {
      errors = {
        ...errors,
        sickLeave: {
          startDate: "not allowed in Healthcheck entry",
          endDate: "not allowed in Healthcheck entry",
        },
        discharge: {
          date: "not allowed in Healthcheck entry",
          criteria: "not allowed in Healthcheck entry",
        },
      };
    }
    if (
      (values.employerName &&
        values.healthCheckRating === HealthCheckRating.Healthy) ||
      (values.employerName &&
        values.healthCheckRating === HealthCheckRating.LowRisk) ||
      (values.employerName &&
        values.healthCheckRating === HealthCheckRating.HighRisk) ||
      (values.employerName &&
        values.healthCheckRating === HealthCheckRating.CriticalRisk)
    ) {
      errors.employerName = "not allowed in Healthcheck entry";
    }
    return errors;
  };

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: -1,
        employerName: "",
        sickLeave: { startDate: "", endDate: "" },
        discharge: { date: "", criteria: "" },
      }}
      onSubmit={onSubmit}
      validate={validate}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />

            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="healthCheckRating"
              name="healthCheckRating"
              component={NumberField}
              min={-1}
              max={3}
            />

            <Field
              label="Employer Name"
              placeholder="Employer Name"
              name="employerName"
              component={TextField}
            />

            <div>
              <div>
                <Field
                  label="SickLeave Start Date"
                  placeholder="Start Date"
                  name="sickLeave.startDate"
                  component={TextField}
                />
              </div>
              <Field
                label="SickleaveEnd Date"
                placeholder="SickLeave End Date"
                name="sickLeave.endDate"
                component={TextField}
              />
            </div>

            <div>
              <div>
                <Field
                  label="Discharge Date"
                  placeholder="Discharge Date"
                  name="discharge.date"
                  component={TextField}
                />
              </div>
              <Field
                label="Discharge criteria"
                placeholder="Discharge criteria"
                name="discharge.criteria"
                component={TextField}
              />
            </div>

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
