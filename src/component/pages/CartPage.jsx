import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import { useCart } from "../context/CartContext";
import '../../style/cart.css'

const CartPage = () => {
    const { cart, dispatch } = useCart();
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();


    const incrementItem = (event) => {
        dispatch({ type: 'INCREMENT_ITEM', payload: event });
    }

    const decrementItem = (event) => {

        const cartItem = cart.find(item => item.id === event.id);
        if (cartItem && cartItem.quantity > 1) {
            dispatch({ type: 'DECREMENT_ITEM', payload: event });
        } else {
            dispatch({ type: 'REMOVE_ITEM', payload: event });
        }
    }

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);



    const handleCheckout = async () => {
        if (!ApiService.isAuthenticated()) {
            setMessage("You need to login first before you can place an order");
            setTimeout(() => {
                setMessage('')
                navigate("/login")
            }, 3000);
            return;
        }

        const purchaseEvents = cart.map(item => ({
            eventId: item.id,
            quantity: item.quantity
        }));

        const purchaseRequest = {
            totalPrice,
            items: purchaseEvents,
        }

        try {
            const response = await ApiService.createPurchase(purchaseRequest);
            setMessage(response.message)

            setTimeout(() => {
                setMessage('')
            }, 5000);

            if (response.status === 200) {
                dispatch({ type: 'CLEAR_CART' })
            }

        } catch (error) {
            setMessage(error.response?.data?.message || error.message || 'Failed to place an order');
            setTimeout(() => {
                setMessage('')
            }, 3000);

        }

    };
    return (
        <div className="cart-page">
            <h1>Your Shopping Cart</h1>
            {message && <p className="response-message">{message}</p>}

            {cart.length === 0 ? (
                <div className="cart-empty">
                    <p>Your cart is currently empty</p>
                    <p>Browse our events to find something you'll enjoy!</p>
                </div>
            ) : (
                <div>
                    <ul>
                        {cart.map(item => (
                            <li key={item.id}>
                                <img src={item.imageUrl} alt={item.name} />
                                <div className="cart-item-content">
                                    <h2>{item.name}</h2>
                                    <p>{item.description}</p>
                                    <div className="cart-item-price">Rs. {item.price.toFixed(2)}</div>
                                </div>
                                <div className="quantity-controls">
                                    <button onClick={() => decrementItem(item)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => incrementItem(item)}>+</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    
                    <div className="cart-summary">
                        <div className="cart-total">
                            Total: <span>Rs. {totalPrice.toFixed(2)}</span>
                        </div>
                        <button className="checkout-button" onClick={handleCheckout}>Proceed to Checkout</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CartPage;
