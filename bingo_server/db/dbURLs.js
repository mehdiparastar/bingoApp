const dbUrls = {
    baseUrl: process.env.REPLICA_URL ? `${process.env.REPLICA_URL}/base?replicaSet=${process.env.REPLICA_NAME}` : "mongodb://127.0.0.1:30000,127.0.0.1:30001,127.0.0.1:30002/base?replicaSet=rs0",
    userUrl: process.env.REPLICA_URL ? `${process.env.REPLICA_URL}/user?replicaSet=${process.env.REPLICA_NAME}` : "mongodb://127.0.0.1:30000,127.0.0.1:30001,127.0.0.1:30002/user?replicaSet=rs0",
}

console.log(dbUrls)

module.exports = dbUrls

