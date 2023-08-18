import React, { useEffect } from "react";
import ProductList from "./ProductList";
import LoadingBox from "../../App/Layouts/LoadingBox";
import { useAppDispatch, useAppSelector } from "../../App/store/configureStore";
import {
  getFiltersAsync,
  getProductsAsync,
  productSelectors,
  setProductParams,
} from "./catalogueSlice";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Pagination,
  Paper,
  Typography,
} from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../components/RadioButtonGroup";
import CheckBoxSet from "../components/CheckBoxSet";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price - High to low" },
  { value: "price", label: "Price - Low to high" },
];

const Catalogue = () => {
  const products = useAppSelector(productSelectors.selectAll);
  const {
    isProductsLoaded,
    status,
    isFiltersLoaded,
    brands,
    types,
    productParams,
  } = useAppSelector((state) => state.catalogue);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isProductsLoaded) {
      dispatch(getProductsAsync());
    }
  }, [dispatch, isProductsLoaded]);

  useEffect(() => {
    if (!isFiltersLoaded) {
      dispatch(getFiltersAsync());
    }
  }, [dispatch, isFiltersLoaded]);

  if (status.includes("pending"))
    return <LoadingBox message="Loading Products..." />;
  return (
    <Grid container spacing={4}>
      <Grid item xs={4} sm={4} md={3} lg={4} xl={3}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <RadioButtonGroup
            selectedValue={productParams.orderBy}
            options={sortOptions}
            onChange={(e) =>
              dispatch(setProductParams({ orderBy: e.target.value }))
            }
          />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckBoxSet
            items={types}
            checked={productParams.types}
            onChange={(elements: string[]) => {
              dispatch(setProductParams({ types: elements }));
            }}
          />
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckBoxSet
            items={brands}
            checked={productParams.brands}
            onChange={(elements: string[]) => {
              dispatch(setProductParams({ brands: elements }));
            }}
          />
        </Paper>
      </Grid>
      <Grid item xs={8} sm={8} md={9} lg={8} xl={9}>
        <ProductList products={products} />
      </Grid>
      <Grid item xs={3}></Grid>
      <Grid item xs={9}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Pagination color="primary" count={10} shape="rounded" />
          <Typography> Showing 1-6 of 20</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Catalogue;
