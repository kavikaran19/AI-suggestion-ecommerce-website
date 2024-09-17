const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: '' // Optional: Provides a default value if no description is provided
    },
    price: {
        type: Number,
        required: true,
        min: 0 // Ensures the price is a non-negative number
    },
    photo: {
        type: String,
        default: '' // Optional: Provides a default value if no photo is provided
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);
