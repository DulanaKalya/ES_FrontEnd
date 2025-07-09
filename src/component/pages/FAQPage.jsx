import React, { useState } from 'react';
import '../../style/legalPages.css';

const FAQPage = () => {
    // State to track which FAQ items are expanded
    const [expandedItems, setExpandedItems] = useState({});

    // Toggle FAQ item expansion
    const toggleItem = (id) => {
        setExpandedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    // FAQ data
    const faqItems = [
        {
            id: 1,
            question: "How do I create an account on EventSync?",
            answer: "To create an account on EventSync, click on the 'Login' button in the top navigation bar, then select 'Register' on the login page. Fill in your details including name, email address, and password. Once submitted, you'll receive a verification email. Click the link in the email to verify your account, and you're all set to start exploring events!"
        },
        {
            id: 2,
            question: "How do I purchase tickets for an event?",
            answer: "To purchase tickets, first browse or search for an event you're interested in. Click on the event to view its details page. Select the number of tickets you want by clicking the 'Add to Cart' button and adjusting the quantity. Then proceed to your cart by clicking the 'Cart' link in the navigation bar. Review your selections and click 'Checkout' to enter your payment information and complete your purchase."
        },
        {
            id: 3,
            question: "Can I get a refund if I can no longer attend an event?",
            answer: "Refund policies are set by individual event organizers. To check the refund policy for a specific event, go to the event's details page and look for refund information. If you need to request a refund, contact the event organizer directly through the contact information provided on the event page, or reach out to our customer support team who can help facilitate communication with the organizer."
        },
        {
            id: 4,
            question: "How do I list my own event on EventSync?",
            answer: "To list an event, you'll need an Event Creator account. If you don't have one yet, register for a regular account and then upgrade to an Event Creator account from your profile settings. Once upgraded, click on 'Create Event' in your dashboard. Fill out the event details including title, description, date, time, location, pricing, and upload event images. Review all information and submit for approval. Our team will review your submission and notify you once your event is live."
        },
        {
            id: 5,
            question: "How do I update my account information?",
            answer: "To update your account information, log into your account and click on 'My Account' in the navigation bar. From your profile page, you can edit your personal information, change your password, update your payment methods, and manage your notification preferences. Make the desired changes and click 'Save' to update your information."
        },
        {
            id: 6,
            question: "What payment methods does EventSync accept?",
            answer: "EventSync accepts major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and in select regions, Apple Pay and Google Pay. When checking out, you'll see all available payment options for your location. We ensure all payment processing is secure and compliant with PCI DSS standards."
        },
        {
            id: 7,
            question: "How do I contact customer support?",
            answer: "You can contact our customer support team through multiple channels: Email us at support@eventsync.com, call our support line at +1 (555) 123-4567 (available Monday to Friday, 9 AM to 6 PM EST), use the in-app chat support feature, or submit a support ticket through the 'Help' section in your account. We typically respond to all inquiries within 24 hours."
        },
        {
            id: 8,
            question: "Is my personal and payment information secure?",
            answer: "Yes, we take security very seriously. All personal data is encrypted and stored securely following industry best practices. Payment information is processed through PCI-compliant payment processors and is never stored on our servers. We use SSL encryption for all data transmission, and our platform undergoes regular security audits to ensure your information remains protected."
        },
        {
            id: 9,
            question: "Can I transfer my tickets to someone else?",
            answer: "Yes, in most cases tickets are transferable. To transfer a ticket, log into your account and navigate to 'My Tickets' in your profile. Select the ticket you wish to transfer and click the 'Transfer' button. Enter the recipient's email address and follow the prompts to complete the transfer. The recipient will receive an email with instructions on how to claim the ticket. Please note that some events may have restrictions on ticket transfers, which will be noted in the event details."
        },
        {
            id: 10,
            question: "What should I do if I lose my ticket or confirmation email?",
            answer: "Don't worry! All your tickets are stored in your EventSync account. Simply log in to your account, go to 'My Tickets' in your profile, and you'll find all your purchased tickets there. You can download or print them again at any time. If you can't access your account, contact our customer support with your name, email, and event details, and we'll help you recover your ticket information."
        }
    ];

    return (
        <div className="legal-page-container">
            <h1>Frequently Asked Questions</h1>
            
            <div className="faq-container">
                {faqItems.map(item => (
                    <div key={item.id} className="faq-item">
                        <div 
                            className={`faq-question ${expandedItems[item.id] ? 'active' : ''}`}
                            onClick={() => toggleItem(item.id)}
                        >
                            <h3>{item.question}</h3>
                            <span className="faq-toggle">{expandedItems[item.id] ? '−' : '+'}</span>
                        </div>
                        
                        {expandedItems[item.id] && (
                            <div className="faq-answer">
                                <p>{item.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            
            <section className="faq-contact-section">
                <h2>Didn't Find Your Answer?</h2>
                <p>Our customer support team is here to help. Contact us at:</p>
                <ul className="contact-details">
                    <li><strong>Email:</strong> support@eventsync.com</li>
                    <li><strong>Phone:</strong> +1 (555) 123-4567</li>
                    <li><strong>Hours:</strong> Monday-Friday, 9 AM - 6 PM EST</li>
                </ul>
            </section>
        </div>
    );
};

export default FAQPage;
