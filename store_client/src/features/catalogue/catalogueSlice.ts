import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Product, ProductParams } from "../../App/Models/Product";
import agent from "../../App/api/agent";
import { RootState } from "../../App/store/configureStore";
import { MetaData } from "../../App/Models/Pagination";


interface CatalogueState{
  isProductsLoaded: boolean,
  isFiltersLoaded: boolean,
  status: string,
  brands: string[],
  types: string[],
  productParams: ProductParams,
  metaData: MetaData | null,
}

const productAdapter = createEntityAdapter<Product>();

function getParams(productParams: ProductParams){
  const params = new URLSearchParams();

  params.append("pageNumber", productParams.pageNumber.toString());
  params.append("pageSize", productParams.pageSize.toString());
  params.append("feature", productParams.orderBy);
  if(productParams.brands.length > 0) params.append("brands", productParams.brands.toString());
  if(productParams.types.length > 0) params.append("types", productParams.types.toString());
  if(productParams.searchTerm) params.append("searchTerm", productParams.searchTerm);

  return params;
}

export const getProductsAsync = createAsyncThunk<Product[], void, {state: RootState}>(
  "catalogue/getProductsAsync",
  async (_, ThunkApi) => {
    const params = getParams(ThunkApi.getState().catalogue.productParams)
    try {
      const response = await agent.Catalogue.productList(params);
      ThunkApi.dispatch(setMetaData(response.metaData));
      return response.items;
    } catch (error: any) {
      return ThunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const getProductAsync = createAsyncThunk<Product, number>(
  "catalogue/getProductAsync",
  async (productId, ThunkApi) => {
    try {
      return await agent.Catalogue.productInfo(productId);
    } catch (error: any) {
      return ThunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const getFiltersAsync = createAsyncThunk(
  "catalogue/getFiltersAsync",
  async (_, ThunkApi) => {
    try {
      return await agent.Catalogue.filters();
    } catch (error: any) {
      return ThunkApi.rejectWithValue({ error: error.data });
    }
  }
);
const initParams = () => {
  return {
    pageNumber: 1,
    orderBy: "name",
    pageSize: 8,
    brands: [],
    types: [],
  }
}
export const catalogueSlice = createSlice({
  name: "catalogue",
  initialState: productAdapter.getInitialState<CatalogueState>({
    isProductsLoaded: false,
    isFiltersLoaded: false,
    status: "idle",
    brands: [],
    types: [],
    productParams: initParams(),
    metaData: null,
  }),
  reducers: {
    setProductParams: (state, action) => {        
        state.productParams = {...state.productParams, ...action.payload, pageNumber: 1};
        state.isProductsLoaded = false;
    },
    setPageNumber: (state, action) => {        
      state.productParams = {...state.productParams, ...action.payload};
      state.isProductsLoaded = false;
  },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    resetProductParams: (state) => {
      state.productParams = initParams();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsAsync.pending, (state) => {
      state.status = "pendingGetProducts";
    });
    builder.addCase(getProductsAsync.fulfilled, (state, action) => {
      productAdapter.setAll(state, action.payload);
      state.status = "idle";
      state.isProductsLoaded = true;
    });
    builder.addCase(getProductsAsync.rejected, (state) => {
      state.status = "idle";
      state.isProductsLoaded = false;
    });

    builder.addCase(getProductAsync.pending, (state) => {
      state.status = "pendingGetProduct";
    });
    builder.addCase(getProductAsync.fulfilled, (state, action) => {
      productAdapter.upsertOne(state, action.payload);
      state.status = "idle";
    });
    builder.addCase(getProductAsync.rejected, (state) => {
      state.status = "idle";
    });

    builder.addCase(getFiltersAsync.pending, (state) => {
      state.status = "pendingGetFilters";
    });

    builder.addCase(getFiltersAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.types = action.payload.types;
      state.brands = action.payload.brands;
      state.isFiltersLoaded = true;
    });
    builder.addCase(getFiltersAsync.rejected, (state) => {
      state.status = "idle";
      state.isFiltersLoaded = false;
    });
  },
});

export const productSelectors = productAdapter.getSelectors(
  (state: RootState) => state.catalogue
);

export const {setProductParams, resetProductParams, setMetaData, setPageNumber } = catalogueSlice.actions;