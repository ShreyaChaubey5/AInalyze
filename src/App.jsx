import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Navbar from "./components/UI/Navbar"
// Page-level components
import LandingPage from "./components/Pages/LandingPage";
import Dashboard from "./components/Pages/Dashboard";
import UploadBill from "./components/Pages/UploadBill";
import BillDetails from "./components/Pages/BillDetails";

// Auth components
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/upload" element={<ProtectedRoute><UploadBill /></ProtectedRoute>} />
        <Route path="/bill/:id" element={<ProtectedRoute><BillDetails /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
