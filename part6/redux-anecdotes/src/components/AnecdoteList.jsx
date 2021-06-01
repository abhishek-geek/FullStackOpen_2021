import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseVote, sort, filterAnec } from "../reducers/anecdoteReducer";
import { setNotification, removeNotification } from "../reducers/notifReducer";

const AnecdoteForm = () => {
  // const filter = useSelector((state) => state.filter);
  const anecdotes = useSelector(({ filter, anecdote }) => {
    if (filter === null || filter === "") return anecdote;
    const newState = anecdote.filter((s) =>
      s.content.toLowerCase().includes(filter)
    );
    return newState;
  });
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log(filter);
  //   dispatch(filterAnec(filter));
  // }, [filter]);

  const vote = (id) => {
    console.log("vote", id);
    dispatch(increaseVote(id));
    dispatch(sort());
    dispatch(
      setNotification(
        `you voted ${anecdotes.filter((a) => a.id === id)[0].content}`,
        5
      )
    );
    // setTimeout(() => {
    //   dispatch(removeNotification());
    // }, 3000);
  };
  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteForm;
