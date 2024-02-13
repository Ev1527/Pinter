const router = require("express").Router();
const {
  Room_Dialogue,
  Access_Table,
  Group_Member,
  Party,
  Test,
} = require("../../db/models");
const { v4: uuidv4 } = require("uuid");

router.get("/:partyId", async (req, res) => {
  try {
    const { partyId } = req.params;
    const rooms = await Room_Dialogue.findAll({ where: { party_id: partyId } });
    res.json(rooms);
  } catch ({ message }) {
    res.json(message);
  }
});

router.post("/roomDialogue", async (req, res) => {
  try {
    const { user } = res.locals;
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
    console.log(token);
    // const party = await Party.findOne({ where: { id: partyId } });
    const room = await Room_Dialogue.create({
      title,
      token,
      description,
      members,
      party_id: partyId,
    });
    const access_table = await Access_Table.create({
      room_token: token,
      user_id: user.id,
    });
    const group_member = await Group_Member.create({
      user_id: user.id,
      room_dialogue_id: room.id,
      // party_id: party.id,
    });
    const test = await Test.create({
      title,
      room_dialogue_id: room.id,
      qa: JSON.stringify(qa),
    });
    // res.json({message: "ok"});
    res.json(room);
  } catch ({ message }) {
    console.log(message);
  }
});

module.exports = router;
