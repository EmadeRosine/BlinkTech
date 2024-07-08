import React from 'react';
import './Recommend.css'

const RecommendedProducts = ({ recommendedProducts }) => {
    if (!recommendedProducts || Object.keys(recommendedProducts).length === 0) {
        return <p>No recommended products available.</p>;
    }

    const renderProducts = (products, title) => (
        products && products.length > 0 && (
            <div className='recommend-product'>
                <h4>{title}</h4>
                <ul className="recommended-products-list">
                    {products.map(product => product && product.name && product.image ? (
                        <li key={product._id} className="recommended-product-item">
                            <img src={product.image} alt={product.name} className="recommended-product-image" />
                            <p>{product.name}</p>
                            <p>{product.price}</p>
                        </li>
                    ) : null)}
                </ul>
            </div>
        )
    );

    return (
        <div className='recommend'>
            <h2>Recommended Products just for You</h2>
            {renderProducts(recommendedProducts.hybrid)}
        </div>
    );
};

export default RecommendedProducts;
