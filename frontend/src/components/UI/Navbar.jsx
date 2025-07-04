import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        alert("Logged out successfully!");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  return (
    <nav className="bg-blue-600 p-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <span className="text-white font-bold text-xl">AInalyZe</span>
      </div>

      <div className="flex space-x-4">
        <Link to="/dashboard" className="text-white hover:underline">Dashboard</Link>
        <Link to="/upload" className="text-white hover:underline">Upload</Link>

        {!isLoggedIn && (
          <>
            <Link to="/login" className="text-white hover:underline">Log In</Link>
            <Link to="/signup" className="text-white hover:underline">Sign Up</Link>
          </>
        )}

        {isLoggedIn && (
          <button onClick={handleLogout} className="text-white hover:underline">Logout</button>
        )}
      </div>
    </nav>
  );
}
