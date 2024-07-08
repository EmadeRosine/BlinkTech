import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import productRouter from './routes/productRouter.js'
import { v2 as cloudinary } from 'cloudinary';
import userRouter from './routes/userRouter.js';
import 'dotenv/config'
import cartRouter from './routes/cartRouter.js';
import orderRouter from './routes/orderRouter.js';
import recommendRouter from './routes/recommendRouter.js';



//api configuration
const app = express()
const port = 4000



// Configuration
cloudinary.config({ 
    cloud_name: process.env.cloudName, 
    api_key: process.env.apiKey, 
    api_secret: process.env.apiSecret 
});

//middlewear
app.use(express.json())
app.use(cors())


//db connection
connectDB();


//endpoints
app.use("/api/product",productRouter)
// app.use("/api/product", productUpdateRouter); 
app.use("/image",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.use("/api/recommendation",recommendRouter)



app.get("/", (req,res) =>{
    res.send("API is Working")
})


app.listen(port,() =>{
    console.log(`Server started on http://localhost:${port}`)
})