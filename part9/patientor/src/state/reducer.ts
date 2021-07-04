import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_PATIENT_SSN";
      payload: Patient;
    }
  | {
      type: "ADD_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      payload: Patient;
    };

// Action creater functions
export const addEntry = (newEntry: Patient): Action => {
  return {
    type: "ADD_ENTRY",
    payload: newEntry,
  };
};

export const setPatientList = (payload: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload,
  };
};

export const addPatient = (payload: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload,
  };
};

export const addPatientSSN = (payload: Patient): Action => {
  return {
    type: "ADD_PATIENT_SSN",
    payload,
  };
};

export const addDiagnosisList = (payload: Diagnosis[]): Action => {
  return {
    type: "ADD_DIAGNOSIS_LIST",
    payload,
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "ADD_PATIENT_SSN":
      return {
        ...state,
        patientsWithSSN: {
          ...state.patientsWithSSN,
          [action.payload.id]: action.payload,
        },
      };
    case "ADD_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
        },
      };
    case "ADD_ENTRY":
      return {
        ...state,
        patientsWithSSN: {
          ...state.patientsWithSSN,
          [action.payload.id]: action.payload,
        },
      };
    default:
      return state;
  }
};
