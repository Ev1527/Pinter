// // const WebSocket = require('ws');
// // const http = require('http');

// // // Создаем Map для хранения сообщений по комнатам
// // const rooms = new Map();

// // const server = http.createServer((req, res) => {
// //   res.writeHead(200, { 'Content-Type': 'text/plain' });
// //   res.end('WebSocket сервер запущен');
// // });

// // const wss = new WebSocket.Server({ server });

// // // wss.on('connection', (ws, req) => {
// // //   console.log('Клиент подключен');

// // //   const urlParts = req.url.split('/');
// // //   const roomId = urlParts[urlParts.length - 1];

// // //   ws.roomId = roomId;

// // //   // Проверяем, существует ли комната в Map
// // //   if (!rooms.has(roomId)) {
// // //     rooms.set(roomId, []);
// // //   }

// // //   // Отправляем все существующие сообщения при подключении нового клиента
// // //   ws.send(JSON.stringify(rooms.get(roomId)));

// // //   ws.on('message', (message) => {
// // //     console.log(`Получено сообщение: ${message}`);
// // //     console.log('rooms', rooms);

// // //     try {
// // //       const parsedMessage = JSON.parse(message);

// // //       // Добавляем новое сообщение в массив для конкретной комнаты
// // //       rooms.get(roomId).push(parsedMessage);

// // //       // Отправляем новое сообщение всем клиентам в данной комнате
// // //       wss.clients.forEach((client) => {
// // //         if (client.readyState === WebSocket.OPEN && client.roomId === roomId) {
// // //           client.send(JSON.stringify([parsedMessage]));
// // //         }
// // //       });
// // //     } catch (error) {
// // //       console.error('Ошибка при разборе сообщения как JSON:', error.message);
// // //     }
// // //   });

// // //   ws.on('close', () => {
// // //     console.log('Клиент отключен');
// // //   });
// // // });
// // wss.on('connection', (ws, req) => {
// //   console.log('Клиент подключен');

// //   const urlParts = req.url.split('/');
// //   const roomId = urlParts[urlParts.length - 1];

// //   ws.roomId = roomId;

// //   // Проверяем, существует ли комната в Map
// //   if (!rooms.has(roomId)) {
// //     rooms.set(roomId, []);
// //   }

// //   // Отправляем все существующие сообщения при подключении нового клиента
// //   ws.send(JSON.stringify(rooms.get(roomId)));

// //   ws.on('message', (message) => {
// //     console.log(`Получено сообщение: ${message} в комнате ${roomId}`);

// //     try {
// //       const parsedMessage = {
// //         ...JSON.parse(message),
// //         email: ws.email, // Добавляем email пользователя
// //       };

// //       // Добавляем новое сообщение в массив для конкретной комнаты
// //       rooms.get(roomId).push(parsedMessage);

// //       // Отправляем новое сообщение всем клиентам в данной комнате
// //       wss.clients.forEach((client) => {
// //         if (client.readyState === WebSocket.OPEN && client.roomId === roomId) {
// //           client.send(JSON.stringify([parsedMessage]));
// //         }
// //       });
// //     } catch (error) {
// //       console.error('Ошибка при разборе сообщения как JSON:', error.message);
// //     }
// //   });

// //   ws.on('close', () => {
// //     console.log('Клиент отключен');
// //   });
// // });

// // const PORT = 8000;
// // server.listen(PORT, () => {
// //   console.log(`Сервер слушает порт ${PORT}`);
// // });



// const WebSocket = require('ws');
// const https = require('https');
// const fs = require('fs')

// // const server = https.createServer((req, res) => {
// //    res.writeHead(200, { 'Content-Type': 'text/plain' });
// //    res.end('WebSocket сервер запущен');
// // });
// const server = https.createServer({
//   cert: fs.readFileSync('/etc/letsencrypt/live/pinter.fun/fullchain.pem'),
//   key: fs.readFileSync('/etc/letsencrypt/live/pinter.fun/privkey.pem'),
// });

// const wss = new WebSocket.Server({ server });

// wss.on('connection', (ws, req) => {
//   console.log('Клиент подключен');

//   const urlParts = req.url.split('/');
//   const roomId = urlParts[urlParts.length - 1];

//   ws.roomId = roomId;

//   // Проверяем, существует ли комната в Map
//   if (!rooms.has(roomId)) {
//     rooms.set(roomId, []);
//   }

//   // Отправляем все существующие сообщения при подключении нового клиента
//   ws.send(JSON.stringify(rooms.get(roomId)));

//   ws.on('message', (message) => {
//     console.log(`Получено сообщение: ${message} в комнате ${roomId}`);

//     try {
//       const parsedMessage = {
//         ...JSON.parse(message),
//         email: ws.email, // Добавляем email пользователя
//       };

//       // Добавляем новое сообщение в массив для конкретной комнаты
//       rooms.get(roomId).push(parsedMessage);

//       // Отправляем новое сообщение всем клиентам в данной комнате
//       wss.clients.forEach((client) => {
//         if (client.readyState === WebSocket.OPEN && client.roomId === roomId) {
//           client.send(JSON.stringify([parsedMessage]));
//         }
//       });
//     } catch (error) {
//       console.error('Ошибка при разборе сообщения как JSON:', error.message);
//     }
//   });

//   ws.on('close', () => {
//     console.log('Клиент отключен');
//   });
// });

// const PORT = 8000;
// server.listen(PORT, () => {
//   console.log(`Сервер слушает порт ${PORT}`);
// });
