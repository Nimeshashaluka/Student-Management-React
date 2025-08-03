import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import SubAdDashboard from "./Pages/SubAdDashboard";
import SuperAdDashboard from "./Pages/SuperAdDashboard";
import StudentDashboard from "./Pages/StudentDashboard"; // Assuming you have a StudentDashboard component 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/subDashboard" element={<SubAdDashboard />} />
        <Route path="/superDashboard" element={<SuperAdDashboard />} />
        <Route path="/studentDashboard" element={<StudentDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
