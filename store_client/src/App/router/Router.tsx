import { createBrowserRouter } from "react-router-dom";
import App from "../Layouts/App";
import About from "../../features/about/About";
import Contact from "../../features/contact/Contact";
import HomePage from "../../features/homePage/HomePage";
import Catalogue from "../../features/catalogue/Catalogue";
import ProductInfo from "../../features/catalogue/ProductInfo";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "catalogue", element: <Catalogue /> },
      { path: "catalogue/:id", element: <ProductInfo /> },
    ],
  },
]);
