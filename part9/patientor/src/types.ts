export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type EntryWithoutId =
  | Omit<OccupationalHealthcareEntry, "id">
  | Omit<HospitalEntry, "id">
  | Omit<HealthCheckEntry, "id">;

// type UnionOmit<T, K extends string | number | symbol> = T extends unknown
//   ? Omit<T, K>
//   : never;
// type DistributiveOmit<T, K extends keyof any> = T extends any
//   ? Omit<T, K>
//   : never;
// export declare type Without<T, K extends keyof T> = Pick<
//   T,
//   Exclude<keyof T, K>
// >;
export interface EntryFormValues {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
  discharge: {
    date: string;
    criteria: string;
  };
  employerName: string;
  sickLeave: {
    startDate: string;
    endDate: string;
  };
  healthCheckRating: HealthCheckRating;
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: Entry[];
}
