import loginServices from "../services/login";
import setNotification from "./notifReducer";

const reducer = (state = null, action) => {
  switch (action.type) {
    case "INIT_USER": {
      console.log("init user data", action.data);
      return action.data;
    }
    case "SET_USER": {
      console.log("SET_USER data", action.data);
      return action.data;
    }
    default:
      return state;
  }
};

export const login = (user) => {
  return async (dispatch) => {
    console.log("user", user);
    const data = await loginServices.login(user);
    console.log("data", data);
    window.localStorage.setItem("user", JSON.stringify(data));
    dispatch({
      type: "INIT_USER",
      data,
    });
    dispatch(
      setNotification({ type: "info", body: `Welcome ${data.name}` }, 10)
    );
    return data.name;
  };
};

export const setUser = (user) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_USER",
      data: user,
    });
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({
      type: "REMOVE_USER",
    });
  };
};

export default reducer;
