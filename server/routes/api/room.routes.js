const router = require("express").Router();
const {
  Room_Dialogue,
  Access_Table,
  Group_Member,
  Test,
} = require("../../db/models");
const { v4: uuidv4 } = require("uuid");

router.get("/access_tables", async (req, res) => {
  try {
    const access_tables = await Access_Table.findAll();
    res.json(access_tables);
  } catch ({ message }) {
    console.log(message);
  }
});

router.get("/:partyId", async (req, res) => {
  try {
    const { partyId } = req.params;
    const rooms = await Room_Dialogue.findAll({
      where: { party_id: +partyId },
      include: { model: Test },
    });

    res.json(rooms);
  } catch ({ message }) {
    res.json(message);
  }
});

router.post("/roomDialogue", async (req, res) => {
  try {
    const { user } = res.locals;
    if (!user.name) {
      return res.end();
    }
    const {
      title,
      members,
      description,
      firstQuestion,
      secondQuestion,
      thirdQuestion,
      firstAnswer,
      secondAnswer,
      thirdAnswer,
      partyId,
    } = req.body.data;
    const qa = {
      question1: {
        question: firstQuestion,
        answer: firstAnswer,
      },
      question2: {
        question: secondQuestion,
        answer: secondAnswer,
      },
      question3: {
        question: thirdQuestion,
        answer: thirdAnswer,
      },
    };
    const token = uuidv4();
    //  const party = await Party.findOne({ where: { id: partyId } });
    const room = await Room_Dialogue.create({
      title,
      token,
      description,
      members,
      party_id: +partyId,
    });
    const access_table = await Access_Table.create({
      room_token: token,
      access: true,
      user_id: user.id,
    });
    const group_member = await Group_Member.create({
      user_id: user.id,
      room_dialogue_id: room.id,
    });
    const test = await Test.create({
      title,
      room_dialogue_id: room.id,
      qa,
    });
    console.log('test: ', test);
    const newRoom = await Room_Dialogue.findOne({
      where: { id: room.id },
      include: { model: Test }, 
      // include: { model: Access_Table },
    });
    // console.log(newRoom);
    // // res.json({message: "ok"});
    res.json({newRoom, access_table});
  } catch ({ message }) {
    console.log(message);
  }
});

// router.get("/tests", async (req, res) => {
//   try {
//     const tests = await Test.findAll();
//     console.log(tests);
//     res.json(tests);
//   } catch ({ message }) {
//     console.log(message);
//   }
// });

router.post("/test", async (req, res) => {
  try {
    const { firstAnswer, secondAnswer, thirdAnswer, roomId } = req.body.data;
    const test = await Test.findOne({ where: { room_dialogue_id: roomId } });
    const { question1, question2, question3 } = test.qa;
    if (
      firstAnswer === question1.answer &&
      secondAnswer === question2.answer &&
      thirdAnswer === question3.answer
    ) {
      const room = await Room_Dialogue.findOne({
        where: { id: roomId },
      });
      const group_member = await Group_Member.create({
        user_id: res.locals.user.id,
        room_dialogue_id: room.id,
      });
      const access = await Access_Table.create({
        room_token: room.token,
        access: true,
        user_id: res.locals.user.id,
      });
      const access_table = await Access_Table.findOne({
        where: { id: access.id },
      });
      return res.json({ access_table, message: 'ok' });
    }

    const room = await Room_Dialogue.findOne({
      where: { id: roomId },
    });
    const access = await Access_Table.create({
      room_token: room.token,
      access: false,
      user_id: res.locals.user.id,
    });
    const access_table = await Access_Table.findOne({
      where: { id: access.id },
    });

    res.json({ access_table, message: 'failed' });
  } catch ({ message }) {
    res.json(message);
  }
});

module.exports = router;
