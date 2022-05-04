require('dotenv').config()
const mongoose = require('mongoose')

const password = process.env.PASSWORD;
const url = process.env.MONGODB_URI.toString().replace('<password>', password);


console.log('connecting to database...')

mongoose.connect(url)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

module.exports = mongoose;