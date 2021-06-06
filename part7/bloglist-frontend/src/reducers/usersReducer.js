import userServices from "../services/users";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "SET_USERS": {
      console.log(action.data);
      return action.data;
    }

    default:
      return state;
  }
};

export const setUsers = () => {
  return async (dispatch) => {
    const data = await userServices.getAll();
    dispatch({
      type: "SET_USERS",
      data,
    });
  };
};

export default reducer;
