import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/Home";
import Menu from "./features/menu/Menu";
import CreateOrder from "./features/order/CreateOrder";
import Order from "./features/order/Order";
import Cart from "./features/cart/Cart";
import AppLayout from "./ui/AppLayout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/menu", element: <Menu /> },
        { path: "/order/new", element: <CreateOrder /> },
        { path: "/order/:orderId", element: <Order /> },
        { path: "/cart", element: <Cart /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
