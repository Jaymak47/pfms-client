import React from "react";

const Toggle = (props) => {
  return (
    <div class="custom-control custom-switch">
      <input type="checkbox" class="custom-control-input" id="customSwitch1" />
      <label class="custom-control-label" for="customSwitch1">
        {props.name}
      </label>
    </div>
  );
};

export default Toggle;
