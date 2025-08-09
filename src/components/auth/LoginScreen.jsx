import React, { useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const LoginScreen = () => {
  const { login, handleCredentialResponse } = useAuth();
  const googleButtonRef = useRef(null);

  useEffect(() => {
    const renderGoogleButton = () => {
      if (window.google && googleButtonRef.current) {
        window.google.accounts.id.renderButton(
          googleButtonRef.current,
          {
            theme: "outline",
            size: "large",
            type: "standard",
            text: "signin_with",
            shape: "rectangular",
            logo_alignment: "left",
            width: 300
          }
        );
      } else {
        // Retry after a short delay
        setTimeout(renderGoogleButton, 100);
      }
    };

    renderGoogleButton();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4">
            <span className="text-3xl">💇‍♀️</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">HeadZ</h1>
          <p className="text-blue-100 text-lg">AI Hairstyle Transformation</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
            <p className="text-gray-600">Sign in to transform your hairstyle with AI</p>
          </div>

          {/* Features List */}
          <div className="mb-6 space-y-3">
            <div className="flex items-center text-gray-700">
              <span className="text-green-500 mr-3">✨</span>
              <span>AI-powered hairstyle transformations</span>
            </div>
            <div className="flex items-center text-gray-700">
              <span className="text-green-500 mr-3">🎨</span>
              <span>Multiple style options to choose from</span>
            </div>
            <div className="flex items-center text-gray-700">
              <span className="text-green-500 mr-3">📱</span>
              <span>Instant results and easy downloads</span>
            </div>
            <div className="flex items-center text-gray-700">
              <span className="text-green-500 mr-3">🔒</span>
              <span>Secure authentication with Google</span>
            </div>
          </div>

          {/* Google Sign In Button */}
          <div className="text-center mb-4">
            <div ref={googleButtonRef} className="flex justify-center"></div>
          </div>

          {/* Alternative Login Button */}
          <div className="text-center">
            <button
              onClick={login}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              🚀 Continue with Google
            </button>
          </div>

          {/* Privacy Notice */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our{' '}
              <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-blue-100 text-sm">
            Transform your look instantly with our free AI hairstyle changer
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
