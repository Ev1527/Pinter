import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { sendMessage } from './chatSlice';

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

export default AddMessageForm;
