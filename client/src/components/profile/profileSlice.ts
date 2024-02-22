import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../App/api";
import { AllUserPartyRooms, UserPartyRoomId } from "./types/UserParties";
import { UserId } from "../users/types/User";

const initialState: AllUserPartyRooms = {
    userRooms: [],
};

export const loadUserPartyRooms = createAsyncThunk(
    "profile/loadUserPartyRooms",
    (userId: UserId) => api.userPartyRooms(userId),
);

export const deleteUserPartyRoom = createAsyncThunk(
    "profile/deleteUserPartyRoom",
    (id: UserPartyRoomId) => api.deleteUserPartyRoom(id),
);

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadUserPartyRooms.fulfilled, (state, action) => {
                state.userRooms = action.payload;
            })
            .addCase(deleteUserPartyRoom.fulfilled, (state, action) => {
                state.userRooms = state.userRooms.filter(
                    (room) => room.id !== +action.payload
                );
            });
    },
});

export default profileSlice.reducer;
