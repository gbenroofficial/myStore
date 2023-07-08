import React, { useEffect, useState } from "react";
import { Product } from "../../App/Models/Product";
import ProductList from "./ProductList";
import agent from "../../App/api/agent"


const Catalogue = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    agent.Catalogue.productList().then(products=> setProducts(products)).catch((error)=> console.log(error))
  }, []);
  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default Catalogue;
