import anecService from "../services/anecService";

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD": {
      return state.concat(action.data);
    }
    case "VOTE": {
      // const id = action.data.id;
      // const prevState = state.find((s) => s.id === id);
      // const newState = { ...prevState, votes: prevState.votes + 1 };
      // return state.map((s) => (s.id != id ? s : newState));
      return state.map((s) => (s.id != action.data.id ? s : action.data));
    }
    case "SORT": {
      console.log("goind to sort");
      const newState = state.sort((a, b) => (a.votes < b.votes ? 1 : -1));
      console.log(newState);
      return newState;
    }
    case "FILTER": {
      console.log("going to filter");
      if (action.filter === null || action.filter === "") return initialState;
      const newState = state.filter((s) =>
        s.content.toLowerCase().includes(action.filter)
      );
      return newState;
    }
    case "INIT_ANEC": {
      const newState = action.data.sort((a, b) => (a.votes < b.votes ? 1 : -1));
      return newState;
    }
    default: {
      const newState = state.sort((a, b) => (a.votes < b.votes ? 1 : -1));
      return newState;
    }
  }
};

export const add = (content) => {
  return async (dispatch) => {
    const anecdote = await anecService.create(content);
    dispatch({
      type: "ADD",
      data: anecdote,
    });
  };
};

export const increaseVote = (id) => {
  return async (dispatch) => {
    const anec = await anecService.increaseVote(id);
    console.log(anec);
    dispatch({
      type: "VOTE",
      data: anec,
    });
  };
};

export const sort = () => {
  console.log("reached sort action");
  return {
    type: "SORT",
    data: {},
  };
};

export const filterAnec = (string) => {
  return {
    type: "FILTER",
    filter: string,
  };
};

export const initializeAnec = (anecdotes) => {
  return async (dispatch) => {
    const anecdotes = await anecService.getAll();
    dispatch({
      type: "INIT_ANEC",
      data: anecdotes,
    });
  };
};

export default reducer;
