import express from 'express';
import { addProduct, listproduct, removeproduct } from '../controllers/productController.js';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const productRouter = express.Router();

// Cloudinary Configuration
cloudinary.config({ 
    cloud_name: 'drjqn5gdc', 
    api_key: '431796411259661', 
    api_secret: 'QbqLa_oG4vdpVUpd9V17Vd_XqyI' 
});

// Image Storage Engine for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads', // folder name in Cloudinary
        format: async (req, file) => 'jpg', // supports promises as well
        public_id: (req, file) => `${Date.now()}${file.originalname}`
    },
});

const upload = multer({ storage: storage })

productRouter.post("/add", upload.single("image"), addProduct);
productRouter.get('/list',listproduct)
productRouter.post('/remove',removeproduct);


export default productRouter;
