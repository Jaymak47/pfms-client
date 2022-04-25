import React from "react";
import Form from "react-bootstrap/Form";

const Select = ({
  name,
  label,
  options,
  error,
  placeholder,
  defaultValue,
  ...rest
}) => {
  return (
    <div className="form-group">
      <Form.Select
        name={name}
        id={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...rest}
      >
        <option value="" />
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </Form.Select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
