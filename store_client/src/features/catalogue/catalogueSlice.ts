import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../App/Models/Product";
import agent from "../../App/api/agent";

const productAdapter = createEntityAdapter<Product>();

export const getProductsAsync = createAsyncThunk<Product[]>(
    "catalogue/getProductAsync",
    async() => {
        return await agent.Catalogue.productList();
    }
)

export const catalogueSlice = createSlice({
    name: "catalogue",
    initialState: productAdapter.getInitialState(
        {isProductLoaded: false,
        status: "idle"}
    ),
    reducers:{},
    extraReducers:builder => {
        builder.addCase(
            getProductsAsync.pending, (state) =>{
                state.status = "pendingGetProducts"
            }
        )
        builder.addCase(
            getProductsAsync.fulfilled, (state, action) => {
                productAdapter.setAll(state, action.payload);
                state.status = "idle";
                state.isProductLoaded = true;
            }
        )
        builder.addCase(
            getProductsAsync.rejected, (state)=>{
                state.status = "idle";
                state.isProductLoaded = false;
            }
        )
    }
})