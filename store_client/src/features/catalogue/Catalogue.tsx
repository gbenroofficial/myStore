import React, { useEffect } from "react";
import ProductList from "./ProductList";
import LoadingBox from "../../App/Layouts/LoadingBox";
import { useAppDispatch, useAppSelector } from "../../App/store/configureStore";
import {
  getFiltersAsync,
  getProductsAsync,
  productSelectors,
  setPageNumber,
  setProductParams,
} from "./catalogueSlice";
import { Grid, Paper } from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../App/components/RadioButtonGroup";
import CheckBoxSet from "../../App/components/CheckBoxSet";
import PaginationBox from "../../App/components/PaginationBox";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price - High to low" },
  { value: "price", label: "Price - Low to high" },
];

const Catalogue = () => {
  const products = useAppSelector(productSelectors.selectAll);
  const {
    isProductsLoaded,
    isFiltersLoaded,
    brands,
    types,
    productParams,
    metaData,
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

  if (!isFiltersLoaded) return <LoadingBox message="Loading Products..." />;

  return (
    <Grid container columnSpacing={4} rowSpacing={1} pb={2}>
      <Grid item xs={5} sm={5} md={3} lg={3} xl={3}>
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
      <Grid item xs={7} sm={7} md={9} lg={9} xl={9}>
        <ProductList products={products} />
      </Grid>
      <Grid item xs={0} sm={0} md={3} lg={3} xl={3} rowSpacing={0}></Grid>
      <Grid item xs={12} sm={12} md={9} lg={9} xl={9} sx={{ pt: 0 }}>
        {metaData && (
          <PaginationBox
            metaData={metaData}
            onChange={(page: number) => {
              dispatch(setPageNumber({ pageNumber: page }));
            }}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default Catalogue;
