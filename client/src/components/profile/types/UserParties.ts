// export type PartyWithRoomId = {
//   id: number;
//   category: string;
//   title: string;
//   description: string;
//   image: string;
//   date: string;
//   time: string;
//   room_id: number;
// }

import { Party } from "../../party/types/PartyState";

export type UserPartyRoom = {
  id: number;
  title: string;
  description: string;
  members: number;
  token: string;
  party_id: number;
  Party: Party;
}

export type UserPartyRoomId = UserPartyRoom['id'];

export type AllUserPartyRooms = {
  userRooms: UserPartyRoom[]
}