import React from "react";

import { CoursePart } from "../types";

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case "normal": {
      return (
        <div>
          <p>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </p>
          <p>
            <i>{part.description}</i>
          </p>
        </div>
      );
    }
    case "groupProject": {
      return (
        <div>
          <p>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </p>
          <p>
            project exercises: <span>{part.groupProjectCount}</span>
          </p>
        </div>
      );
    }
    case "submission": {
      return (
        <div>
          <p>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </p>
          <p>
            <i>{part.description}</i>
          </p>
          <p>
            submit to:{" "}
            <a href={part.exerciseSubmissionLink}>
              {part.exerciseSubmissionLink}
            </a>
          </p>
        </div>
      );
    }
    case "special": {
      return (
        <div>
          <p>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </p>
          <p>
            <i>{part.description}</i>
          </p>
          Requirements: {Object.values(part.requirements).join(",")}
        </div>
      );
    }
  }
};

export default Part;
