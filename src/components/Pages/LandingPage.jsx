import React from 'react';
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center space-y-6">
      <h1 className="text-4xl font-bold text-blue-600">Welcome to AInalyZe</h1>
      <p className="text-gray-600">Smart Bill Analyzer powered by AI</p>
      <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Get Started
      </Link>
    </div>
  );
}
