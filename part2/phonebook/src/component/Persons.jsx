import React from "react";

const Persons = ({ person, deletePerson }) => {
  return (
    <div key={person.id}>
      {person.name} {person.number}{" "}
      <button onClick={deletePerson}>delete</button>
    </div>
  );
};

export default Persons;
