import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Marketplace from "./pages/Marketplace";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Marketplace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
