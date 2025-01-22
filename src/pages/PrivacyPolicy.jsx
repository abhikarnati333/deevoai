import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen py-10 sm:px-10 lg:px-20">
      <div className="max-w-4xl mx-auto  p-8 sm:p-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <p className='text-gray-700 italic mb-6'>Effective January 5th, 2025</p>
        <p className="text-gray-700 mb-6">
          At Deevo, we are committed to protecting your privacy. This document outlines how we handle your personal data when you use our services.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">1. Data We Collect</h2>
        <p className="text-gray-700 mb-6">
          - <strong>Personal Details:</strong> When signing up, we may gather your name, email, and other necessary information.  
          <br />
          - <strong>Usage Information:</strong> We collect insights into your activity on our platform, such as playlist preferences, interactions, and session times.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">2. How We Use Collected Data</h2>
        <p className="text-gray-700 mb-6">
          We use your information to:
          <br />
          - Personalize your experience and generate unique playlists.
          <br />
          - Notify you about updates, offers, or technical issues.
          <br />
          - Enhance our platform through usage analysis.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">3. Sharing Your Information</h2>
        <p className="text-gray-700 mb-6">
          Deevo does not sell your personal data. We may share it only with:
          <br />
          - Trusted third-party services like Spotify to enable integrations.
          <br />
          - Authorities if legally required or to protect our platform's integrity.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">4. Keeping Your Data Safe</h2>
        <p className="text-gray-700 mb-6">
          We implement robust security measures to protect your data. However, no online platform is entirely secure. Please reach out if you detect any unauthorized access to your account.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">5. Your Rights</h2>
        <p className="text-gray-700 mb-6">
          You have the right to:
          <br />
          - Access and update your personal information.
          <br />
          - Request data deletion at any time.
          <br />
          - Unsubscribe from non-essential communications.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">6. Policy Updates</h2>
        <p className="text-gray-700 mb-6">
          We may revise this policy periodically. Any significant changes will be communicated through email or in-app notifications.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">7. Get in Touch</h2>
        <p className="text-gray-700">
          For questions or concerns about this policy, contact us at:
          <br />
          <strong>Email:</strong> support@deevo.com
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
