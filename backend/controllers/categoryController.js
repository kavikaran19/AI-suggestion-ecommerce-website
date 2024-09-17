const upload = require('../config/multer');
const Category = require('../models/Category');

// Create a new category
exports.createCategory = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        


        const { name, description } = req.body;
        const photo = req.file ? req.file.path : '';

        try {
            const category = new Category({ name, description, photo });
            await category.save();
            res.status(201).send(category);
        } catch (err) {
            res.status(400).send(err);
        }
    });
};
// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.send(categories);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Get a category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).send();
        res.send(category);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Update a category
exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!category) return res.status(404).send();
        res.send(category);
    } catch (err) {
        res.status(400).send(err);
    }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).send();
        res.send(category);
    } catch (err) {
        res.status(500).send(err);
    }
};
