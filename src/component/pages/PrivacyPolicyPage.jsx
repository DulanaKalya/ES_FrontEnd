import React from 'react';
import '../../style/legalPages.css';

const PrivacyPolicyPage = () => {
    return (
        <div className="legal-page-container">
            <h1>Privacy Policy</h1>
            <p className="last-updated">Last Updated: May 18, 2025</p>
            
            <section className="legal-section">
                <h2>1. Introduction</h2>
                <p>
                    At EventSync, we respect your privacy and are committed to protecting your personal data. This Privacy Policy 
                    explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                </p>
                <p>
                    Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access our platform.
                </p>
            </section>
            
            <section className="legal-section">
                <h2>2. Information We Collect</h2>
                <p>
                    <strong>Personal Data:</strong> We may collect personally identifiable information, such as your name, email address, 
                    phone number, and payment information when you register for an account, purchase tickets, or communicate with us.
                </p>
                <p>
                    <strong>Usage Data:</strong> We automatically collect information about how you interact with our platform, including 
                    your browsing actions, search queries, and the features you use.
                </p>
                <p>
                    <strong>Cookies and Tracking Data:</strong> We use cookies and similar tracking technologies to track activity on our 
                    platform and hold certain information to enhance your experience.
                </p>
            </section>
            
            <section className="legal-section">
                <h2>3. How We Use Your Information</h2>
                <p>We may use the information we collect for various purposes, including to:</p>
                <ul>
                    <li>Provide, operate, and maintain our platform</li>
                    <li>Process and complete transactions</li>
                    <li>Send administrative information, such as updates, security alerts, and support messages</li>
                    <li>Respond to your comments, questions, and requests</li>
                    <li>Personalize your experience and deliver content relevant to your interests</li>
                    <li>Monitor usage patterns and analyze trends to improve our platform</li>
                    <li>Protect against fraudulent, unauthorized, or illegal activity</li>
                    <li>Comply with legal obligations</li>
                </ul>
            </section>

            <section className="legal-section">
                <h2>4. Disclosure of Your Information</h2>
                <p>We may share your personal information in the following situations:</p>
                <p>
                    <strong>With Event Creators:</strong> When you register for an event, we share necessary information with the Event Creator.
                </p>
                <p>
                    <strong>With Service Providers:</strong> We may share your information with third-party vendors who provide services on our behalf.
                </p>
                <p>
                    <strong>For Legal Purposes:</strong> We may disclose your information where required by law or to protect our rights or the rights of others.
                </p>
                <p>
                    <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, your information may be transferred as a business asset.
                </p>
            </section>

            <section className="legal-section">
                <h2>5. Your Data Protection Rights</h2>
                <p>Depending on your location, you may have the following rights regarding your personal data:</p>
                <ul>
                    <li>The right to access the personal data we hold about you</li>
                    <li>The right to request correction of your personal data</li>
                    <li>The right to request deletion of your personal data</li>
                    <li>The right to restrict processing of your personal data</li>
                    <li>The right to data portability</li>
                    <li>The right to object to processing of your personal data</li>
                </ul>
                <p>
                    To exercise any of these rights, please contact us at privacy@eventsync.com.
                </p>
            </section>

            <section className="legal-section">
                <h2>6. Security of Your Information</h2>
                <p>
                    We implement appropriate technical and organizational measures to protect your personal data from unauthorized access, 
                    disclosure, alteration, or destruction. However, no method of transmission over the Internet or electronic storage is 
                    100% secure, so we cannot guarantee absolute security.
                </p>
            </section>

            <section className="legal-section">
                <h2>7. Children's Privacy</h2>
                <p>
                    Our platform is not intended for individuals under the age of 16. We do not knowingly collect personal data from children. 
                    If you are a parent or guardian and believe your child has provided us with personal data, please contact us.
                </p>
            </section>

            <section className="legal-section">
                <h2>8. Changes to This Privacy Policy</h2>
                <p>
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on 
                    this page and updating the "Last Updated" date.
                </p>
                <p>
                    You are advised to review this Privacy Policy periodically for any changes.
                </p>
            </section>

            <section className="legal-section">
                <h2>9. Contact Information</h2>
                <p>
                    If you have any questions about this Privacy Policy, please contact us at:<br/>
                    Email: privacy@eventsync.com<br/>
                    Phone: +1 (555) 123-4567<br/>
                    Address: 123 Event Street, Suite 100, New York, NY 10001
                </p>
            </section>
        </div>
    );
};

export default PrivacyPolicyPage;
