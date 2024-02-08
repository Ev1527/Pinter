// RoomPage.js
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import ChatPage from './ChatPage'; // Импортируем ChatPage

const RoomPage: FC = () => {
  const { roomId } = useParams<{ roomId: string }>();

  return (
    <div>
      <h2>Room: {roomId}</h2>
      {/* Передаем roomId в ChatPage */}
      <ChatPage roomId={roomId} />
    </div>
  );
};

export default RoomPage;
