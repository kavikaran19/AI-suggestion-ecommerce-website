const upload = require('../config/multer');
const Product = require('../models/Product');
const Category = require('../models/Category');

// Create a new product
exports.createProduct = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err });
        }

        const { name, description, price, categoryId } = req.body;
        const photo = req.file ? req.file.path : '';

        try {
            // Check if the category exists
            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(400).json({ message: 'Category not found' });
            }

            const product = new Product({ name, description, price, photo, category: categoryId });
            await product.save();
            res.status(201).send(product);
        } catch (err) {
            res.status(400).send(err);
        }
    });
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.send(products);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');
        if (!product) return res.status(404).send();
        res.send(product);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('category');
        if (!product) return res.status(404).send();
        res.send(product);
    } catch (err) {
        res.status(400).send(err);
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).send();
        res.send(product);
    } catch (err) {
        res.status(500).send(err);
    }
};
