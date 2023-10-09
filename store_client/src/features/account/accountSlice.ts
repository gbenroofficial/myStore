import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../App/Models/User";
import agent from "../../App/api/agent";
import { FieldValues } from "react-hook-form";
import { router } from "../../App/router/Router";
import { toast } from "react-toastify";
import { setBasket } from "../Basket/basketSlice";

interface AccountState {
  user: User | null;
}

const initialState: AccountState = {
  user: null,
};

export const signInUser = createAsyncThunk<User, FieldValues>(
  "account/signIn",
  async (data, thunkAPI) => {
    try {
      const userDto = await agent.Account.login(data);
      const { basket, ...user } = userDto;
      if (basket) {
        thunkAPI.dispatch(setBasket(basket));
      }
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const getCurrentUser = createAsyncThunk<User>(
  "account/getCurrentUser",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user")!)));
    try {
      const userDto = await agent.Account.currentUser();
      const { basket, ...user } = userDto;
      if (basket) {
        thunkAPI.dispatch(setBasket(basket));
      }
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem("user")) return false;
    },
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = null;      
      localStorage.removeItem("user");
      router.navigate("/");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getCurrentUser.rejected, (state) => {
      state.user = null;
      localStorage.removeItem("user");
      toast.error("session has expired. Please log in again");
      router.navigate("/login");
    });
    builder.addMatcher(
      isAnyOf(signInUser.fulfilled, getCurrentUser.fulfilled),
      (state, action) => {
        state.user = action.payload;
      }
    );
    builder.addMatcher(isAnyOf(signInUser.rejected), (_state, action) => {
      throw action.payload;
    });
  },
});
export const { logOut, setUser } = accountSlice.actions;
