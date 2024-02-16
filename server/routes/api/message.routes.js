const express = require('express');
const router = express.Router()
const { Message } = require('../../db/models');
const verifyAccessToken = require('../../middleware/verifyJWT');


router.post('/', verifyAccessToken, async (req, res) => {
  try {
    const { text } = req.body;
    const user = res.locals.user;
    const message = await Message.create({
      text,
      userId: user.id, 
      // room_dialogue_id
    });
    // Отправка сохраненного сообщения обратно клиенту или через WebSocket всем подключенным пользователям
    res.status(201).json(message);
  } catch (error) {
    console.error('Ошибка при сохранении сообщения:', error);
    res.status(500).json({ message: 'Ошибка при сохранении сообщения' });
  }
});

module.exports = router;