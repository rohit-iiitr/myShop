import React from 'react'
import Layout from "../components/layout/Layout.js"

function Policy() {
  return ( 
    <Layout>
      <div className="container py-5 mt-5">
      <h2 className="mb-4 text-center">Privacy Policy</h2>

      <p>
        At <strong>myShop</strong>, we are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you visit our website.
      </p>

      <h5 className="mt-4">1. Information We Collect</h5>
      <ul>
        <li><strong>Personal Data:</strong> Name, email address, phone number, and shipping address.</li>
        <li><strong>Payment Info:</strong> We use secure payment gateways; we do not store your card details.</li>
        <li><strong>Cookies & Tracking:</strong> We use cookies to enhance your browsing experience.</li>
      </ul>

      <h5 className="mt-4">2. How We Use Your Information</h5>
      <ul>
        <li>To process and fulfill your orders</li>
        <li>To improve our website, services, and customer experience</li>
        <li>To send order updates, offers, and promotional content</li>
      </ul>

      <h5 className="mt-4">3. Sharing Your Information</h5>
      <p>
        We do not sell your personal data. We only share information with trusted third-party vendors (like delivery partners and payment gateways) as required to complete your transactions.
      </p>

      <h5 className="mt-4">4. Data Security</h5>
      <p>
        We implement robust security measures, including encryption and firewalls, to protect your personal data.
      </p>

      <h5 className="mt-4">5. Your Rights</h5>
      <ul>
        <li>You can update or delete your account anytime</li>
        <li>You can opt-out of promotional emails</li>
        <li>You may request a copy of your stored data</li>
      </ul>

      <h5 className="mt-4">6. Changes to This Policy</h5>
      <p>
        We may update this Privacy Policy from time to time. Changes will be posted on this page with a revised date.
      </p>

      <h5 className="mt-4">7. Contact Us</h5>
      <p>
        If you have any questions about this Privacy Policy, you can contact us at:
        <br />
        <strong>Email:</strong> support@myshop.com
      </p>

      <p className="text-muted mt-4">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </div>
    </Layout>
   );
}

export default Policy;