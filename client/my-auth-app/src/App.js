import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import LicensePlans from "./LicensePlans";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/license-plans" element={<LicensePlans />} />
      </Routes>
    </Router>
  );
}

export default App;
