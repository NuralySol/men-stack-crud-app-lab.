const mongoose = require('mongoose')

const Cars = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: String,
})

const Cars = mongoose.model('Cars', Cars)
module.exports = Cars
