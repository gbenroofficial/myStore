import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../App/errors/NotFound";
import LoadingBox from "../../App/Layouts/LoadingBox";

import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../App/store/configureStore";
import {
  deleteBasketItemAsync,
  updateBasketItemAsync,
} from "../Basket/basketSlice";
import { getProductAsync, productSelectors } from "./catalogueSlice";

const ProductInfo = () => {
  const dispatch = useAppDispatch();
  const { basket, status } = useAppSelector((state) => state.basket);
  const {status: productStatus} = useAppSelector((state) => state.catalogue);
  const { id } = useParams<{ id: string }>();
  const product = useAppSelector((state) =>
    id ? productSelectors.selectById(state, id) : null
  );
  const [cartCount, setItemCount] = useState(0);

  const item = basket?.items.find((itm) => itm.productId === product?.id);

  useEffect(() => {
    if (item) setItemCount(item.quantity);
    if (!product && id) dispatch(getProductAsync(parseInt(id)));
  }, [dispatch, id, item, product]);

  function handleQuantityChange(e: any) {
    if (e.target.value >= 0) {
      setItemCount(e.target.value);
    }
  }

  function handleCartUpdate() {
    if (cartCount >= 0 && product) {
      if (cartCount === 0 && item) {
        dispatch(deleteBasketItemAsync({ productId: product.id }));
      } else {
        dispatch(
          updateBasketItemAsync({ productId: product.id, quantity: cartCount })
        );
      }
    }
  }

  if (productStatus.includes("pending"))
    return <LoadingBox message="Loading Product..." />;

  if (!product) return <NotFound />;
  
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
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl sx={{ minWidth: 120 }} fullWidth>
                <InputLabel id="demo-simple-select-label">In Cart</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={cartCount}
                  label="In cart"
                  onChange={handleQuantityChange}
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((quantity) => (
                    <MenuItem key={quantity} value={quantity}>
                      {quantity}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <LoadingButton
                sx={{ height: "55px" }}
                color="primary"
                size="large"
                variant="contained"
                fullWidth
                onClick={handleCartUpdate}
                loading={status.includes("pending")}
                disabled={
                  item?.quantity === cartCount || (!item && cartCount === 0)
                }
              >
                {item ? "Update Quantity" : "Add item to Cart"}
              </LoadingButton>
            </Grid>
          </Grid>
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
