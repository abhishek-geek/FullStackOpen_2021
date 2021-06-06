import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import notifReducer from "./notifReducer";
import blogReducer from "./blogReducer";
import userReducer from "./userReducer";
import usersReducer from "./usersReducer";

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notifReducer,
  user: userReducer,
  users: usersReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
