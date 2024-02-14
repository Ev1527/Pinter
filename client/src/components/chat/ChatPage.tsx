import React from 'react';
import { Chat } from './Chat';
import { UsersList } from './UserList';

const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat />
      <UsersList />
    </div>
  );
};

export default ChatPage;
