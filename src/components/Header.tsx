import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import Logo from "./Logo";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between p-3 bg-gray-800 text-white">
      <Logo />
      <link>
      
      </link>
      <nav className="flex space-x-4">
        <Link to="/market" className="mr-2">
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Market
          </button>
        </Link>
        <Link to="/inventory">
        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
            Inventory
          </button>
        </Link>
      </nav>
      <Login />
    </header>
  );
};

export default Header;