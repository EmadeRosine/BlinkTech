import express from 'express'
import { loginUser, registerUser, verifyToken} from '../controllers/userController.js'
import userModel from '../models/userModel.js';

const userRouter = express.Router()

// Route to fetch current user's details
userRouter.get('/current', verifyToken, async (req, res) => {
    try {
        const user = await userModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, userId: user._id, email: user.email }); // Adjust as per your user schema
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

userRouter.post("/register", registerUser)
userRouter.post("/login",loginUser)



export default userRouter;