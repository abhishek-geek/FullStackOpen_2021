import React from "react";
import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <div>
      {parts.map((part) => {
        return <Part part={part} />;
      })}
    </div>
  );
};

export default Content;
