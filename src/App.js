import React from "react";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import RoutePath from "./Components/Router/Route";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<RoutePath />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

//vbwifghwouvbjodwr
