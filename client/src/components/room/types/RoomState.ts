export type Room = {
  id: number;
  title: string;
  description: string;
  members: number;
  token: string;
};

export type RoomsState = {
  rooms: Room[];
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
