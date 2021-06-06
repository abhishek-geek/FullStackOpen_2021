import React from "react";
import { useSelector } from "react-redux";
import { Alert } from "@material-ui/lab";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  // console.log(notification);
  if (notification === null) {
    return null;
  }
  if (notification.type === "info") {
    return <Alert severity="success">{notification.body}</Alert>;
  } else {
    return <Alert severity="error">{notification.body}</Alert>;
  }
};

export default Notification;
