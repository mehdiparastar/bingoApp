const mongoose = require('mongoose');
const getConn = require('../db/getConn');

const dbName = 'bingo'

const conn = getConn(dbName)

const PlayersSchema = new mongoose.Schema({
  playerId: {
    type: String,
    required: true,
    index: true,
    required: [true, 'الزامی'],
  },
  table: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tables',
    db: 'bingo',
    required: [true, 'الزامی'],
    index: true
  }
}, { timestamps: true })

PlayersSchema.index({ playerId: 1, table: 1 }, { unique: true })

const PlayersModel = conn.model('players', PlayersSchema);

module.exports = PlayersModel; 