import React, { useState } from "react";

const Alert = ({ type = "success", message, onClose }) => {
  const [visible, setVisible] = useState(true);

  const closeAlert = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  const iconType = {
    success: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-green-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    ),
    error: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-red-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 11-1.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    ),
    info: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-blue-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9 9V5a1 1 0 012 0v4a1 1 0 01-1 1H9a1 1 0 010-2zm0 4h2a1 1 0 010 2H9a1 1 0 010-2z" />
      </svg>
    ),
  };

  if (!visible) return null;

  return (
    <div
      className={`absolute bottom-4 right-4 mt-12 z-50  px-4 rounded-md border-l-4 ${
        type === "success"
          ? "border-green-500 bg-green-50"
          : type === "error"
          ? "border-red-500 bg-red-50"
          : "border-blue-500 bg-blue-50"
      } md:max-w-2xl md:mx-auto md:px-8`}
    >
      <div className="flex justify-between py-3">
        <div className="flex">
          <div>{iconType[type]}</div>
          <div className="self-center ml-3">
            <span
              className={`font-semibold ${
                type === "success"
                  ? "text-green-600"
                  : type === "error"
                  ? "text-red-600"
                  : "text-blue-600"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
            <p className={`mt-1 ${type === "success" ? "text-green-600" : type === "error" ? "text-red-600" : "text-blue-600"}`}>
              {message}
            </p>
          </div>
        </div>
        <button className="self-start" onClick={closeAlert}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Alert;
