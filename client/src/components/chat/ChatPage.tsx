// // import React, { useEffect, useRef, useState } from 'react';
// // import { ChatMessageAPIType } from './chat-api';
// // import { useDispatch, useSelector } from 'react-redux';
// // import {
// //   selectChat,
// //   sendMessage,
// //   startMessagesListening,
// //   stopMessagesListening,
// // } from './chatSlice';
// // import { RootState } from '../../redux/store';
// import React from "react";

// export default function ChatPage(): JSX.Element {
//   return (
//     <div>
//       <h1>hello</h1>
//     </div>
//   );
// }

// // const ChatPage: React.FC = () => {
// //   return (
// //     <div>
// //
// //       {/* <Chat />
// //       <UsersList /> */}
// //     </div>
// //   );
// // };

// // const UsersList: React.FC = () => {
// //   const users = useSelector((state: RootState) => state.chat.users);

// //   return (
// //     <div>
// //       <h2>Users in the chat:</h2>
// //       <ul>
// //         {users.map((user) => (
// //           <li key={user.userId}>
// //             <img
// //               src={user.userPhoto}
// //               style={{ width: '30px' }}
// //               alt={user.userName}
// //             />
// //             {user.userName}
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // const Chat: React.FC = () => {
// //   const dispatch = useDispatch();
// //   const status = useSelector((state: RootState) => selectChat(state).status);

// //   useEffect(() => {
// //     dispatch(startMessagesListening() as any);
// //     return () => {
// //       dispatch(stopMessagesListening() as any);
// //     };
// //   }, []);

// //   return (
// //     <div>
// //       {status === 'error' && (
// //         <div>Some error occured. Please refresh the page</div>
// //       )}
// //       <>
// //         <Messages />
// //         <AddMessageForm />
// //       </>
// //     </div>
// //   );
// // };

// // const Messages: React.FC<{}> = ({}) => {
// //   const messages = useSelector((state: RootState) => state.chat.messages);
// //   const messagesAnchorRef = useRef<HTMLDivElement>(null);
// //   const [isAutoScroll, setIsAutoScroll] = useState(true);

// //   const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
// //     const element = e.currentTarget;
// //     if (
// //       Math.abs(
// //         element.scrollHeight - element.scrollTop - element.clientHeight
// //       ) < 300
// //     ) {
// //       !isAutoScroll && setIsAutoScroll(true);
// //     } else {
// //       isAutoScroll && setIsAutoScroll(false);
// //     }
// //   };

// //   useEffect(() => {
// //     if (isAutoScroll) {
// //       messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
// //     }
// //   }, [messages]);

// //   return (
// //     <div
// //       style={{ height: '400px', overflowY: 'auto' }}
// //       onScroll={scrollHandler}
// //     >
// //       {messages.map((m, index) => (
// //         <Message key={m.id} message={m} />
// //       ))}
// //       <div ref={messagesAnchorRef}></div>
// //     </div>
// //   );
// // };

// // // В вашем компоненте Message.tsx
// // const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(
// //   ({ message }) => {
// //     const author = useSelector((state: RootState) =>
// //       state.chat.users.find((user) => user.userId === message.authorId)
// //     );

// //     return (
// //       <div>
// //         <img
// //           src={author?.userPhoto}
// //           style={{ width: '30px' }}
// //           alt={author?.userName}
// //         />
// //         <b>{author?.userName}</b>
// //         <br />
// //         {message.message}
// //         <hr />
// //       </div>
// //     );
// //   }
// // );

// // const AddMessageForm: React.FC<{}> = () => {
// //   const [message, setMessage] = useState('');
// //   const dispatch = useDispatch();

// //   const status = useSelector((state: RootState) => state.chat.status);

// //   const sendMessageHandler = () => {
// //     if (!message) {
// //       return;
// //     }
// //     dispatch(sendMessage(message) as any);
// //     setMessage('');
// //   };

// //   return (
// //     <div>
// //       <div>
// //         <textarea
// //           onChange={(e) => setMessage(e.currentTarget.value)}
// //           value={message}
// //         ></textarea>
// //       </div>
// //       <div>
// //         <button disabled={status !== 'ready'} onClick={sendMessageHandler}>
// //           Send
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ChatPage;

// import React from "react";
// import { useState } from "react";
// import { Link } from "react-router-dom";

// import styles from "./cssChat/Main.module.css";

// const FIELDS = {
//   NAME: "name",
//   ROOM: "room",
// };

// const ChatPage = () => {
//   const { NAME, ROOM } = FIELDS;

//   const [values, setValues] = useState({ [NAME]: "", [ROOM]: "" });

//   const handleChange = ({ target: { value, name } }) => {
//     setValues({ ...values, [name]: value });
//   };

//   const handleClick = (e) => {
//     const isDisabled = Object.values(values).some((v) => !v);

//     if (isDisabled) e.preventDefault();
//   };

//   return (
//     <div className={styles.wrap}>
//       <div className={styles.container}>
//         <h1 className={styles.heading}>Join</h1>

//         <form className={styles.form}>
//           <div className={styles.group}>
//             <input
//               type="text"
//               name="name"
//               value={values[NAME]}
//               placeholder="Username"
//               className={styles.input}
//               onChange={handleChange}
//               autoComplete="off"
//               required
//             />
//           </div>
//           <div className={styles.group}>
//             <input
//               type="text"
//               name="room"
//               placeholder="Room"
//               value={values[ROOM]}
//               className={styles.input}
//               onChange={handleChange}
//               autoComplete="off"
//               required
//             />
//           </div>

//           <Link
//             className={styles.group}
//             onClick={handleClick}
//             to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`}
//           >
//             <button type="submit" className={styles.button}>
//               Sign In
//             </button>
//           </Link>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;

// ==============================ррр=======

// import React, { useState, useEffect } from 'react';

// function ChatPage() {
//   const [setWs] = useState<WebSocket | null>(null);
//   // Явно указываем, что messages - это массив строк
//   const [messages, setMessages] = useState<string[]>([]);
//   const [input, setInput] = useState('');

//   useEffect(() => {
//     const newWs = new WebSocket('ws://localhost:3001/');

//     newWs.onopen = () => {
//       console.log('WebSocket connection established');
//     };

//     newWs.onmessage = (event) => {
//       if (event.data instanceof Blob) {
//         const reader = new FileReader();
//         reader.onload = () => {
//           // Преобразование содержимого Blob в строку и добавление в состояние
//           const message = reader.result as string; // Приведение типа результата к строке
//           setMessages((prevMessages) => [...prevMessages, message]);
//         };
//         reader.readAsText(event.data);
//       } else {
//         // Добавление строки непосредственно в состояние
//         setMessages((prevMessages) => [...prevMessages, event.data]);
//       }
//     };

//     newWs.onerror = (error) => {
//       console.error('WebSocket error:', error);
//     };

//     setWs(newWs);

//     return () => {
//       newWs.close();
//     };
//   }, []);

//   const sendMessage = async () => {
//     if (input.trim()) {
//       try {
//         const response = await fetch('/api/message', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             // Cookies автоматически включаются в запрос, если клиент и сервер находятся на одном домене
//           },
//           credentials: 'include', // Для включения cookies в запросы между разными доменами
//           body: JSON.stringify({ text: input }),
//         });
//         if (response.ok) {
//           // Сервер должен возвращать полные данные сообщения, включая информацию об отправителе
//           const message = await response.json();
//           setMessages(prevMessages => [...prevMessages, message.text]); // Предполагаем, что сервер возвращает текст сообщения
//           setInput('');
//         } else {
//           console.error('Ошибка при отправке сообщения');
//         }
//       } catch (error) {
//         console.error('Ошибка при отправке сообщения:', error);
//       }
//     }
//   };
  
  

//   return (
//     <div>
//       <h2>Чат</h2>
//       <div>
//         {messages.map((message, index) => (
//           <p key={index}>{message}</p>
//         ))}
//       </div>
//       <input value={input} onChange={(e) => setInput(e.target.value)} />
//       <button onClick={sendMessage}>Отправить</button>
//     </div>
//   );
// }

// export default ChatPage;


import React, { useState, useEffect } from 'react';
import './styles/ChatPage.css'; 

function ChatPage() {
  const [ws, setWs] = useState<WebSocket | null>(null); // Правильно инициализируем состояние
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const newWs = new WebSocket('wss://pinter.fun/ws/');

    newWs.onopen = () => {
      console.log('WebSocket connection established');
    };

    newWs.onmessage = (event) => {
      if (event.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          const message = reader.result as string;
          setMessages((prevMessages) => [...prevMessages, message]);
        };
        reader.readAsText(event.data);
      } else {
        setMessages((prevMessages) => [...prevMessages, event.data]);
      }
    };

    newWs.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    setWs(newWs); // Корректно обновляем состояние

    return () => {
      newWs.close();
    };
  }, []);

  const sendMessage = async () => {
    if (input.trim() && ws) {
      ws.send(input);
      setInput('');
    }
  };

  return (
    <div className="chat-container">
      <h2>Чат</h2>
      <div className="messages-container">
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <input
        className="input-message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Введите сообщение"
      />
      <button className="send-button" onClick={sendMessage}>Отправить</button>
    </div>
  );
}

export default ChatPage;