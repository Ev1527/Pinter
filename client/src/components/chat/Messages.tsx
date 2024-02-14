import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Message from './Message';

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

export default Messages;
