import axios from 'axios';
import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import ProductModel from '../models/ProductModel.js'; // Import ProductModel
import paypal from '@paypal/checkout-server-sdk';

const environment = new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET);
const client = new paypal.core.PayPalHttpClient(environment);

const placeOrder = async (req, res) => {
    const frontend_url = "http://192.168.43.81:5173";

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Update product quantities
        for (const item of req.body.items) {
            const product = await ProductModel.findById(item._id);
            product.quantity -= item.quantity;
            if (product.quantity < 0) {
                product.quantity = 0; // Ensure quantity doesn't go negative
            }
            await product.save();
        }

        const totalAmount = req.body.amount;
        
        const request = new paypal.orders.OrdersCreateRequest();
        request.prefer("return=representation");
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD', // Use your preferred currency
                    value: totalAmount.toFixed(2), // Ensure it is a string with 2 decimal places
                },
                description: `Order #${newOrder._id}`,
            }],
            application_context: {
                return_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
                cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
            }
        });

        const order = await client.execute(request);
        res.json({ success: true, id: order.result.id, session_url: order.result.links.find(link => link.rel === 'approve').href });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error" });
    }
};

const verifyOrder = async(req, res) =>{
    const {orderId, success} = req.body;
    try{
        if(success =="true"){
            await orderModel.findByIdAndUpdate(orderId, {payment: true});
            res.json({success: true, message: "Paid"});
        } else {
            await orderModel.findByIdAndUpdate(orderId);
            res.json({success: false, message: "Not Paid"});
        }
    } catch(error){
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

// User orders
const userOrders = async (req, res) => {
    try{
        const orders = await orderModel.find({userId: req.body.userId});
        res.json({success: true, data: orders});
    } catch(error){
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

// Listing orders to admin
const listOrders = async(req, res) => {
    try{
        const orders = await orderModel.find({});
        res.json({success: true, data: orders});
    } catch(error){
        console.log(error);
        res.json({success: false, message: 'Error'});
    }
}

// Updating order status
const updateStatus = async (req, res) => {
    try{
        await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status});
        res.json({success: true, message: "Status Updated"});
    } catch(error){
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
