import React from "react";

export const Checkbox = ({
  checked,
  name,
  onChange,
  label,
}) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={checked}
        name={name}
        onChange={onChange}
        className="mr-2"
      />
      <label className="text-neutral-500 text-sm xs:text-base">{label}</label>
    </div>
  );
};
