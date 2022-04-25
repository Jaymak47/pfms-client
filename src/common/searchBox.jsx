import React from "react";

const SearchBox = ({ type, placeholder, defaultValue, onChange }) => {
  return (
    <input
      type={type}
      className="form-control my-3"
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  );
};

export default SearchBox;
