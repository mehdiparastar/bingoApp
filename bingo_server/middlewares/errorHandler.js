module.exports = (error, req, res, next) => {
    console.log(error)
    const status = error.statusCode || error.code === 11000 ? 409 : 500
    const message = (error.code === 11000 && `فیلد ${(error.keyValue && Object.values(error.keyValue)).toString()} قبلا در پایگاه داده ثبت شده است.`) || error.message || 'خطای سرور'
    const errors = error.errors || (error.keyValue && Object.values(error.keyValue).map(item => JSON.stringify(item))) || []
    const data = error.data
    return res.status(status).json({ message, data, errors, status })
}