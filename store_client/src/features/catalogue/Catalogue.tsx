import React, { useEffect, useState } from "react";
import { Product } from "../../App/Models/Product";
/* import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material"; */
import ProductList from "./ProductList";


const Catalogue = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetch("http://localhost:5009/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default Catalogue;
