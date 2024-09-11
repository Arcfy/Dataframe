import React from "react";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <img
        src="../src/assets/logo.svg"
        alt="Logo"
        className="h-10 w-auto mr-2"
      />
      <span className="text-xl font-bold text-gray-800">DATAFRAME</span>
    </div>
  );
};

export default Logo;