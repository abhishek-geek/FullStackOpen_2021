import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import anecReducer from "./anecdoteReducer";
import notifReducer from "./notifReducer";

const filterReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_FILTER": {
      //   console.log(("filter ", action.data));
      return action.data;
    }
    default: {
      return state;
    }
  }
};

const reducer = combineReducers({
  anecdote: anecReducer,
  notification: notifReducer,
  filter: filterReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
