import React from "react";

const Persons = ({ showPersons }) => {
  return (
    <div>
      {showPersons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
};

export default Persons;
