import React from "react";
import { Link } from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center">
      <img src="../src/assets/logo.svg" alt="Logo" className="h-10 w-10 mr-2" />
      <span className="text-xl font-bold text-white">DATAFRAME</span>
    </Link>
  );
};

export default Logo;