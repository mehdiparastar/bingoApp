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

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());
app.use(morgan('short'));

app.use("/api/", homeRoutes);
app.use("/api/tables", tablesRoutes);
app.use("/api/players", playersRoutes);

app.use(errorHandler);

const io = socketio(server, { cors: { origin: "*" } })

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on("joinTable", async ({ playerId, table }) => {
        const players = await PlayerModel.find({ table: table }).lean()
        io.to([...(new Set(players.map(item => item.playerId)))]).emit('newJoining', { msg: 'new User added', total: players.length || 0 })
        console.log(socket.id, "joined");
    });

    socket.on('disconnect', async () => {
        const deletePlayer = await PlayerModel.findOneAndDelete({ playerId: socket.id })
        console.log('user disconnected', socket.id);
    });
});

module.exports = server;
