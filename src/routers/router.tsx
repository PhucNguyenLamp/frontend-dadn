import { createBrowserRouter } from "react-router-dom";
import Home from "../screens/Home";
import App from "../App";
import Statistics from "../screens/Statistics";
import Login from "../screens/auth/Login";
import Account from "../screens/Account";
import Logs from "../screens/Logs";
import Devices from "../screens/Devices";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
      {
        path: "/login",
        element: <Login />,
      }
    ],
  },
]);

export default router;
