const express = require("express");
const TableModel = require("../models/tables");

const router = express.Router();

router.get("/all", async (req, res) => {
  const tables = await TableModel.find().sort("name");
  res.send(tables);
});

router.get("/:id", async (req, res) => {
  const movie = await TableModel.findById(req.params.id);
  if (!movie) return res.status(404).send();
  res.send(movie);
});

router.post("/", async (req, res) => {
  if (!req.body.title) return res.status(400).send("Title is required.");

  const movie = new TableModel({ title: req.body.title });
  await movie.save();
  res.status(201).send(movie);
});

router.delete("/:id", async (req, res) => {
  const movie = await TableModel.findByIdAndDelete(req.params.id);

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.status(204).send();
});

module.exports = router;
