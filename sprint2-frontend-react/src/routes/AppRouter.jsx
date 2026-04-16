import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/" replace />;
}

function AppRouter() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    const handleStorage = () => {
      setToken(localStorage.getItem("token"));
      setRole(localStorage.getItem("role"));
    };

    window.addEventListener("storage", handleStorage);

    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={!token ? <Login /> : <Navigate to="/dashboard" replace />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRouter;