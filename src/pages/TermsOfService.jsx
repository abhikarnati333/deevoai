import React from 'react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen py-10 sm:px-10 lg:px-20">
      <div className="max-w-4xl mx-auto p-8 sm:p-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
        <p className='text-gray-700 italic mb-6'>Effective January 5th, 2025</p>
        <p className="text-gray-700 mb-6">
          Welcome to Deevo! By accessing or using our platform, you agree to comply with these Terms of Service. Please read them carefully.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
        <p className="text-gray-700 mb-6">
          By creating an account or using Deevo, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our <span onClick={() => {window.open('/privacy-policy', '_blank')}} className='cursor-pointer underline underline-offset-2 hover:opacity-65'>Privacy Policy</span>.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">2. User Responsibilities</h2>
        <p className="text-gray-700 mb-6">
          - You must provide accurate and current information during the registration process.
          <br />
          - You are responsible for safeguarding your account credentials.
          <br />
          - You agree not to misuse our platform, including attempting to gain unauthorized access or disrupt our services.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">3. Platform Usage</h2>
        <p className="text-gray-700 mb-6">
          Deevo is designed to generate personalized playlists. You may use it only for lawful purposes and in compliance with these terms. Any unauthorized use is prohibited.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">4. Intellectual Property</h2>
        <p className="text-gray-700 mb-6">
          All content, designs, and features of Deevo are protected under intellectual property laws. You may not copy, reproduce, or distribute any part of the platform without explicit permission.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">5. Third-Party Services</h2>
        <p className="text-gray-700 mb-6">
          Deevo integrates with third-party services like Spotify. You acknowledge that your use of these services is governed by their respective terms and privacy policies.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">6. Limitation of Liability</h2>
        <p className="text-gray-700 mb-6">
          Deevo is provided "as is" without any warranties. We are not liable for any damages resulting from your use of the platform, including loss of data or interruptions.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">7. Termination</h2>
        <p className="text-gray-700 mb-6">
          We reserve the right to suspend or terminate your account if you violate these terms or engage in behavior that harms our platform or other users.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">8. Modifications to Terms</h2>
        <p className="text-gray-700 mb-6">
          Deevo may update these Terms of Service from time to time. We will notify you of significant changes via email or through our platform.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">9. Contact Us</h2>
        <p className="text-gray-700">
          If you have any questions about these Terms of Service, you can contact us at:
          <br />
          <strong>Email:</strong> support@deevo.com
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
