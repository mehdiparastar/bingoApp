const express = require("express");
const PlayerModel = require("../models/players");

const router = express.Router();

router.get("/all", async (req, res, next) => {
  try {
    const players = await PlayerModel.find().sort("playerId");
    res.send(players);
  }
  catch (ex) {
    next(ex)
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const playerId = await PlayerModel.findById(req.params.id);
    if (!playerId) return res.status(404).send();
    res.send(playerId);
  }
  catch (ex) {
    next(ex)
  }
});

router.post("/", async (req, res, next) => {
  try {
    if (!req.body.playerId) return res.status(400).send("playerId is required.");

    const player = new PlayerModel({ playerId: req.body.playerId, table: req.body.table });
    await player.save();
    res.status(201).send(player);
  }
  catch (ex) {
    next(ex)
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const player = await PlayerModel.findByIdAndDelete(req.params.id);

    if (!player)
      return res.status(404).send("The player with the given ID was not found.");

    res.status(204).send();
  }
  catch (ex) {
    next(ex)
  }
});

module.exports = router;
