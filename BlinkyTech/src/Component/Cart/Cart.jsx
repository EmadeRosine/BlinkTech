import React, { useContext } from "react";
import './Cart.css';
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import assets from "../../assets/assets";

const Cart = () => {
    const { cartItem, product_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
    const navigate = useNavigate();

    return (
        <div className="cart">
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                </div>
                <br /><hr />
                {product_list.map((item) => {
                    if (cartItem[item._id] > 0) {
                        return (
                            <div key={item._id}>
                                <div className="cart-items-title cart-items-item">
                                    <img src={item.image} alt="" className="img"/>
                                    <p>{item.name}</p>
                                    <p>{item.price} Fcfa</p>
                                    <p>{cartItem[item._id]}</p>
                                    <p>{item.price * cartItem[item._id]} Fcfa</p>
                                    <img src={assets.cross} onClick={() => removeFromCart(item._id)} className="cross" />
                                </div>
                                <hr />
                            </div>
                        );
                    }
                })}
            </div>
            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>SubTotal</p>
                            <p>{getTotalCartAmount()} Fcfa</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>{getTotalCartAmount() === 0 ? 0 : 500} Fcfa</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 500} Fcfa</b>
                        </div>
                    </div>
                    <button onClick={() => navigate('/order')}>Proceed to Checkout</button>
                </div>
                <div className="cart-promocode">
                    <div>
                        <p>If you have a promo code, Enter it here</p>
                        <div className="cart-promocode-input">
                            <input type="text" placeholder="promo code" />
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
