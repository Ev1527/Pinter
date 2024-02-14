const router = require('express').Router();
const {
  Message,
  Room_Dialogue,
  User,
  Group_Member,
} = require('../../db/models');
const { v4: uuidv4 } = require('uuid');

router.get('/:roomId', async (req, res) => {
  try {
    const { roomId } = req.params;
    const messages = await Message.findAll({
      where: { room_dialogue_id: roomId },
      include: [
        {
          model: Group_Member,
          include: {
            model: User,
          },
        },
      ],
    });
    res.json(messages);
  } catch ({ message }) {
    res.json(message);
  }
});

router.post('/send-message', async (req, res) => {
  try {
    const userId = user.id;
    const { text, room_dialogue_id } = req.body;
    const timeStamp = Date.now();

    const message = await Message.create({
      text,
      userId,
      room_dialogue_id,
      timeStamp,
    });
    console.log(message);

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
