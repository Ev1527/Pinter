// const expressWs = require('express-ws');

// const setupWebsockets = (app, rooms) => {
//   expressWs(app);

//   app.ws('/chat', (ws, req) => {
//     console.log('Клиент подключен');

//     const urlParts = req.url.split('/');
//     const roomId = urlParts[urlParts.length - 1];

//     ws.roomId = roomId;

//     if (!rooms.has(roomId)) {
//       rooms.set(roomId, []);
//     }

//     ws.send(JSON.stringify(rooms.get(roomId)));

//     ws.on('message', (message) => {
//       console.log(`Получено сообщение: ${message} в комнате ${roomId}`);

//       try {
//         const parsedMessage = {
//           ...JSON.parse(message),
//           email: ws.email,
//         };

//         rooms.get(roomId).push(parsedMessage);

//         app.getWss('/chat').clients.forEach((client) => {
//           if (client.readyState === WebSocket.OPEN) {
//             client.send(JSON.stringify([parsedMessage]));
//           }
//         });
//       } catch (error) {
//         console.error('Ошибка при разборе сообщения как JSON:', error.message);
//       }
//     });

//     ws.on('close', () => {
//       console.log('Клиент отключен');
//     });
//   });
// };

// module.exports = setupWebsockets;
