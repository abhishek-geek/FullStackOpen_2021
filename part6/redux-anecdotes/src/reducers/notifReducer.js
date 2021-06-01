let tid = null;
const reducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION": {
      return action.data;
    }
    case "REMOVE_NOTIFICATION": {
      return null;
    }
    default: {
      return state;
    }
  }
};

// export const setNotification = (message, delay) => {
//   console.log(message);
//   console.log(delay);
//   return (dispatch) => {
//     dispatch({
//       type: "SET_NOTIFICATION",
//       data: {
//         message,
//       },
//     });
//     dispatch(removeNotification(delay));
//   };
// };

// export const removeNotification = (delay) => {
//   console.log(delay);
//   return (dispatch) => {
//     setInterval(() => {
//       dispatch({
//         type: "REMOVE_NOTIFICATION",
//       });
//     }, delay * 1000);
//   };
// };

export const setNotification = (message, delay) => {
  if (tid != null) clearTimeout(tid);
  console.log(message);
  console.log(delay);
  return (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      data: {
        message,
      },
    });
    tid = setTimeout(() => {
      dispatch(removeNotification());
    }, delay * 1000);
  };
};

export const removeNotification = () => {
  return {
    type: "REMOVE_NOTIFICATION",
  };
};

export default reducer;
