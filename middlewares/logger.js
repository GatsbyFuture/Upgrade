const logger = (req, res, next) => {
    console.log('POST REQUEST!');
    next();
}

module.exports = logger;