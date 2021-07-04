import React from "react";
import { Course } from "../types";

interface TotalProps {
  parts: Course[];
}

const Total = ({ parts }: TotalProps) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};

export default Total;
