import ProductModel from "../models/ProductModel.js";
import fs from 'fs';

// Add product item
const addProduct = async (req, res) => {
    const product = new ProductModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: req.file.path, // Cloudinary URL
        quantity: req.body.quantity  // Added quantity
    })

    try {
        await product.save();
        res.json({ success: true, message: "Product Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to Add Product" })
    }
}

// All product list
const listproduct = async (req, res) => {
    try {
        const products = await ProductModel.find({});
        res.json({ success: true, data: products })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to Load Products" });
    }
}

// Remove product
const removeproduct = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.body.id);
        fs.unlink(`uploads/${product.image}`, () => { })

        await ProductModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product Removed" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to Remove Product" })
    }
};

export { addProduct, listproduct, removeproduct };
