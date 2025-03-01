import React from 'react';
import { FaCheck } from 'react-icons/fa';

const PricingSection = () => {
  const pricingTiers = [
    {
      name: 'Free',
      price: 'Free',
      features: [
        'Basic Transcription: Real-time transcription in English.',
        '300 Monthly Transcription Minutes: Enough for casual users.',
        'AI Summaries: Short summaries of meetings.',
        'Import 3 Audio/Video Files: Lifetime limit for file uploads.',
        'Basic Team Collaboration: Add up to 2 teammates.'
      ]
    },
    {
      name: 'Pro',
      price: '$6.99/user/month (billed annually) or $8.99/user/month (billed monthly)',
      features: [
        'Advanced AI Summaries: Detailed summaries, bullet points, and actionable conclusions.',
        'Real-Time Translation: Supports English, French, Spanish, and more.',
        'Interactive Tools: Polls, quizzes, and whiteboard with calculator.',
        '1200 Monthly Transcription Minutes: Enough for frequent users.',
        'Import 10 Audio/Video Files Per Month: For additional flexibility.'
      ]
    },
    {
      name: 'Enterprise',
      price: 'Custom Pricing (Contact Sales)',
      features: [
        'Single Sign-On (SSO): Secure login for organizations.',
        'Advanced Security and Compliance: GDPR, HIPAA, and SOC 2 compliance.',
        'Meeting Fatigue Detection: AI alerts for breaks to improve focus.',
        'Custom Branding: White-label the platform for your organization.',
        'Unlimited Transcription Minutes: No limits on meeting duration or usage.'
      ]
    }
  ];

  return (
    <div id="pricing" className="min-h-screen bg-gray-50 py-12">
      <div className="flex flex-wrap justify-center gap-8 px-4">
        {pricingTiers.map((tier, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-8 w-80 transform hover:scale-105 transition-all border border-gray-200">
            <div className="mb-6 text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">{tier.name}</h2>
              <p className="text-normal font-bold my-4">
                {tier.price}
                {tier.price !== 'Free' && tier.price !== 'Custom Pricing (Contact Sales)' && (
                  <span className="text-lg text-gray-500"></span>
                )}
              </p>
            </div>
            <ul className="space-y-4 mb-8">
              {tier.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-gray-700 text-sm font-medium ">
                  <FaCheck className="w-5 h-5 flex-shrink-0 text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-md">
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingSection;






