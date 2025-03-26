import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../screens/Home";
import App from "../App";
import Statistics from "../screens/Statistics";
import Login from "../screens/auth/Login";
import Account from "../screens/Account";
import Logs from "../screens/Logs";
import Devices from "../screens/Devices";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return null;
  return user ? children : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/statistics",
        element: <Statistics />,
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/logs",
        element: <Logs />,
      },
      {
        path: "/devices/:type",
        element: <Devices />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
