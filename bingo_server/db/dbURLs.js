const dbUrls = {
    bingoUrl: process.env.REPLICA_URL ? `${process.env.REPLICA_URL}/bingo?replicaSet=${process.env.REPLICA_NAME}` : "mongodb://127.0.0.1:30000,127.0.0.1:30001,127.0.0.1:30002/bingo?replicaSet=rs0",
}

console.log(dbUrls)

module.exports = dbUrls

