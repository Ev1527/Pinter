import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import ChatPage from './ChatPage';

const RoomPage: FC = () => {
  const { roomId } = useParams<{ roomId: string | undefined }>();

  return (
    <div>
      <h2>Room: {roomId}</h2>
      <ChatPage roomId={roomId} />
    </div>
  );
};

export default RoomPage;