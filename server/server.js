// const { WebSocket, WebSocketServer } = require('ws');
// const http = require('http');
// const uuid = require('uuid').v4;

// const server = http.createServer();
// const wsServer = new WebSocketServer({ server });

// const port = 8000;

// wsServer.on('connetcion', (ws) => {
//   console.log('ws connected');
//   ws.on('message', (message, isBinary) => {
//     console.log('message from front:', message);
//   });

//   ws.on('close', () => {
//     console.log('disconnected');
//   });
// });

// server.listen(port, () => {
//   console.log('WS is up to:', port);
// });

const WebSocket = require('ws');
const http = require('http');

// Создаем массив для хранения сообщений
const messages = [];

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket сервер запущен');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Клиент подключен');

  // Отправляем все существующие сообщения при подключении нового клиента
  ws.send(JSON.stringify(messages));

  ws.on('message', (message) => {
    console.log(`Получено сообщение: ${message}`);

    try {
      // Попытка разобрать сообщение как JSON
      const parsedMessage = JSON.parse(message);

      // Добавляем новое сообщение в массив
      messages.push(parsedMessage);

      // Выводим массив в консоль сервера
      console.log('Текущий массив сообщений:', messages);

      // Отправляем новое сообщение всем подключенным клиентам
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify([parsedMessage]));
        }
      });
    } catch (error) {
      console.error('Ошибка при разборе сообщения как JSON:', error.message);
      // Если разбор не удался, обрабатываем ошибку соответственно
    }
  });

  ws.on('close', () => {
    console.log('Клиент отключен');
  });
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Сервер слушает порт ${PORT}`);
});
