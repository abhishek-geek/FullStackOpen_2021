import patientData from "../../data/patients";
// import patientData from "../../data/patients.json";
import {
  Entry,
  EntryWithoutId,
  NewPatient,
  Patient,
  PatientEntry,
} from "../../types";
import { v1 as uuid } from "uuid";
// import { T } from "../../types";

const patients: Array<Patient> = patientData;
type T = Omit<PatientEntry, "ssn">;

const getEntries = (): T[] => {
  console.log("before", patients);

  const pat = patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
  console.log("after", patients);

  return pat;
};

const addEntry = (entry: NewPatient): PatientEntry => {
  const newEntry: PatientEntry = {
    id: uuid(),
    ...entry,
  };
  return newEntry;
};

const findById = (id: string): Patient | undefined => {
  let patient = patients.find((p) => p.id === id);

  if (patient && !patient?.entries)
    patient = {
      ...patient,
      entries: [],
    };

  return patient;
};

const update = (id: string, entry: EntryWithoutId): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  const newEntry: Entry = {
    id: uuid(),
    ...entry,
  };
  patient?.entries?.push(newEntry);
  return patient;
};

export default {
  getEntries,
  addEntry,
  findById,
  update,
};
