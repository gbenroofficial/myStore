import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../App/Models/User";
import agent from "../../App/api/agent";
import { FieldValues } from "react-hook-form";
import { router } from "../../App/router/Router";

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
      const user = await agent.Account.login(data);
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {}
  }
);

export const getCurrentUser = createAsyncThunk<User>(
  "account/signIn",
  async (_, thunkAPI) => {
    try {
      const user = agent.Account.currentUser();
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {}
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
  },
  extraReducers(builder) {
    builder.addMatcher(
      isAnyOf(signInUser.fulfilled, getCurrentUser.fulfilled),
      (state, action) => {
        state.user = action.payload;
      }
    );
    builder.addMatcher(
      isAnyOf(signInUser.rejected, getCurrentUser.rejected),
      (state, action) => {
        console.log(action.payload);
      }
    );
  },
});
export const { logOut } = accountSlice.actions;
