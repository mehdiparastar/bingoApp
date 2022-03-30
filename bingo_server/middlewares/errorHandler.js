module.exports = (error, req, res, next) => {
    try {
        console.log(error)
        const status = error.statusCode || error.code === 11000 ? 409 : 500
        const message = (error.code === 11000 && `player ${(error.keyValue && Object.values(error.keyValue)).toString()} is duplicated.`) || error.message || 'server Error'
        const errors = error.errors || (error.keyValue && Object.values(error.keyValue).map(item => JSON.stringify(item))) || []
        const data = error.data
        return res.status(status).json({ message, data, errors, status })
    }
    catch (ex) {
        return res.status(500).json({ message: 'unknown Err', data: null, errors: null, status: 500 })
    }
}