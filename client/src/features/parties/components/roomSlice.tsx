// import React from 'react';
// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import * as api from '../../../App/api';

// export type RoomType = {
//   user_id: number | undefined;
//   roomDialogue_id: number | undefined;
//   party_id: number | undefined;
// };

// export type TestType = {
//   title: string;
//   qa: string;
//   roomDialogue_id: number;
// };

// const initialState: RoomType = {
//   user_id: undefined, //вытащить это из аутентификации
//   roomDialogue_id: undefined, //будет создаваться при создании комнаты?
//   party_id: undefined, //id сидит в url по названию
// };

// // const initialState: RoomType = {
// //   user_id: getUserIdFromAuthentication(), // Замените эту функцию на реальную логику получения user_id из аутентификации
// //   roomDialogue_id: getRoomDialogueIdFromURL(), // Замените эту функцию на реальную логику получения roomDialogue_id из параметров URL
// //   party_id: getPartyIdFromURL(), // Замените эту функцию на реальную логику получения party_id из параметров URL
// // };

// export const createRoom = createAsyncThunk(
//   'parties/:id/createroom',
//   (value: RoomType) => api.createRoomAxios(value)
// );
// export const createTest = createAsyncThunk(
//   'parties/:id/createroom/test',
//   (value: TestType) => api.createTestAxios(value)
// );

// const roomSlice = createSlice({
//   name: 'room',
//   initialState,
//   reducers: {},
//   extraReducers(builder) {
//     builder
//       .addCase(createRoom.fulfilled, (state, action) => {
//         state.roomDialogue_id = action.payload.roomDialogue_id;
//         state.party_id = action.payload.party_id;
//       })
//       .addCase(createTest.fulfilled, (state, action) => {
//         state.roomDialogue_id = action.payload.roomDialogue_id;
//         state.party_id = action.payload.party_id;
//       });
//   },
// });

// export default roomSlice.reducer;

import React from 'react';

const roomSlice = () => {
  return <div></div>;
};

export default roomSlice;
