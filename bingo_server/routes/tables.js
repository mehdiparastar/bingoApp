const express = require("express");
const TableModel = require("../models/tables");

const router = express.Router();

router.get("/all", async (req, res, next) => {
  try {
    const tables = await TableModel.find().sort("name");
    res.send(tables);
  }
  catch (ex) {
    next(ex)
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const table = await TableModel.findById(req.params.id);
    if (!table) return res.status(404).send();
    res.send(table);
  }
  catch (ex) {
    next(ex)
  }
});

router.post("/", async (req, res, next) => {
  try {
    if (!req.body.name) return res.status(400).send("Name is required.");
    const table = new TableModel({ name: req.body.name });
    await table.save();
    res.status(201).send(table);
  }
  catch (ex) {
    next(ex)
  }

});

router.delete("/:id", async (req, res, next) => {
  try {
    const table = await TableModel.findByIdAndDelete(req.params.id);

    if (!table)
      return res.status(404).send("The table with the given ID was not found.");

    res.status(204).send();
  }
  catch (ex) {
    next(ex)
  }
});

module.exports = router;
