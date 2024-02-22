export type Room = {
  [x: string]: any;
  id: number;
  title: string;
  description: string;
  members: number;
  token: string;
};

export type Access_Table = {
  id: number;
  room_token: string;
  access: boolean;
  user_id: number;
};

// добавила
export type Message = {
  message: string;
};

export type Access = {
  access_table: Access_Table;
  message: Message;
}
// ________________________

export type RoomsState = {
  rooms: Room[];
  access_tables: Access_Table[];
};

export type CreateRoomWithTest = {
  title: string;
  description: string;
  members: string;
  firstQuestion: string;
  secondQuestion: string;
  thirdQuestion: string;
  firstAnswer: string;
  secondAnswer: string;
  thirdAnswer: string;
  partyId: string | undefined;
};

export type RoomTest = {
  firstAnswer: string;
  secondAnswer: string;
  thirdAnswer: string;
  roomId: number;
};

// export type RoomId = Room['id'];