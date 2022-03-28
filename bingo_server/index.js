const db = require("./db/db")

const port = process.env.basePORT || 3001

db.initDbConnection()
    .then(out => {
        console.log("Connected to MongoDB")

        const app = require("./app");
        app.listen(port, () => {
            console.log(`Server started on port ${port}...`)
        })
        app.on("error", err => {
            console.log('app Err', err)
        })
    })
    .catch(ex => {
        console.log('mongoDB connection Err', ex)
    })




