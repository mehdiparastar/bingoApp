const mongoose = require('mongoose');
const getConn = require('../db/getConn');

const dbName = 'bingo'

const conn = getConn(dbName)

const TablesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
    unique: true
  }
}, { timestamps: true })

TablesSchema.index({ name: 1 }, { unique: true })

const TablesModel = conn.model('tables', TablesSchema);

module.exports = TablesModel; 