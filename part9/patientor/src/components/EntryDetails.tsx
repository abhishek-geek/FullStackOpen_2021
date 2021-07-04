import React from "react";
import { Message, Icon, SemanticCOLORS } from "semantic-ui-react";
import {
  Entry,
  HealthCheckEntry,
  HealthCheckRating,
  OccupationalHealthcareEntry,
} from "../types";
import { useStateValue } from "../state";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Hospital: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Message size="big" key={entry.id}>
      <Message.Header>
        {entry.date} <Icon name="stethoscope" />{" "}
      </Message.Header>
      <div>{entry.description}</div>
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>
            {code}: <span>{diagnoses[code]?.name}</span>
          </li>
        ))}
      </ul>
    </Message>
  );
};

const OccupationalHealthcare: React.FC<{ entry: OccupationalHealthcareEntry }> =
  ({ entry }) => {
    return (
      <Message size="big" key={entry.id}>
        <Message.Header>
          {entry.date} <Icon name="stethoscope" /> {entry.employerName}
        </Message.Header>
        <div>{entry.description}</div>
      </Message>
    );
  };

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  let heartColor: SemanticCOLORS;
  // let heartColor: "green" | "yellow" | "orange" | "red" | "black";
  const rating = entry.healthCheckRating;

  switch (rating) {
    case HealthCheckRating["Healthy"]:
      heartColor = "green";
      break;
    case HealthCheckRating["LowRisk"]:
      heartColor = "yellow";
      break;
    case HealthCheckRating["HighRisk"]:
      heartColor = "orange";
      break;
    case HealthCheckRating["CriticalRisk"]:
      heartColor = "red";
      break;
    default:
      heartColor = "black";
      break;
  }

  return (
    <Message size="big" key={entry.id}>
      <Message.Header>
        {entry.date} <Icon name="user md" />
      </Message.Header>
      <div>{entry.description}</div>
      <Icon name="heart" color={heartColor} />
    </Message>
  );
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "Hospital": {
      return <Hospital entry={entry} />;
    }
    case "OccupationalHealthcare": {
      return <OccupationalHealthcare entry={entry} />;
    }
    case "HealthCheck": {
      return <HealthCheck entry={entry} />;
    }
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
