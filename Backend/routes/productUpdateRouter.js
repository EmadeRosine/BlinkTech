import express from 'express';
import ProductModel from "../models/ProductModel.js";

const router = express.Router();

router.put('/update', async (req, res) => {
    const { _id, quantity } = req.body;

    try {
        const product = await ProductModel.findById(_id);
        if (product) {
            product.quantity = quantity;
            await product.save();
            res.json({ success: true, message: "Product quantity updated" });
        } else {
            res.json({ success: false, message: "Product not found" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to update product quantity" });
    }
});

export default router;
