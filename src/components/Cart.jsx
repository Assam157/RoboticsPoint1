import React from 'react';
import { useItemContext } from '../context/ItemContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cart } = useItemContext();  
    const navigate = useNavigate();

    const handleProceedToBuy = () => {
        if (cart.length > 0) {
            navigate('/Buypage', { state: { productsToBuy: cart } });
        } else {
            console.log("Your cart is empty");
        }
    };

    return (
        <div className="cart">
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <ul>
                    {cart.map(item => (
                        <li key={item._id}>
                            {item.name} - Quantity: {item.quantity}
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={handleProceedToBuy} disabled={cart.length === 0}>
                Proceed to Buy
            </button>
        </div>
    );
};

export default Cart;
