import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FormControl } from "react-bootstrap";

const FormInput = ({
  name,
  value,
  placeholder,
  onChange,
  type,
  required,
  error,
}) => {
  return (
    <div>
      <FormControl
        required={required}
        value={value}
        onChange={onChange}
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default FormInput;
