import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Bookings from "./components/pages/Bookings";
import Cabins from "./components/pages/Cabins";
import Homepage from "./components/pages/Homepage";
import Settings from "./components/pages/Settings";
import Users from "./components/pages/Users";
import { Uploader } from "./data/uploader";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
