import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../App/Models/Product";
import agent from "../../App/api/agent";

const ProductInfo = () => {
  const [product, setProduct] = useState<Product | null>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    id &&
      agent.Catalogue.productInfo(parseInt(id))
        .then((product) => setProduct(product))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <h2> Loading...</h2>;
  if (!product) return <h2>Product not found</h2>;
  return (
    <>
      <Grid container spacing={20}>
        <Grid item xs={6}>
          <img
            src={product.pictureUrl}
            alt={product.name}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h4"> {product.name} </Typography>
          <Typography variant="h6" mb={4}>
            {product.type}
          </Typography>
          <Typography variant="h5" mb={6}>
            {"\u00A3"}
            {(product.price / 100).toFixed(2)}
          </Typography>
          <TableContainer sx={{ ml: -2, width: 200 }}>
            <Table>
              <TableBody>
                <TableRow sx={{ "& td": { border: 0 } }}>
                  <TableCell>Brand:</TableCell>
                  <TableCell>{product.brand}</TableCell>
                </TableRow>
                <TableRow sx={{ "& td": { border: 0 } }}>
                  <TableCell>Left in stock:</TableCell>
                  <TableCell>{product.stockQuantity}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="subtitle2" mt={3}>
            {" "}
            {product.description}{" "}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductInfo;
