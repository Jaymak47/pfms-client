import React from "react";

const renderInput = (name, placeholder, type) => {
  return (
    <Input
      type={type}
      name={name}
      value={data[name]}
      placeholder={placeholder}
      onChange={handleChange}
      error={errors[name]}
    />
  );
};
