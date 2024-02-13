// routes/chat.js
const express = require('express');
const { Message } = require('../../db/models'); // Импортируем модель Message
const { Room_Dialogue } = require('../../db/models'); // Импортируем модель Room_Dialogue

const router = express.Router();

router.post('/send-message', async (req, res) => {
  try {
    const { text, room_dialogue_id } = req.body;
    const userId = res.locals.user?.id; // Получаем userId из информации о пользователе

    const message = await Message.create({
      text,
      userId,
      room_dialogue_id,
    });

    res.status(201).json(message);
  } catch (error) {
    console.error('Error sending message:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/delete-message/:id', async (req, res) => {
  try {
    const messageId = req.params.id;
    await Message.destroy({
      where: {
        id: messageId,
      },
    });

    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
