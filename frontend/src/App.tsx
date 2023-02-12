import React from "react";
import Login from "./screens/login/Login";
import Dashboard from "./screens/dashboard/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
