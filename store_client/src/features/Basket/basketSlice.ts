import { createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../App/Models/Basket";

interface BasketState {
  basket: Basket | null;
}

const initialState: BasketState = {
  basket: null,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload;
    },
    deleteItem: (state, action) => {
      if (!state.basket) return;
      const items = [...state.basket.items];
      const itemIndex = items.findIndex((item) => item.productId === action.payload);
      if (itemIndex >= 0) {
        items.splice(itemIndex, 1);
      }else return;
      state.basket.items = items;
    },
  },
});

export const {setBasket, deleteItem} = basketSlice.actions;
