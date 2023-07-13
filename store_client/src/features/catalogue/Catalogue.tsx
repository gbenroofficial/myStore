import React, { useEffect, useState } from "react";
import { Product } from "../../App/Models/Product";
import ProductList from "./ProductList";
import agent from "../../App/api/agent";
import LoadingBox from "../../App/Layouts/LoadingBox";

const Catalogue = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Catalogue.productList()
      .then((products) => {setProducts(products)
      })
      .catch((error) => console.log(error)).finally(()=>setLoading(false));
  }, []);

  if (loading) return <LoadingBox message="Loading Products..." />;
  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default Catalogue;
