import React, { FC, useEffect, useState } from 'react';

// Интерфейс для пропсов компонента ChatPage
interface ChatPageProps {
  roomId: string | undefined;
}

// Тип сообщения в чате
export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};

// Компонент ChatPage
const ChatPage: FC<ChatPageProps> = ({ roomId }) => {
  // Состояние для хранения WebSocket-канала
  const [wsChannel, setWsChannel] = useState<WebSocket | null>(null);

  // Эффект, который создает и обновляет WebSocket-канал при изменении roomId
  useEffect(() => {
    let ws: WebSocket;

    // Обработчик закрытия WebSocket-соединения
    const closeHandler = () => {
      console.log('CLOSE WS');
      setTimeout(createChannel, 3000);
    };

    // Функция для создания нового WebSocket-канала
    function createChannel() {
      // Отключаем предыдущий обработчик закрытия
      ws?.removeEventListener('close', closeHandler);
      // Закрываем предыдущее соединение
      ws?.close();

      // Используем roomId для создания уникального WebSocket-пути
      ws = new WebSocket(`ws://localhost:8000/chat/${roomId}`);
      // Добавляем обработчик закрытия
      ws?.addEventListener('close', closeHandler);
      // Устанавливаем WebSocket-канал в состояние
      setWsChannel(ws);
    }

    // Создаем WebSocket-канал при монтировании компонента
    createChannel();

    // Очищаем ресурсы при размонтировании компонента
    return () => {
      ws.removeEventListener('close', closeHandler);
      ws.close();
    };
  }, [roomId]);

  // Возвращаем JSX-разметку компонента ChatPage
  return (
    <div>
      {/* Вложенные компоненты для отображения сообщений и формы отправки */}
      <Messages wsChannel={wsChannel} />
      <AddMessageForm wsChannel={wsChannel} />
    </div>
  );
};

// Компонент Messages
const Messages: FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
  // Состояние для хранения массива сообщений
  const [messages, setMessages] = useState<ChatMessageType[]>([]);

  // Эффект, который обрабатывает новые сообщения от WebSocket-канала
  useEffect(() => {
    const messageHandler = (e: MessageEvent) => {
      try {
        const newMessages = JSON.parse(e.data);

        // Добавляем новые сообщения к текущему состоянию
        if (Array.isArray(newMessages)) {
          setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        } else {
          console.error('Invalid message format. Expected an array.');
        }
      } catch (error: any) {
        console.error('Error parsing message:', error.message);
      }
    };

    // Добавляем обработчик события при монтировании компонента
    wsChannel?.addEventListener('message', messageHandler);

    // Очищаем ресурсы при размонтировании компонента
    return () => {
      wsChannel?.removeEventListener('message', messageHandler);
    };
  }, [wsChannel]);

  // Возвращаем JSX-разметку компонента Messages
  return (
    <div>
      {/* Отображаем каждое сообщение с помощью компонента Message */}
      {messages.map((m: ChatMessageType, index) => (
        <Message key={index} message={m} />
      ))}
    </div>
  );
};

// Компонент Message для отображения отдельного сообщения
const Message: FC<{ message: ChatMessageType }> = ({ message }) => {
  return (
    <div className='message'>
      <img src={message.photo} alt="User's photo" />
      <b>{message.userName}</b>
      <br />
      {message.message}
      <hr />
    </div>
  );
};

// Компонент AddMessageForm для отправки новых сообщений
const AddMessageForm: FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
  // Состояние для хранения текста сообщения и статуса готовности
  const [message, setMessage] = useState('');
  const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>(
    'pending'
  );

  // Эффект, который обрабатывает изменение статуса готовности при открытии WebSocket
  useEffect(() => {
    const openHandler = () => {
      setReadyStatus('ready');
    };

    // Добавляем обработчик события при монтировании компонента
    wsChannel?.addEventListener('open', openHandler);

    // Очищаем ресурсы при размонтировании компонента
    return () => {
      wsChannel?.removeEventListener('open', openHandler);
    };
  }, [wsChannel]);

  // Функция для отправки сообщения через WebSocket
  const sendMessageHandler = () => {
    if (!message) {
      return;
    }

    const messageObject = {
      message: message,
    };

    // Отправляем сообщение в формате JSON
    wsChannel?.send(JSON.stringify(messageObject));
    // Сбрасываем состояние текста сообщения
    setMessage('');
  };

  // Возвращаем JSX-разметку компонента AddMessageForm
  return (
    <div>
      <div>
        {/* Текстовая область для ввода сообщения */}
        <textarea
          onChange={(e) => setMessage(e.currentTarget.value)}
          value={message}
        ></textarea>
      </div>
      <div>
        {/* Кнопка для отправки сообщения */}
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

// Экспортируем компонент ChatPage по умолчанию
export default ChatPage;