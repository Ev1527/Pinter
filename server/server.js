// const express = require("express");
// const app = express();
// const serverConfig = require("./config/serverConfig");
// const PORT = process.env.PORT || 3001;

// const indexRouter = require('./routes/index.routes')


// serverConfig(app);
// app.use('/', indexRouter)

// app.listen(PORT, () => {
//   console.log(`Этот сервер умирает на ${PORT} порту`);
// });


const express = require("express");
const app = express();
const server = require("http").createServer(app);
const WebSocket = require("ws");
const serverConfig = require("./config/serverConfig");
const PORT = process.env.PORT || 3001;
const {Message} = require('./db/models'); // Путь к модели Message

const indexRouter = require('./routes/index.routes');
const { log } = require("console");


serverConfig(app);
app.use('/', indexRouter);

const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  ws.on('message', async function incoming(data) {
    try {
      const { userId, message, roomDialogueId } = JSON.parse(data);
      console.log(userId, message, roomDialogueId)

      // Создаем новое сообщение и сохраняем его в базе данных
      const newMessage = await Message.create({
        userId,
        text: message,
        time_stamp: new Date(),
        room_dialogue_id: roomDialogueId
      });

      console.log('Сообщение сохранено', newMessage);

      // Отправляем сообщение обратно всем подключенным клиентам (опционально)
      // wss.clients.forEach(function each(client) {
      //   if (client !== ws && client.readyState === WebSocket.OPEN) {
      //     client.send(data);
      //   }
      // });
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(newMessage)); // Отправляем JSON объект
        }
      });
    } catch (error) {
      console.error('Ошибка при сохранении сообщения:', error);
      // Отправляем сообщение об ошибке обратно клиенту
      ws.send(JSON.stringify({ error: 'Ошибка при сохранении сообщения.' }));
    }
  });

  // При подключении отправляем приветственное сообщение
  ws.send(JSON.stringify({ message: 'Вы подключились к WebSocket серверу' }));
});

server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});