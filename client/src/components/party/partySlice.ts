import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../App/api";
import { PartiesState } from "./types/PartyState";

const initialState: PartiesState = {
  parties: [],
};

export const loadParties = createAsyncThunk("party/load", () =>
  api.allPartyAxios(),
);

const partySlice = createSlice({
  name: "party",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadParties.fulfilled, (state, action) => {
      state.parties = action.payload;
    });
  },
});
export default partySlice.reducer;
