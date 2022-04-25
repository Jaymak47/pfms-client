import React from "react";
import { FormGroup } from "react-bootstrap";
import { FormControl } from "react-bootstrap";

const Input = ({ name, label, error, placeholder, type = "text", ...rest }) => {
  return (
    <div>
      <FormGroup>
        <label htmlFor={name}>{label}</label>
        <FormControl
          name={name}
          id={name}
          {...rest}
          placeholder={placeholder}
          type={type}
        />

        {error && <div className="alert alert-danger">{error}</div>}
      </FormGroup>
    </div>
  );
};

export default Input;
