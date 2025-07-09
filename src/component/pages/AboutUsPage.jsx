import React from "react";
import { NavLink } from "react-router-dom";
import '../../style/aboutUs.css';

const AboutUsPage = () => {
    return (
        <div className="about-us-container">
            <h1>About EventSync</h1>
            <div className="about-section">
                <h2>Our Mission</h2>
                <p>
                    EventSync is dedicated to connecting people with events they love. Our platform makes it easy to discover, 
                    book, and enjoy events of all kinds - from concerts and conferences to workshops and sports events.
                </p>
            </div>
            
            <div className="about-section">
                <h2>Our Story</h2>
                <p>
                    Founded in 2025, EventSync emerged from a simple idea: event booking should be seamless and enjoyable. 
                    What began as a small startup has grown into a trusted platform serving thousands of event enthusiasts.
                </p>
            </div>

            <div className="about-section">
                <h2>Contact Us</h2>
                <p>
                    Have questions or feedback? Reach out to our team:
                </p>
                <ul className="contact-details">
                    <li><strong>Email:</strong> info@eventsync.com</li>
                    <li><strong>Phone:</strong> +1 (555) 123-4567</li>
                    <li><strong>Address:</strong> 123 Event Street, Suite 100, New York, NY 10001</li>
                </ul>
            </div>

            <div className="about-section">
                <h2>Terms & Policies</h2>
                <div className="policies-links">
                    <NavLink to="/terms-and-conditions">Terms & Conditions</NavLink>
                    <NavLink to="/privacy-policy">Privacy Policy</NavLink>
                    <NavLink to="/faq">FAQs</NavLink>
                </div>
            </div>
        </div>
    );
};

export default AboutUsPage;
