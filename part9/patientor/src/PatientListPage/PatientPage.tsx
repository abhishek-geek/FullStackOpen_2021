import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Container, Icon } from "semantic-ui-react";
import {
  addDiagnosisList,
  addEntry,
  addPatientSSN,
  useStateValue,
} from "../state";
import { apiBaseUrl } from "../constants";
import { Diagnosis, Entry, EntryFormValues, Patient } from "../types";
import EntryDetails from "../components/EntryDetails";
import AddEntryModal from "../AddEntryModal";

const PatientPage = () => {
  const [{ patientsWithSSN, diagnoses }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => setModalOpen(false);

  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const patient = patientsWithSSN[id];

    if (!patient) {
      console.log("adding");

      const fetchPatient = async () => {
        try {
          const { data: patient } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          console.log(patient.entries);

          // dispatch({ type: "ADD_PATIENT_SSN", payload: patient });
          dispatch(addPatientSSN(patient));
        } catch (e) {
          console.error(e);
        }
      };
      void fetchPatient();
    }
    if (Object.keys(diagnoses).length === 0) {
      const fetchDiagnoses = async () => {
        try {
          const { data: diagnoses } = await axios.get<Diagnosis[]>(
            `${apiBaseUrl}/diagnoses/`
          );
          console.log(diagnoses);

          // dispatch({ type: "ADD_PATIENT_SSN", payload: patient });
          dispatch(addDiagnosisList(diagnoses));
        } catch (e) {
          console.error(e);
        }
      };
      void fetchDiagnoses();
    }
  }, []);

  const pat = patientsWithSSN[id];

  //ddd
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getEntryType = (values: any) => {
    let type;
    if (values.healthCheckRating !== -1) {
      type = "HealthCheck";
    } else if (values.employerName !== "") {
      type = "OccupationalHealthcare";
    } else {
      type = "Hospital";
    }

    return type;
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    let entry;
    const type = getEntryType(values);
    console.log("entry type", type);
    console.log("Form Values", values);

    if (type === "OccupationalHealthcare") {
      if (
        values.sickLeave &&
        values.sickLeave.startDate !== "" &&
        values.sickLeave.endDate !== ""
      ) {
        entry = { ...values, type };
        console.log(entry);
      } else {
        entry = { ...values, type, sickLeave: undefined };
      }
    } else if (type === "Hospital") {
      if (
        values.discharge &&
        values.discharge.date !== "" &&
        values.discharge.criteria !== ""
      ) {
        entry = { ...values, type };
      } else {
        entry = { ...values, type, discharge: undefined };
      }
    } else if (type === "HealthCheck") {
      entry = { ...values, type, discharge: undefined, sickLeave: undefined };
    }
    console.log(entry);

    try {
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        entry
      );

      console.log({ newEntry });
      dispatch(addEntry(newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      // setError(e.response.data.error);
    }
  };
  //dddddd

  if (pat)
    return (
      <div className="App">
        <Container>
          <h1>
            {pat.name}
            {pat.gender === "male" ? (
              <Icon name="mars" />
            ) : (
              <Icon name="venus" />
            )}
          </h1>
          <div>ssn: {pat.ssn}</div>
          <div>occupation: {pat.occupation}</div>
          <h2>entries</h2>
          {pat.entries &&
            pat.entries.map((e: Entry) => (
              <EntryDetails key={e.id} entry={e} />
            ))}
          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            onClose={closeModal}
          />
          <Button onClick={() => openModal()}>Add New Entry</Button>
        </Container>
      </div>
    );

  return <Icon loading name="spinner" />;
};

export default PatientPage;
