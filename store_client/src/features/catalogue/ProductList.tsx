import { Grid } from "@mui/material";
import React from "react";
import { Product } from "../../App/Models/Product";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}
const ProductList = ({ products }: Props) => {
  return (
    <>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} xl={3}>
            <ProductCard key={product.id} product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ProductList;
