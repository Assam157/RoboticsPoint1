import React from 'react';
import { useItemContext } from '../context/ItemContext';

const ProductItem = ({ product }) => {
    const { addToCart, removeFromCart } = useItemContext();

    var handleAddToCart = (product) => {
        console.log(product)
        console.log("Adding Product");
        addToCart(product);
    };

    var  handleRemoveFromCart = (product) => {
        console.log("Product removed", product);
        removeFromCart(product);
    };

    return (
        <div className="product-card">
            <img className="product-image" src={product.image} alt={product.name} />
            <div className="product-details">
                <h3 style={{ fontWeight: "700" }}>{product.name}</h3>
                <p style={{ fontWeight: "300" }}>{product.description}</p>
                <p style={{ fontWeight: "500" }}>Price: {product.price} Rs</p>
                <p style={{fontWeight:"450"}}>Description:{product.description}</p>
                <p style={{fontWeight:"320"}}>Available Amount:{product.availableQuant}</p>
                <button onClick={handleAddToCart.bind(null, product)}>Add to Cart</button>
                <button onClick={handleRemoveFromCart.bind(null, product)}>Remove from Cart</button>
            </div>
        </div>
    );
};

export default ProductItem;