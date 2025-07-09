import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import '../../style/eventList.css';



const EventList = ({events}) => {
    const {cart, dispatch} = useCart();
    const [notification, setNotification] = useState(null);    const addToCart = (event) => {
        dispatch({type: 'ADD_ITEM', payload: event});
        
        // Show notification
        setNotification({
            eventId: event.id,
            message: `Added to cart successfully!`
        });
        
        // Clear notification after 2 seconds
        setTimeout(() => {
            setNotification(null);
        }, 2000);
    }

    return(
        <div className="event-list">
                {events.map((event, index) => {
                    // ❌ DELETE these two lines if not used
                    const isInCart = cart.some(item => item.id === event.id);
                    const cartItem = cart.find(item => item.id === event.id);

                    return (
                        <div className="event-item" key={index}>                            <Link to={`/event/${event.id}`}>
                            <img src={event.imageUrl} alt={event.name} className="event-image" />
                            <h3>{event.name}</h3>
                            <p>{event.description}</p>
                            <span>Rs{event.price.toFixed(2)}</span>
                            </Link>
                            <button onClick={()=> addToCart(event)}>Add To Cart</button>
                            {notification && notification.eventId === event.id && (
                                <div className="notification">
                                    {notification.message}
                                </div>
                            )}
                        </div>
                    )
                })}
        </div>
    )
};

export default EventList;