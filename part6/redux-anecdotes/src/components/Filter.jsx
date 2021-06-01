import React from "react";
import { connect, useDispatch } from "react-redux";

const Filter = (props) => {
  // const dispatch = useDispatch();
  const handleChange = (event) => {
    const string = event.target.value;
    // dispatch({ type: "SET_FILTER", data: string });
    props.filter(string);
  };
  const style = {
    margin: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

const mapDispatcherToProp = {
  filter: (string) => {
    return { type: "SET_FILTER", data: string };
  },
};
const ConnectedFilter = connect(null, mapDispatcherToProp)(Filter);

export default ConnectedFilter;
