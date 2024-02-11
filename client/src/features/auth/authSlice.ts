import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AuthAuthoriza, AuthReg, AuthState } from "./types/AuthState";
import * as api from "../../App/api";

const initialState: AuthState = {
  user: undefined,
  error: undefined,
  pending: false,
};

export const registration = createAsyncThunk(
  "auth/registration",
  (value: AuthReg) => api.registrationAxios(value),
);
export const authorization = createAsyncThunk(
  "auth/authorization",
  (value: AuthAuthoriza) => api.authorizationAxios(value),
);
export const checkAuth = createAsyncThunk("auth/check", async () => {
  try {
    const data = await api.checkAuthAxios();
    return data;
  } catch (message) {
    console.log(message);
  }
});

export const logOut = createAsyncThunk("auth/logout", () => api.logOutAxios());

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registration.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      // .addCase(registration.rejected, (state, action) => {
      //   state.error = action.error.message;
      // })
      .addCase(authorization.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      // .addCase(authorization.rejected, (state, action) => {
      //   state.error = action.error.message;
      // })
      // .addCase(checkAuth.pending, (state) => {
      //   state.pending = false;
      // })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.pending = false;
        state.user = action.payload;
      })
      // .addCase(checkAuth.rejected, (state, action) => {
      //   state.error = action.error.message;
      // })
      .addCase(logOut.fulfilled, (state) => {
        state.user = undefined;
      });
    // .addCase(logOut.rejected, (state, action) => {
    //   state.error = action.error.message;
    // });
  },
});
export default authSlice.reducer;
