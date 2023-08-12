import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Product } from "../../App/Models/Product";
import agent from "../../App/api/agent";
import { RootState } from "../../App/store/configureStore";

const productAdapter = createEntityAdapter<Product>();

export const getProductsAsync = createAsyncThunk<Product[]>(
  "catalogue/getProductsAsync",
  async (_, ThunkApi) => {
    try {
      return await agent.Catalogue.productList();
    } catch (error: any) {return ThunkApi.rejectWithValue({error: error.data})}
  }
);

export const getProductAsync = createAsyncThunk<Product, number>(
    "catalogue/getProductAsync",
    async (productId, ThunkApi) => {
      try {
        return await agent.Catalogue.productInfo(productId);
      } catch (error:any) {return ThunkApi.rejectWithValue({error: error.data})}
    }
  );

export const catalogueSlice = createSlice({
  name: "catalogue",
  initialState: productAdapter.getInitialState({
    isProductsLoaded: false,
    status: "idle",
  }),
  reducers: {},
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
    } );
    builder.addCase(getProductAsync.fulfilled, (state, action) => {
        productAdapter.upsertOne(state, action.payload);
        state.status = "idle";
    });
    builder.addCase(getProductAsync.rejected, (state) => {
        state.status = "idle";
    })
  },
});

export const productSelectors = productAdapter.getSelectors(
  (state: RootState) => state.catalogue
);
