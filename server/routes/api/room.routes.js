const router = require("express").Router();
const {
  Room_Dialogue,
  Access_Table,
  Group_Member,
  Party,
} = require("../../db/models");

router.post("/", async (req, res) => {
  try {
    const { user } = res.locals;
    const { title, partyName } = req.body.data;
    const token = "1234";
    const party = await Party.findOne({ where: { title: partyName } });
    const room = await Room_Dialogue.create({ title, token });
    const access_table = await Access_Table.create({
      room_token: token,
      user_id: user.id,
    });
    const group_member = await Group_Member.create({
      user_id: user.id,
      room_dialogue_id: room.id,
      party_id: party.id,
    });
    res.json({ message: "ok" });
  } catch ({ message }) {
    console.log(message);
  }
});

module.exports = router;
