const express = require("express");
const PlayerModel = require("../models/players");

const router = express.Router();

router.get("/all", async (req, res) => {
  const players = await PlayerModel.find().sort("name");
  res.send(players);
});

router.get("/:id", async (req, res) => {
  const movie = await PlayerModel.findById(req.params.id);
  if (!movie) return res.status(404).send();
  res.send(movie);
});

router.post("/", async (req, res) => {
  if (!req.body.playerId) return res.status(400).send("playerId is required.");

  tableDetail = [
    '(child noises in the background)',
    'Hello, Hello?',
    'i need to jump in another call',
    'can everyone go on mute',
    'could you please get closer to the mic',

    '(load painful echo / feedback)',
    'Next slide, please.',
    'can we take this offline?',
    'is __ on the call?',
    'Could you share this slides afterwards?',
    'can somebody grant presenter right?',

    'can somebody grant presenter rights',
    'can you email that to everyone?',
    'sorry, i had problems logging in',
    '(animal noises in the background)',

    'sorry, i did not found the conference id',
    'i was having connection issues',
    'i will have to get back to you',
    'who just joined',
    'sorry, something __ with my calendar',

    'do you see my screen?',
    'lets wait for __!',
    'You will send the minutes?',
    'sorry, i was in mute.',
    'can you repeat, please?',
  ]

  const player = new PlayerModel({ playerId: req.body.playerId, table: req.body.table });
  await player.save();
  res.status(201).send(player);
});

router.delete("/:id", async (req, res) => {
  const player = await PlayerModel.findByIdAndDelete(req.params.id);

  if (!player)
    return res.status(404).send("The player with the given ID was not found.");

  res.status(204).send();
});

module.exports = router;
