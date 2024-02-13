import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../App/api";
import { CreateRoomWithTest, RoomsState } from "./types/RoomState";

const initialState: RoomsState = {
  rooms: [],
};

export const loadRooms = createAsyncThunk("rooms/load", (partyId: string | undefined) =>
  api.allRoomsDialogue(partyId),
);
export const addRoomWithTest = createAsyncThunk(
  "rooms/createRoom",
  (room: CreateRoomWithTest) => api.createRoomDialogue(room),
);

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadRooms.fulfilled, (state, action) => {
      state.rooms = action.payload;
    });
    builder.addCase(addRoomWithTest.fulfilled, (state, action) => {
      state.rooms.push(action.payload)
    });
  },
});
export default roomsSlice.reducer;
