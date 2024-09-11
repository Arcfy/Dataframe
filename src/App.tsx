import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Market from "./pages/Market";
import Inventory from "./pages/Inventory";
import Header from "./components/Header";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/market" element={<Market />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/*" element={<LandingPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
