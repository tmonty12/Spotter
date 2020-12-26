import React from "react";

const ErrorMessage = ({ text }) => {
  return <div className="invalid-feedback">{text}</div>;
};

export default ErrorMessage;
