const router = require("express").Router();
const { Party } = require("../../db/models");

router.get("/", async (req, res) => {
  try {
    const parties = await Party.findAll();
    res.json(parties)
  } catch ({ message }) {
    console.log(message);
  }
});

module.exports = router;
