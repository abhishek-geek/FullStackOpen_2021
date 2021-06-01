import axios from "axios";
import React from "react";
import { useDispatch, connect } from "react-redux";
import { add, sort } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notifReducer";
// import anecService from "../services/anecService";

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch();

  const addNew = async (e) => {
    e.preventDefault();
    const content = e.target.new.value;
    props.add(content);
    props.sort();
    props.setNotification(`added ${e.target.new.value}`, 5);
    // dispatch(add(content));
    // dispatch(sort());
    // dispatch(setNotification(`added ${e.target.new.value}`, 5));
    e.target.new.value = "";
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addNew}>
        <div>
          <input name="new" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

const mapStateToProp = (state) => {
  return null;
};

const mapDispatcherToProp = {
  add,
  sort,
  setNotification,
};

const ConnectedAnecdoteForm = connect(
  mapStateToProp,
  mapDispatcherToProp
)(AnecdoteForm);

export default ConnectedAnecdoteForm;
