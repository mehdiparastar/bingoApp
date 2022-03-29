const mongoose = require('mongoose');
const getConn = require('../db/getConn');

const dbName = 'bingo'

const conn = getConn(dbName)

const Movie =
  conn.model('Movie', new mongoose.Schema({
    title: {
      type: String,
      required: true
    }
  }));

module.exports = Movie; 