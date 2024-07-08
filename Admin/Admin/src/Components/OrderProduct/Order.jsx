import React, { useEffect, useState } from "react";
import './Order.css'
import axios from 'axios'
import {toast} from "react-toastify"
import {assets} from "../../assets/assets"

const Order = ({url}) =>{

    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () =>{
        const response = await axios.get(url+"/api/order/list");
        if(response.data.success){
            setOrders(response.data.data);
            console.log(response.data.data);
        }
        else{
            toast.error("Error")
        }
    }

    const statusHandler = async (event,orderId) =>{
        const response = await axios.post(url+"/api/order/status",{
        orderId,
        status:event.target.value
    })
    if(response.data.success){
        await fetchAllOrders();
    }
}

    useEffect(() =>{
        fetchAllOrders();
    },[])
    return(
        <div className="order add">
            <h3>Order Page</h3>
            <div className="order-list">
                {orders.map((order,index) =>(
                    <div key={index} className="order-item">
                        <img src={assets.bag} alt="" />
                        <div>
                            <p className="order-item-product">
                                {order.items.map((item,index) =>{
                                    if(index===order.items.length-1){
                                        return item.name + "  X  " + item.quantity
                                    }else{
                                        return item.name + "  X  " + item.quantity + ", "
                                    }
                                })}
                            </p>
                            <p className="order-item-name">
                                {order.address.name }
                            </p>
                            <p className="order-item-adress">
                                {order.address.city + ", " +order.address.country}
                            </p>
                            <p className="order-item-phone">
                                {order.address.phone}
                            </p>
                        </div>
                        <p>Items: {order.items.length}</p>
                        <p>{order.amount}Fcfa</p>
                        <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                            <option value="Item Processing">Item Processing</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Order