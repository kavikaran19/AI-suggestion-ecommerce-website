const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    photo: String // New field to store the photo file path
});

module.exports = mongoose.model('Category', categorySchema);
