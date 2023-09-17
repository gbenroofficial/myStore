import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../Layouts/App";
import About from "../../features/about/About";
import Contact from "../../features/contact/Contact";
import HomePage from "../../features/homePage/HomePage";
import Catalogue from "../../features/catalogue/Catalogue";
import ProductInfo from "../../features/catalogue/ProductInfo";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/Basket/BasketPage";


import Register from "../../features/account/Register";
import Login from "../../features/account/Login";
import RequireAuth from "./RequireAuth";
import Orders from "../../features/orders/Orders";
import StripeWrapper from "../../features/checkout/StripeWrapper";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: "checkout", element: <StripeWrapper /> },
          { path: "orders", element: <Orders /> },
        ],
      },
      { path: "", element: <HomePage /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "catalogue", element: <Catalogue /> },
      { path: "catalogue/:id", element: <ProductInfo /> },
      { path: "server-error", element: <ServerError /> },
      { path: "not-found", element: <NotFound /> },
      { path: "basket", element: <BasketPage /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },

      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);
