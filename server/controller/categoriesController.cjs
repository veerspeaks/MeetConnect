
const Category = require('../models/categoriesModel.cjs');


exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        
        res.json(categories);
    } catch (error) {
        console.error("Failed to fetch categories", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}