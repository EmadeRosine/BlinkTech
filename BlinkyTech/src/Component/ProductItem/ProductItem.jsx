import React, { useContext } from "react";
import './ProductItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from "../../Context/StoreContext";

const ProductItem = ({ id, name, price, description, image, quantity }) => {
    const { cartItem, addToCart, removeFromCart } = useContext(StoreContext);

    return (
        <div className="product-item">
            <div className="product-item-img-container">
                <img src={image} alt="" className="product-item-image" />
                {!cartItem[id] ?
                    <img src={assets.plusblack} className="add" onClick={() => addToCart(id)} />
                    :
                    <div className="product-item-counter">
                        <img src={assets.minus} onClick={() => removeFromCart(id)} />
                        <p>{cartItem[id]}</p>
                        <img src={assets.plus} onClick={() => addToCart(id)} />
                    </div>
                }
            </div>
            <div className="product-item-info">
                <div className="product-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_stars} alt="" />
                </div>
                <p className="product-item-desc">{description}</p>
                <p className="product-item-price">{price} Fcfa</p>
                {quantity > 0 && <p className="product-item-quantity">Available: {quantity}</p>}
            </div>
        </div>
    );
};

export default ProductItem;
