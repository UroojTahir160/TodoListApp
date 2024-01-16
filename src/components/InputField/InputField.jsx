import React, { useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

export const InputField = ({
  label,
  placeholder,
  type,
  name,
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="relative">
      <label
        htmlFor={name}
        className="text-sm text-primary-700 font-Poppins mb-2"
      >
        {label}
      </label>
      <input
        type={showPassword ? "text" : type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className="border-stone-300 w-full text-sm border rounded-md p-3 focus:outline-none focus:border-indigo-blue"
      />
      {type === "password" && (
        <button
          type="button"
          className="absolute top-[65%] transform -translate-y-1/2 right-3 cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <RiEyeFill size={20} color="#04C3FF" />
          ) : (
            <RiEyeOffFill size={20} color="#04C3FF" />
          )}
        </button>
      )}
    </div>
  );
};
