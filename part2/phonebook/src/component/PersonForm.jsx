import React from "react";

const PersonForm = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

export default PersonForm;
