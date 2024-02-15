// import { useSelector } from 'react-redux';
// import { RootState } from '../../redux/store';
// import { ChatMessageAPIType } from './chat-api';
// import React from 'react';

// const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(
//   ({ message }) => {
//     const author = useSelector((state: RootState) =>
//       state.chat.users.find((user) => user.userId === message.authorId)
//     );

//     return (
//       <div>
//         <img
//           src={author?.userPhoto}
//           style={{ width: '30px' }}
//           alt={author?.userName}
//         />
//         <b>{author?.userName}</b>
//         <br />
//         {message.message}
//         <hr />
//       </div>
//     );
//   }
// );

// export default Message;

import React from 'react';

const Message = () => {
  return <div>asd</div>;
};

export default Message;
