import React, { useEffect, useRef, useState } from 'react';
import { ChatMessageAPIType } from './chat-api';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectChat,
  sendMessage,
  startMessagesListening,
  stopMessagesListening,
} from './chatSlice';
import { RootState } from '../../redux/store';

const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat />
      <UsersList />
    </div>
  );
};

const UsersList: React.FC = () => {
  const users = useSelector((state: RootState) => state.chat.users);

  return (
    <div>
      <h2>Users in the chat:</h2>
      <ul>
        {users.map((user) => (
          <li key={user.userId}>
            <img
              src={user.userPhoto}
              style={{ width: '30px' }}
              alt={user.userName}
            />
            {user.userName}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Chat: React.FC = () => {
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => selectChat(state).status);

  useEffect(() => {
    dispatch(startMessagesListening() as any);
    return () => {
      dispatch(stopMessagesListening() as any);
    };
  }, []);

  return (
    <div>
      {status === 'error' && (
        <div>Some error occured. Please refresh the page</div>
      )}
      <>
        <Messages />
        <AddMessageForm />
      </>
    </div>
  );
};

const Messages: React.FC<{}> = ({}) => {
  const messages = useSelector((state: RootState) => state.chat.messages);
  const messagesAnchorRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.currentTarget;
    if (
      Math.abs(
        element.scrollHeight - element.scrollTop - element.clientHeight
      ) < 300
    ) {
      !isAutoScroll && setIsAutoScroll(true);
    } else {
      isAutoScroll && setIsAutoScroll(false);
    }
  };

  useEffect(() => {
    if (isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div
      style={{ height: '400px', overflowY: 'auto' }}
      onScroll={scrollHandler}
    >
      {messages.map((m, index) => (
        <Message key={m.id} message={m} />
      ))}
      <div ref={messagesAnchorRef}></div>
    </div>
  );
};

// В вашем компоненте Message.tsx
const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(
  ({ message }) => {
    const author = useSelector((state: RootState) =>
      state.chat.users.find((user) => user.userId === message.authorId)
    );

    return (
      <div>
        <img
          src={author?.userPhoto}
          style={{ width: '30px' }}
          alt={author?.userName}
        />
        <b>{author?.userName}</b>
        <br />
        {message.message}
        <hr />
      </div>
    );
  }
);

const AddMessageForm: React.FC<{}> = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const status = useSelector((state: RootState) => state.chat.status);

  const sendMessageHandler = () => {
    if (!message) {
      return;
    }
    dispatch(sendMessage(message) as any);
    setMessage('');
  };

  return (
    <div>
      <div>
        <textarea
          onChange={(e) => setMessage(e.currentTarget.value)}
          value={message}
        ></textarea>
      </div>
      <div>
        <button disabled={status !== 'ready'} onClick={sendMessageHandler}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
