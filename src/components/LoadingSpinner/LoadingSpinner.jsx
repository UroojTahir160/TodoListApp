import React from "react";

const LoadingSpinner = ({ loading, color, className }) => {
  return (
    loading && (
      <div
        className={`animate-spin rounded-full border-t-4 border-${
          color || "primary"
        }-700 border-solid ${className || "h-10 w-10"}`}
      ></div>
    )
  );
};

export default LoadingSpinner;
