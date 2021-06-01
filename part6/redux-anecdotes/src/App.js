import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import anecService from "./services/anecService";
import { initializeAnec } from "./reducers/anecdoteReducer";

import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
  const dispatch = useDispatch();

  useEffect(async () => {
    const anecdotes = await anecService.getAll();
    dispatch(initializeAnec(anecdotes));
  }, []);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
