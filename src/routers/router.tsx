import { createBrowserRouter } from "react-router-dom";
import Home from "../screens/Home";
import App from "../App";
import Statistics from "../screens/Statistics";
import Login from "../screens/auth/Login";
import Account from "../screens/Account";
import Template from "../screens/Template";
import Admin from "../screens/admin/Admin";
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
        path: "/devices/:_id",
        element: <Devices />,
      },
    ],
  },
]);

export default router;
