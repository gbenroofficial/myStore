import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../App/Models/Basket";
import agent from "../../App/api/agent";

interface BasketState {
  basket: Basket | null;
  status: string;
}

const initialState: BasketState = {
  basket: null,
  status: "idle",
};

export const addBasketItemAsync = createAsyncThunk<
  Basket,
  { productId: number }
>("basket/addBasketItemAsync", async ({ productId }) => {
  try {
    return await agent.Basket.addItem(productId);
  } catch (error) {}
});

export const updateBasketItemAsync = createAsyncThunk<
  Basket,
  { productId: number, quantity: number }
>("basket/updateBasketItemAsync", async ({ productId, quantity }) => {
  try {
    return await agent.Basket.updateItem(productId, quantity);
  } catch (error) {}
});

export const deleteBasketItemAsync = createAsyncThunk<
  void,
  { productId: number }
>("basket/removeBasketItemAsync", async ({ productId }) => {
  try {
    await agent.Basket.removeItem(productId);
  } catch (error) {}
});




export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload;
    },    
  },

  extraReducers: (builder) => {
    builder.addCase(addBasketItemAsync.pending, (state, action) => {
      state.status = "pendingBasketAddition" + action.meta.arg.productId;
    });
    builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
      state.basket = action.payload;
      state.status = "idle";
    });
    builder.addCase(addBasketItemAsync.rejected, (state) => {
      state.status = "idle";
    });


    builder.addCase(updateBasketItemAsync.pending, (state, action) => {
        state.status = "pendingBasketUpdate" + action.meta.arg.productId;
      });
      builder.addCase(updateBasketItemAsync.fulfilled, (state, action) => {
        state.basket = action.payload;
        state.status = "idle";
      });
      builder.addCase(updateBasketItemAsync.rejected, (state) => {
        state.status = "idle";
      });

    builder.addCase(deleteBasketItemAsync.pending, (state, action) => {
      state.status = "pendingBasketRemoval" + action.meta.arg.productId;
    });
    builder.addCase(deleteBasketItemAsync.fulfilled, (state, action) => {
      const { productId } = action.meta.arg;
      if (!state.basket) return;
      const items = [...state.basket.items];
      const itemIndex = items.findIndex((item) => item.productId === productId);
      if (itemIndex >= 0) {
        items.splice(itemIndex, 1);
      } else return;
      state.basket.items = items;
      state.status = "idle";
    });
    builder.addCase(deleteBasketItemAsync.rejected, (state) => {
      state.status = "idle";
    });
  },
});

export const { setBasket } = basketSlice.actions;
