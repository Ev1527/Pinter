import axios from 'axios';
import type { User } from '../features/users/types/User';
import { AuthAuthoriza, AuthReg } from '../features/auth/types/AuthState';
import { Room, CreateRoomWithTest } from '../components/room/types/RoomState';
import Party from '../features/parties/components/Party';

export const registrationAxios = async (value: AuthReg): Promise<User> => {
  const { data }: { data: User } = await axios.post('/api/auth/sign-up', {
    data: value,
  });
  if (!data.message) {
    return data;
  }
  throw new Error(data.message);
};

export const authorizationAxios = async (
  value: AuthAuthoriza
): Promise<User> => {
  const { data }: { data: User } = await axios.post('/api/auth/sign-in', {
    data: value,
  });
  if (!data.message) {
    return data;
  }
  throw new Error(data.message);
};

export const checkAuthAxios = async (): Promise<User> => {
  const { data }: { data: { user: User } } = await axios.get('/api/auth/check');
  return data.user;
};

export const logOutAxios = async (): Promise<void> => {
  try {
    await axios.get('/api/auth/logout');
  } catch (error) {
    console.log(error);
  }
};

//party

export const allPartyAxios = async (): Promise<Party[]> => {
  const { data }: { data: Party[] } = await axios.get('/api/party');
  return data;
};

//room

export const allRoomsDialogue = async (
  partyId: string | undefined
): Promise<Room[]> => {
  const { data }: { data: Room[] } = await axios.get(`api/room/${partyId}`);
  return data;
};

export const createRoomDialogue = async (
  roomWithTest: CreateRoomWithTest
): Promise<Room> => {
  const { data } = await axios.post('/api/room/roomDialogue', {
    data: roomWithTest,
  });
  return data;
};
