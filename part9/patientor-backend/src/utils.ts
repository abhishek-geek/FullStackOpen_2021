import { NewPatient, Gender, EntryWithoutId } from "../types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (str: unknown): string => {
  if (!str || !isString(str)) {
    throw new Error("Invalid or undefined string");
  }
  return str;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (str: any): str is Gender => {
  return Object.values(Gender).includes(str);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing weather: " + gender);
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatientEntry = (obj: any): NewPatient => {
  const name = parseString(obj.name);
  const dateOfBirth = parseDate(obj.dateOfBirth);
  const ssn = parseString(obj.ssn);
  const gender = parseGender(obj.gender);
  const occupation = parseString(obj.occupation);
  const newEntry: NewPatient = {
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  };
  return newEntry;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (obj: any): EntryWithoutId => {
  console.log(obj);

  const description = parseString(obj.description);
  const date = parseDate(obj.date);
  const specialist = parseString(obj.specialist);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const newEntry: EntryWithoutId = {
    ...obj,
    description,
    date,
    specialist,
  };
  return newEntry;
};
