import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../redux/store';
import { chatAPI, ChatMessageAPIType, StatusType } from './chat-api';
import { v1 } from 'uuid';

type ChatMessageType = ChatMessageAPIType & { id: string };

interface ChatState {
  users: ChatUser[];
  messages: ChatMessageType[];
  status: StatusType;
}

export type ChatUser = {
  userId: number;
  userName: string;
  userPhoto: string;
};

const initialState: ChatState = {
  users: [],
  messages: [],
  status: 'pending',
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    messagesReceived(
      state,
      action: PayloadAction<{ messages: ChatMessageAPIType[] }>
    ) {
      state.messages = [
        ...state.messages,
        ...action.payload.messages.map((m) => ({ ...m, id: v1() })),
      ].filter((m, index, array) => index >= array.length - 100);
    },
    statusChanged(state, action: PayloadAction<{ status: StatusType }>) {
      state.status = action.payload.status;
    },
    userLoggedIn: (state, action: PayloadAction<ChatUser>) => {
      state.users.push(action.payload);
    },
  },
});

export const { messagesReceived, statusChanged } = chatSlice.actions;

export const startMessagesListening =
  (): ThunkAction<void, RootState, unknown, any> => (dispatch) => {
    chatAPI.start();
    chatAPI.subscribe('messages-received', (messages: any) => {
      dispatch(messagesReceived({ messages }));
    });
    chatAPI.subscribe('status-changed', (status: any) => {
      dispatch(statusChanged({ status }));
    });
  };

export const stopMessagesListening =
  (): ThunkAction<void, RootState, unknown, any> => (dispatch) => {
    chatAPI.unsubscribe('messages-received', () => {});
    chatAPI.unsubscribe('status-changed', () => {});
    chatAPI.stop();
  };

export const sendMessage =
  (message: string): ThunkAction<void, RootState, unknown, any> =>
  () => {
    const messageObject = {
      message: message,
    };
    chatAPI.sendMessage(JSON.stringify(messageObject));
  };

export const selectChat = (state: RootState) => state.chat;

export default chatSlice.reducer;
