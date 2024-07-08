import React, { useContext, useEffect } from "react";
import './PlaceOrder.css';
import { StoreContext } from "../../Context/StoreContext";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
    const { getTotalCartAmount, token, product_list, cartItem, url } = useContext(StoreContext);

    const [data, setData] = useState({
        name: "",
        email: "",
        country: "",
        city: "",
        phone: ""
    });

    const onchangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const placeOrder = async (event) => {
        event.preventDefault();
        let orderItems = [];
        product_list.map((item) => {
            if (cartItem[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItem[item._id];
                orderItems.push(itemInfo);
            }
        });
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 500,
        };
        let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
        if (response.data.success) {
            const { session_url } = response.data;
            window.location.replace(session_url);
        } else {
            alert("error");
        }
    }

    const navigate = useNavigate();
    useEffect(() =>{
        if(!token){
            navigate('/cart')
        }
        else if(getTotalCartAmount()===0){
            navigate('/cart')
        }
    },[token])

    return (
        <form onSubmit={placeOrder} className="place-order">
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" onChange={onchangeHandler} value={data.name} id="" required placeholder="Your Name..." />
                </div>
                <div className="multi-fields">
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" onChange={onchangeHandler} value={data.email} id="" required placeholder="Your Email..." />
                </div>
                <div className="multi-fields">
                    <label htmlFor="country">Country: </label>
                    <input type="text" name="country" onChange={onchangeHandler} value={data.country} id="" required placeholder="Your Country..." />
                </div>
                <div className="multi-fields">
                    <label htmlFor="city">City: </label>
                    <input type="text" name="city" id="" onChange={onchangeHandler} value={data.city} required placeholder="Your City..." />
                </div>
                <div className="multi-fields">
                    <label htmlFor="tel">Telephone: </label>
                    <input type="text" name="phone" onChange={onchangeHandler} value={data.phone} id="" required placeholder="237 650060113" />
                </div>
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>SubTotal</p>
                            <p>{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>{getTotalCartAmount() === 0 ? 0 : 500}Fcfa</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 500}Fcfa</b>
                        </div>
                    </div>
                    <button type="submit">Proceed to Payment</button>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;
