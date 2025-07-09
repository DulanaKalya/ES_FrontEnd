//import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ApiService from "../../service/ApiService";
import '../../style/eventDetailsPage.css';
import React, { useEffect, useState, useCallback } from "react";


const EventDetailsPage = () => {

    const {id} = useParams();
    const {cart, dispatch} = useCart();
    const [event, setEvent] = useState(null);

    useEffect(() => {
    fetchEvent();
}, [fetchEvent]);


    const fetchEvent = useCallback(async () => {
    try {
        const response = await ApiService.getEventById(id);
        setEvent(response.event);
    } catch (error) {
        console.log(error.message || error);
    }
}, [id]);


    
    const addToCart = () => {
        if (event) {
            dispatch({type: 'ADD_ITEM', payload: event});
        }
    }

    const incrementItem = () => {
        if(event){
            dispatch({type: 'INCREMENT_ITEM', payload: event});
        }
    }

    const decrementItem = () => {
        if (event) {
            const cartItem = cart.find(item => item.id === event.id);
            if (cartItem && cartItem.quantity > 1) {
                dispatch({type: 'DECREMENT_ITEM', payload: event});
            }else{
                dispatch({type: 'REMOVE_ITEM', payload: event});
            }
            
        }
    }

    if (!event) {
        return <p>Loading event details ...</p>
    }    const cartItem = cart.find(item => item.id === event.id);    return(
        <div className="event-details-page">
            <div className="background-panel">
                <div className="background-image"></div>
                <div className="background-decoration-left"></div>
                <div className="background-decoration-right"></div>
            </div>
            <div className="event-detail">
                <div className="event-detail-container">
                    <div className="event-detail-image">
                        <img src={event?.imageUrl} alt={event?.name} />
                    </div>
                    <div className="event-detail-content">
                        <h1>{event?.name}</h1>
                        
                        <div className="event-meta">
                            <div className="meta-item">
                                <span>Category: {event?.category?.name || "General"}</span>
                            </div>
                        </div>
                        
                        <p>{event?.description}</p>
                        <span>Rs. {event.price.toFixed(2)}</span>
                        
                        {cartItem ? (
                            <div className="quantity-controls">
                                <button onClick={decrementItem}>-</button>
                                <span>{cartItem.quantity}</span>
                                <button onClick={incrementItem}>+</button>
                            </div>
                        ):(
                            <button onClick={addToCart}>Add To Cart</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default EventDetailsPage;