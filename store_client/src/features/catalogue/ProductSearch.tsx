import { TextField, debounce } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../App/store/configureStore";
import { setProductParams } from "./catalogueSlice";

const ProductSearch = () => {
  const { productParams } = useAppSelector((state) => state.catalogue);
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
  const debouncedSearch = debounce((event: any)=>{
    dispatch(setProductParams({ searchTerm: event.target.value }));
  }, 1500);
  return (
    <TextField
      label="Search products"
      variant="outlined"
      fullWidth
      value={searchTerm || ""}
      onChange={(event:any) => {
        setSearchTerm(event.target.value);
        debouncedSearch(event);
      }}
    />
  );
};

export default ProductSearch;
