import React, { useContext } from "react";
import './ProductDisplay.css';
import { StoreContext } from "../../Context/StoreContext";
import ProductItem from "../ProductItem/ProductItem";

const ProductDisplay = ({ category }) => {
    const { product_list } = useContext(StoreContext);

    return (
        <div className="product-display" id="product-display">
            <h2>Trending Gadgets for you</h2>
            <div className="product-display-list">
                {product_list.filter(item => item.quantity > 0).map((item, index) => {
                    if (category === "All" || category === item.category) {
                        return (
                            <ProductItem
                                key={index}
                                id={item._id}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                image={item.image}
                                quantity={item.quantity}  // Pass the quantity prop
                            />
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default ProductDisplay;
