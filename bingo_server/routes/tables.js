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
  if (!req.body.name) return res.status(400).send("Name is required.");

  const table = new TableModel({ name: req.body.name });
  await table.save();
  res.status(201).send(table);
});

router.delete("/:id", async (req, res) => {
  const table = await TableModel.findByIdAndDelete(req.params.id);

  if (!table)
    return res.status(404).send("The table with the given ID was not found.");

  res.status(204).send();
});

module.exports = router;
