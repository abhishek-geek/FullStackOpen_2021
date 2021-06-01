import React from "react";
import { useSelector, connect } from "react-redux";

const Notification = (props) => {
  // const notification = useSelector((state) => state.notification);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return (
    <>
      {/* {" "} */}
      {props.notification && (
        <div style={style}>{props.notification.message}</div>
      )}
    </>
  );
};

const mapStateToProp = (state) => {
  return {
    notification: state.notification,
  };
};

const ConnectedNotification = connect(mapStateToProp)(Notification);

export default ConnectedNotification;
