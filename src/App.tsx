import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Inventory from "./components/Inventory";
import Market from "./components/Market";
import Header from "./components/Header";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/market" element={<Market />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;