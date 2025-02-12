import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './BuyPage.css';

const BuyPage = () => {
    const location = useLocation();

    // Extract the 'username' query parameter from the URL
    const queryParams = new URLSearchParams(location.search);
    const username = queryParams.get('username');
    console.log(username);

    // Initialize productsToBuy from location state or default to an empty array
    const [productsToBuy, setProductsToBuy] = useState(location.state?.productsToBuy || []);

    // Calculate total price
    const totalPrice = productsToBuy.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);
    console.log('Total Price:', totalPrice);

    // Handle item deletion
    const handleDelete = (productId) => {
        setProductsToBuy((prevProducts) =>
            prevProducts.filter(item => item._id !== productId)
        );
    };

    const handleCheckout = async () => {
        try {
            // Update stock in the backend
            const stockUpdateResponse = await fetch('https://darkorchid-tapir-476375.hostingersite.com/update_stock', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ products: productsToBuy }),
            }).then(res => res.json());

            if (!stockUpdateResponse.success) {
                alert('Failed to update stock');
                return;
            }

            // Send order confirmation email
            const emailPayload = {
                email: 'robopoint944@gmail.com', // Change this to the recipient's email address
                orderDetails: productsToBuy.map(product =>
                    `${product.name} - Type: ${product.type} x ${product.quantity}`
                ).join('\n') + `\n\nTotal Price: Rs${totalPrice}`,
            };

            // Encode the emailPayload as a JSON string and then URL encode it
            const encodedEmailPayload = encodeURIComponent(JSON.stringify(emailPayload));

            // Construct the URL with query parameters for GET request
            const emailUrl = `https://darkorchid-tapir-476375.hostingersite.com/send_email?username=${username}&emailPayload=${encodedEmailPayload}`;

            // Send the GET request
            const emailResponse = await fetch(emailUrl).then(res => res.json());

            if (emailResponse.success) {
                alert('Order confirmation email sent!');
            } else {
                console.error('Error sending email:', emailResponse.message);
                alert('Failed to send order confirmation email');
            }
        } catch (error) {
            console.error('Error during checkout:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="buy-page">
            <h2>Confirm Your Purchase</h2>
            {productsToBuy.length > 0 ? (
                <ul>
                    {productsToBuy.map((item) => (
                        <li key={item._id}>
                            <span>
                                {item.name} - Quantity: {item.quantity} - Price: Rs{item.price}
                            </span>
                            <button
                                onClick={() => handleDelete(item._id)}
                                className="delete-button"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                    <h3>Total Price: Rs{totalPrice}</h3>
                </ul>
            ) : (
                <p>No items to buy</p>
            )}
            <button onClick={handleCheckout}>
                Proceed to Checkout
            </button>
        </div>
    );
};

export default BuyPage;


