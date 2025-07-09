import React from 'react';
import '../../style/legalPages.css';

const TermsAndConditionsPage = () => {
    return (
        <div className="legal-page-container">
            <h1>Terms and Conditions</h1>
            <p className="last-updated">Last Updated: May 18, 2025</p>
            
            <section className="legal-section">
                <h2>1. Introduction</h2>
                <p>
                    Welcome to EventSync. These Terms and Conditions govern your use of our website and the services 
                    offered by EventSync. By accessing or using our platform, you agree to be bound by these Terms. 
                    If you disagree with any part of these terms, you may not access our service.
                </p>
            </section>
            
            <section className="legal-section">
                <h2>2. Definitions</h2>
                <p>
                    <strong>"EventSync"</strong> refers to our company, known as EventSync Inc.<br/>
                    <strong>"Platform"</strong> refers to our website and services accessible at eventsync.com.<br/>
                    <strong>"User"</strong> refers to individuals who register and use our services.<br/>
                    <strong>"Event Creator"</strong> refers to users who create and list events on our platform.<br/>
                    <strong>"Attendee"</strong> refers to users who purchase tickets to events.
                </p>
            </section>
            
            <section className="legal-section">
                <h2>3. User Accounts</h2>
                <p>
                    When you create an account with us, you must provide information that is accurate, complete, and current at all times. 
                    Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
                </p>
                <p>
                    You are responsible for safeguarding the password for your account and for any activities or actions under your password. 
                    You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
                </p>
            </section>

            <section className="legal-section">
                <h2>4. Event Bookings and Purchases</h2>
                <p>
                    All event bookings and ticket purchases are final. Refunds are subject to the refund policy of the specific event as set by the Event Creator.
                </p>
                <p>
                    EventSync acts as a platform connecting Event Creators with Attendees and is not responsible for the events themselves, including cancellations or rescheduling.
                </p>
                <p>
                    When making a purchase through our platform, you warrant that you have legal capacity to enter into the transaction and that the information you provide is accurate.
                </p>
            </section>

            <section className="legal-section">
                <h2>5. Intellectual Property</h2>
                <p>
                    The content on our platform, including but not limited to text, graphics, logos, images, and software, is the property of EventSync and is protected by copyright and other intellectual property laws.
                </p>
                <p>
                    Users may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store or transmit any of the material on our platform, except as incidental to normal web browsing.
                </p>
            </section>

            <section className="legal-section">
                <h2>6. Limitation of Liability</h2>
                <p>
                    EventSync shall not be liable for indirect, incidental, special, consequential or punitive damages, including lost profits, arising out of or in connection with your use of our platform.
                </p>
                <p>
                    EventSync's total liability for all claims related to the service shall not exceed the greater of $100 or the amount paid by you to EventSync in the past 12 months.
                </p>
            </section>

            <section className="legal-section">
                <h2>7. Changes to Terms</h2>
                <p>
                    We reserve the right to modify these terms at any time. We will provide notice of significant changes by posting the new Terms on this website and updating the "Last Updated" date.
                </p>
                <p>
                    Your continued use of the platform after such modifications constitutes your acceptance of the revised Terms.
                </p>
            </section>

            <section className="legal-section">
                <h2>8. Governing Law</h2>
                <p>
                    These Terms shall be governed by the laws of the State of New York, without regard to its conflict of law provisions.
                </p>
                <p>
                    Any disputes arising under or related to these Terms shall be resolved exclusively in the courts of New York County, New York.
                </p>
            </section>

            <section className="legal-section">
                <h2>9. Contact Information</h2>
                <p>
                    If you have any questions about these Terms, please contact us at:<br/>
                    Email: legal@eventsync.com<br/>
                    Phone: +1 (555) 123-4567<br/>
                    Address: 123 Event Street, Suite 100, New York, NY 10001
                </p>
            </section>
        </div>
    );
};

export default TermsAndConditionsPage;
