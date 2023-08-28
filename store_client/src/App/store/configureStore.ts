import { configureStore } from "@reduxjs/toolkit";
import {TypedUseSelectorHook} from "react-redux";
import { counterSlice } from "../../features/contact/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import { basketSlice } from "../../features/Basket/basketSlice";
import { catalogueSlice } from "../../features/catalogue/catalogueSlice";
import { accountSlice } from "../../features/account/accountSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    basket: basketSlice.reducer,
    catalogue: catalogueSlice.reducer,
    account: accountSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
