import React, { useEffect } from "react";
import ProductList from "./ProductList";
import LoadingBox from "../../App/Layouts/LoadingBox";
import { useAppDispatch, useAppSelector } from "../../App/store/configureStore";
import { getProductsAsync, productSelectors } from "./catalogueSlice";

const Catalogue = () => {
  const products = useAppSelector(productSelectors.selectAll);
  const {isProductsLoaded, status} = useAppSelector(state => state.catalogue)
  const dispatch = useAppDispatch();
 

  useEffect(() => {
    if(!isProductsLoaded){
      dispatch(getProductsAsync())
    }
    
  }, [dispatch, isProductsLoaded]);

  if (status.includes("pending")) return <LoadingBox message="Loading Products..." />;
  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default Catalogue;
