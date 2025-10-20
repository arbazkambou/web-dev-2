import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Bookings from "./components/pages/Bookings";
import Cabins from "./components/pages/Cabins";
import Homepage from "./components/pages/Homepage";
import LoginPage from "./components/pages/LoginPage";
import Settings from "./components/pages/Settings";
import Users from "./components/pages/Users";
import { Uploader } from "./data/uploader";
import ProtectRoutes from "./components/features/user/ProtectRoutes";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectRoutes>
          <AppLayout />
        </ProtectRoutes>
      ),
      children: [
        {
          index: true,
          element: <Homepage />,
        },
        {
          path: "/bookings",
          element: <Bookings />,
        },
        {
          path: "/cabins",
          element: <Cabins />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
        {
          path: "/upload",
          element: <Uploader />,
        },
      ],
    },

    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
