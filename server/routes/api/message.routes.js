// const express = require('express');
// const router = express.Router()
// const { Message } = require('../../db/models');
// const verifyAccessToken = require('../../middleware/verifyJWT');


// router.post('/', verifyAccessToken, async (req, res) => {
//   try {
//     const { text } = req.body;
//     const user = res.locals.user;
//     const message = await Message.create({
//       text,
//       userId: user.id, 
//       time_stamp: new Date(),
//       room_dialogue_id: 1,
//     });
//     // Отправка сохраненного сообщения обратно клиенту или через WebSocket всем подключенным пользователям
//     res.status(201).json(message);
//   } catch (error) {
//     console.error('Ошибка при сохранении сообщения:', error);
//     res.status(500).json({ message: 'Ошибка при сохранении сообщения' });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router()

const { Message, Room_Dialogue, Group_Member, User } = require('../../db/models')

router.get('/:roomId', async (req, res) =>{
  try {
    const { roomId } = req.params
    const messages = await Message.findAll({
      where: { room_dialogue_id: roomId },
    })

    const messagesWithUser = await Promise.all(messages.map(async (message) => {
      const user = await User.findByPk(message.userId);
      return { ...message.toJSON(), user };
    }));

    const room = await Room_Dialogue.findOne({
      where: { id: roomId },
    })
    
    res.json({ messages: messagesWithUser, room })

  } catch (error) {
    console.error('CURVA:', error);
    res.status(500).json({ message: 'CURVA' })
  }
})



module.exports = router;