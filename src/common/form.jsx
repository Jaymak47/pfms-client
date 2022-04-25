import React from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

function Form1({ schema, doSubmit, data, errors, setErrors }) {
  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);
    if (!error) return null;

    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    setErrors({ errors: errors || {} });
    if (errors) return;

    doSubmit();
  };

  const handleChange = ({ currentTarget: input }) => {
    const errors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };
}

function renderButton(label) {
  return (
    <button disabled={this.validate()} className="btn btn-primary">
      {label}
    </button>
  );
}

function renderSelect(name, placeholder, defaultValue, options) {
  return (
    <Select
      name={name}
      value={this.data[name]}
      placeholder={placeholder}
      defaultValue={defaultValue}
      options={options}
      onChange={this.handleChange}
      error={this.errors[name]}
    />
  );
}

function renderInput(name, placeholder, type) {
  return (
    <Input
      type={type}
      name={name}
      value={this.data[name]}
      placeholder={placeholder}
      onChange={this.handleChange}
      error={this.errors[name]}
    />
  );
}

export { renderButton, renderInput, renderSelect };
