// import React, { useState, useEffect } from 'react';
// import styles from './styles/ChatPage.module.scss'; // Подключила модульный scss
// import { useNavigate, useParams } from 'react-router-dom';
// import Message from '../room/Message';
// import { useAppSelector } from '../../redux/store';

// function ChatPage(): JSX.Element {
//   const [ws, setWs] = useState<WebSocket | null>(null); // Правильно инициализируем состояние
//   const [messages, setMessages] = useState<string[]>([]);
//   const [input, setInput] = useState('');
//   const nav = useNavigate();
//   const [roomTitle, setRoomTitle] = useState<string | null>(null);

//   const { rooms } = useAppSelector((store) => store.room)
//   const { roomId } = useParams();

  // // let room;
  // useEffect(() => {
  //   if (roomId) {
  //     const room = rooms.find((room) => room.id === +roomId);
  //     if (room) {
  //       setRoomTitle(room.title);
  //     }
  //   }
  // }, [roomId, rooms])

  
//   useEffect(() => {
//     const newWs = new WebSocket('wss://pinter.fun/ws/');

//     newWs.onopen = () => {
//       console.log('WebSocket connection established');
//     };

//     newWs.onmessage = (event) => {
//       if (event.data instanceof Blob) {
//         const reader = new FileReader();
//         reader.onload = () => {
//           const message = reader.result as string;
//           setMessages((prevMessages) => [...prevMessages, message]);
//         };
//         reader.readAsText(event.data);
//       } else {
//         setMessages((prevMessages) => [...prevMessages, event.data]);
//       }
//     };

//     newWs.onerror = (error) => {
//       console.error('WebSocket error:', error);
//     };

//     setWs(newWs); // Корректно обновляем состояние

//     return () => {
//       newWs.close();
//     };
//   }, []);

//   // _______________код Сережи
//   const sendMessage = async () => {
//     if (input.trim() && ws) {
//       ws.send(input);
//       setInput('');
//     }
//   };
//   // _______________код Сережи

//   // В вашем компоненте ChatPage
//   // const sendMessage = async () => {
//   //   if (input.trim() && ws) {
//   //     const data = {
//   //       message: input,
//   //       user: {
//   //         id: user?.id,
//   //         name: user?.name,
//   //       }
//   //     };
//   //     ws.send(JSON.stringify(data));
//   //     setInput('');
//   //   }
//   // };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       sendMessage(); // Здесь выполняется  логика отправки сообщения на enter
//     }
//   };

//   return (
//     // <div className="chat-container">
//     //   <h2>Чат</h2>
//     //   <div className="messages-container">
//     //     {messages.map((message, index) => (
//     //       <p key={index}>{message}</p>
//     //     ))}
//     //   </div>
//     //   <input
//     //     className="input-message"
//     //     value={input}
//     //     onChange={(e) => setInput(e.target.value)}
//     //     placeholder="Введите сообщение"
//     //   />
//     //   <button className="send-button" onClick={sendMessage}>Отправить</button>
//     // </div>
//     // ___________выше находится код Сережи

    // <div className={styles.chat}>
    //     <div className={styles.chat__header}>
    //       <h2>Чат встречи</h2>
    //       <div>
    //         <p>Тема: <span>{roomTitle || 'Безымянный чат'}</span></p>
    //       </div>
    //       <div className={styles.chat__header__nav}>
    //         <p onClick={() => nav(-1)}>Назад</p>
    //         <h3 onClick={() => nav('/')}>На главную</h3>
    //       </div>
    //     </div>

    //     <div className={styles.chat__body}>
    //       <div className={styles.messages}>
    //         {messages.map((message, index) => (
    //           <Message key={index} message={message} />
    //         ))}
    //       </div>
    //       <div className={styles.send_message}>
    //         <input
    //           value={input}
    //           onChange={(e) => setInput(e.target.value)}
    //           onBlur={sendMessage}
    //           onKeyDown={handleKeyPress}
    //           placeholder="Введите сообщение"
    //         />
    //         <button type="button" onClick={sendMessage}>Отправить</button>
    //       </div>
    //     </div>
    //   </div>
//   );
// }

// export default ChatPage;

import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from './styles/ChatPage.module.scss'; // Подключила модульный scss
import { useNavigate, useParams } from 'react-router-dom';
import { User } from "../users/types/User";
import Message from "../room/Message";


export interface IMessage {
  text: string;
  userId: number;
  time_stamp: Date;
  room_dialogue_id: number;
  user?: User;
}

const ChatPage = (): JSX.Element => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [input, setInput] = useState("");
  const [allMessages, setAllMessages] = useState<any[]>([]);
  const [roomTitle, setRoomTitle] = useState<string | null>(null);
  const [roomDescription, setRoomDescription] = useState<string | null>(null);
  const [users, setUsers] = useState<any[]>([]);

  const { roomId } = useParams();
  const nav = useNavigate();


  useEffect(() => {
    const ws = new WebSocket("wss://pinter.fun/ws/");
    ws.onmessage = (event) => {
      console.log('Получено сообщение:', event.data);
      const message = JSON.parse(event.data);
      console.log(message);
      
      // Обновляем состояние allMessages, добавляя новое сообщение
      setAllMessages((prevMessages) => [...prevMessages, message]);
    };
    setWs(ws);
  
    return () => {
      ws?.close();
    };
  }, []);

  useEffect(() => {
    const takeMessages = async () => {
      try {
        const { data } = await axios(`/api/message/${roomId}`);
        
        // const users = data.messages.map(message => message.user);
        const users = Object.values(data.messages.reduce((acc: any, message: any) => {
          // Проверяем, есть ли уже такой пользователь в аккумуляторе
          if (!acc[message.user.id]) {
            // Если пользователь еще не добавлен, добавляем его в аккумулятор
            acc[message.user.id] = message.user;
          }
          return acc;
        }, {}));

        setAllMessages(data.messages);
        setRoomTitle(data.room.title);
        setRoomDescription(data.room.description);
        setUsers(users);

      } catch (error) {
        console.error(error)
      }
    }

    takeMessages()
  }, [])
  

  
  const sendMessage = () => {
    const userJson: string | null = localStorage.getItem("user");
    let user
    if (userJson !== null) {
      // console.log(JSON.parse(userJson));
    user = JSON.parse(userJson);
    } else {
      // console.log({ messages });
      return
    }
    if (input.trim() && ws && user) {
      const messageData = {
        userId: user.id, // Преобразуем userId из строки в число
        message: input,
        roomDialogueId: Number(roomId), // Пример ID комнаты
      };

      ws.send(JSON.stringify(messageData)); // Отправляем сообщение
      setInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      sendMessage();
    }
  };
  
console.log(allMessages);

  return (
    <div className={styles.chat__container}>
      <div className={styles.chat}>
        <div className={styles.chat__header}>
          <div className={styles.users}>
            <h2>Чат встречи</h2>
            {users && users.map((user) => (
              <img key={user.id} src={user.image} alt="user logo" />
            ))}
          </div>
          <div className={styles.chat__header__info}>
            <p>Тема: <span className={styles.title}>{roomTitle || 'Безымянный чат'}</span></p>
            <p>Описание: <span>{roomDescription}</span></p>
          </div>
          <div className={styles.chat__header__nav}>
            <p onClick={() => nav(-1)}>Назад</p>
            <h3 onClick={() => nav('/')}>На главную</h3>
          </div>
        </div>
        <div className={styles.chat__body}>
          <div className={styles.messages}>
            {allMessages.map((msg, index) => (
              <Message key={index} message={msg} isCurrentUser={msg.userId == msg.user?.id} />
            ))}
          </div>

          <div className={styles.send_message}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onBlur={sendMessage}
              onKeyDown={handleKeyPress}
              placeholder="Написать сообщение..."
            />
            <button type="button" onClick={sendMessage}>Отправить</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

