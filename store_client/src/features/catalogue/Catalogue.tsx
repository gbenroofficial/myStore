import React, { useEffect } from "react";
import ProductList from "./ProductList";
import LoadingBox from "../../App/Layouts/LoadingBox";
import { useAppDispatch, useAppSelector } from "../../App/store/configureStore";
import {
  getFiltersAsync,
  getProductsAsync,
  productSelectors,
} from "./catalogueSlice";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Pagination,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import ProductSearch from "./ProductSearch";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price - High to low" },
  { value: "price", label: "Price - Low to high" },
];

const Catalogue = () => {
  const products = useAppSelector(productSelectors.selectAll);
  const { isProductsLoaded, status, isFiltersLoaded, brands, types } =
    useAppSelector((state) => state.catalogue);
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
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Sort</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={sortOptions[0].value}
              name="radio-buttons-group"
            >
              {sortOptions.map((option) => (
                <FormControlLabel
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                  key={option.value}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          {types.map((type) => (
            <FormGroup key={type}>
              <FormControlLabel control={<Checkbox />} label={type} />
            </FormGroup>
          ))}
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          {brands.map((brand) => (
            <FormGroup key={brand}>
              <FormControlLabel control={<Checkbox />} label={brand} />
            </FormGroup>
          ))}
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
