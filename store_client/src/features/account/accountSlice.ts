import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../App/Models/User";
import agent from "../../App/api/agent";
import { FieldValues } from "react-hook-form";
import { router } from "../../App/router/Router";
import { toast } from "react-toastify";

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
  "account/getCurrentUser",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user")!)));
    try {
      const user = await agent.Account.currentUser();
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        return user;
      }
      else {        
        toast.error("session has expired. Please log in again");
        thunkAPI.dispatch(setUser(null))
        localStorage.removeItem("user");
        router.navigate("/login");
        
    }
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
    builder.addMatcher(isAnyOf(signInUser.rejected), (state, action) => {
      console.log(action.payload);
    });
  },
});
export const { logOut, setUser } = accountSlice.actions;
