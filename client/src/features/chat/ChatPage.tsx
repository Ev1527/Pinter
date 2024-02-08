import React, { FC, useEffect, useState } from 'react';

interface ChatPageProps {
  roomId: string | undefined;
}

export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};

const ChatPage: FC<ChatPageProps> = ({ roomId }) => {
  const [wsChannel, setWsChannel] = useState<WebSocket | null>(null);

  useEffect(() => {
    let ws: WebSocket;
    const closeHandler = () => {
      console.log('CLOSE WS');
      setTimeout(createChannel, 3000);
    };

    function createChannel() {
      ws?.removeEventListener('close', closeHandler);
      ws?.close();

      // Используем roomId для создания уникального WebSocket-пути
      ws = new WebSocket(`ws://localhost:8000/chat/${roomId}`);
      ws?.addEventListener('close', closeHandler);
      setWsChannel(ws);
    }
    createChannel();

    return () => {
      ws.removeEventListener('close', closeHandler);
      ws.close();
    };
  }, [roomId]);

  return (
    <div>
      <Messages wsChannel={wsChannel} />
      <AddMessageForm wsChannel={wsChannel} />
    </div>
  );
};

const Messages: FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);

  useEffect(() => {
    const messageHandler = (e: MessageEvent) => {
      try {
        const newMessages = JSON.parse(e.data);

        if (Array.isArray(newMessages)) {
          setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        } else {
          console.error('Invalid message format. Expected an array.');
        }
      } catch (error: any) {
        console.error('Error parsing message:', error.message);
      }
    };

    wsChannel?.addEventListener('message', messageHandler);

    return () => {
      wsChannel?.removeEventListener('message', messageHandler);
    };
  }, [wsChannel]);

  return (
    <div>
      {messages.map((m: ChatMessageType, index) => (
        <Message key={index} message={m} />
      ))}
    </div>
  );
};

const Message: FC<{ message: ChatMessageType }> = ({ message }) => {
  return (
    <div className='message'>
      <img src={message.photo}></img>
      <b>{message.userName}</b>
      <br />
      {message.message}
      <hr />
    </div>
  );
};

const AddMessageForm: FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
  const [message, setMessage] = useState('');
  const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>(
    'pending'
  );

  useEffect(() => {
    const openHandler = () => {
      setReadyStatus('ready');
    };
    wsChannel?.addEventListener('open', openHandler);
    return () => {
      wsChannel?.removeEventListener('open', openHandler);
    };
  }, [wsChannel]);

  const sendMessageHandler = () => {
    if (!message) {
      return;
    }

    const messageObject = {
      message: message,
    };

    wsChannel?.send(JSON.stringify(messageObject));
    setMessage('');
  };

  //   wsChannel?.send(message);
  //   setMessage('');
  // };

  return (
    <div>
      <div>
        <textarea
          onChange={(e) => setMessage(e.currentTarget.value)}
          value={message}
        ></textarea>
      </div>
      <div>
        <button
          disabled={wsChannel == null || readyStatus !== 'ready'}
          onClick={sendMessageHandler}
        >
          send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
