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
          <Grid key={product.id} item xs={12} sm={12} md={6} xl={4}>
            <ProductCard key={product.id} product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ProductList;
