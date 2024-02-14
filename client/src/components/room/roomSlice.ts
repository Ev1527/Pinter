import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../App/api";
import { CreateRoomWithTest, RoomTest, RoomsState } from "./types/RoomState";

const initialState: RoomsState = {
  rooms: [],
};

export const loadRooms = createAsyncThunk(
  "rooms/load",
  (partyId: string | undefined) => api.allRoomsDialogue(partyId),
);
export const addRoomWithTest = createAsyncThunk(
  "rooms/createRoom",
  (room: CreateRoomWithTest) => api.createRoomDialogue(room),
);
export const passTestRoom = createAsyncThunk(
  "rooms/passTest",
  (test: RoomTest) => api.passTheTest(test),
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
      state.rooms.push(action.payload);
    });
    builder.addCase(passTestRoom.fulfilled, (state, action) => {
      state.rooms,
      action.payload = action.payload.message
    });
  },
});
export default roomsSlice.reducer;
