// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../redux/store';
// import AddMessageForm from './AddMessageForm';
// import {
//   selectChat,
//   startMessagesListening,
//   stopMessagesListening,
// } from './chatSlice';
// import Messages from './Messages';

// export const Chat: React.FC = () => {
//   const dispatch = useDispatch();
//   const status = useSelector((state: RootState) => selectChat(state).status);

//   useEffect(() => {
//     dispatch(startMessagesListening() as any);
//     return () => {
//       dispatch(stopMessagesListening() as any);
//     };
//   }, []);

//   return (
//     <div>
//       {status === 'error' && (
//         <div>Some error occured. Please refresh the page</div>
//       )}
//       <>
//         <Messages />
//         <AddMessageForm />
//       </>
//     </div>
//   );
// };

import React from 'react';

const Chat = () => {
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

export default Chat;
