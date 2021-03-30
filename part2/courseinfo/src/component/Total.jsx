import React from "react";

const Total = ({ parts }) => {
  return (
    <b>
      total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises
    </b>
  );
};

export default Total;
