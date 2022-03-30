const express = require("express");
const http = require('http');
const socketio = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const helmet = require('helmet');
const errorHandler = require("./middlewares/errorHandler");
const homeRoutes = require("./routes/index");
const tablesRoutes = require("./routes/tables");
const playersRoutes = require("./routes/players");
const PlayerModel = require("./models/players");
const { getNewTableDetail } = require('./utils')

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());
app.use(morgan('short'));

app.use("/api/", homeRoutes);
app.use("/api/tables", tablesRoutes);
app.use("/api/players", playersRoutes);

app.use(errorHandler); // it should placed after all middlewares...

const io = socketio(server, { cors: { origin: "*" } })

let intervalId = {}
let tableCards = {}

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on("joinTable", async ({ playerId, table }) => {
        const players = await PlayerModel.find({ table: table }).lean()
        io.to([...(new Set(players.map(item => item.playerId)))])
            .emit('newJoining', { msg: 'new User added', total: players.length || 0 })
        if (!!!tableCards[table]) {
            const temp = getNewTableDetail()
            tableCards[table] = [...temp.slice(0, 12), ...temp.slice(14)]
        }
        if (!!!intervalId[table]) {
            intervalId[table] = setInterval(async function interval() {
                const players = await PlayerModel.find({ table: table }).lean()
                io.to([...(new Set(players.map(item => item.playerId)))])
                    .emit('newKey', {
                        key: tableCards[table][Math.floor(Math.random() * tableCards[table].length)],
                        total: players.length || 0
                    })
            }, 5000)
        }
        console.log(socket.id, "joined");
    });

    socket.on('disconnect', async () => {
        const deletePlayer = await PlayerModel.findOneAndDelete({ playerId: socket.id }).lean()
        if (deletePlayer) {
            const players = await PlayerModel.find({ table: deletePlayer.table.toString() }).lean()
            io.to([...(new Set(players.map(item => item.playerId)))]).emit('newJoining', { msg: 'new User added', total: players.length || 0 })
        }
        console.log('user disconnected', socket.id);
    });
});

module.exports = server;
