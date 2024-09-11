import React, { useState } from "react";
import Logo from "./Logo";
import Market from "./Market";
import Inventory from "./Inventory";

const Header: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<"Market" | "Inventory" | "Main" | null>(
    null
  );

  return (
    <div className="flex flex-col h-full">
      <header className="bg-gray-200 shadow-md py-3 px-5">
        <div className="flex justify-between items-center">
          <Logo />
          <nav className="flex space-x-4">
            <button
              onClick={() => setCurrentPage("Market")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Market
            </button>
            <button
              onClick={() => setCurrentPage("Inventory")}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Inventory
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <div className="mt-8 w-full max-w-3xl mx-auto p-4">
          {currentPage === "Market" && <Market />}
          {currentPage === "Inventory" && <Inventory />}
          {!currentPage && (
            <p className="text-4xl text-white text-center">
              In progress.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Header;