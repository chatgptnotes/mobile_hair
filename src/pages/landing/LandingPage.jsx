import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import SphereGallery from '../../components/SphereGallery';
import LandingHeader from './components/LandingHeader'
import Navbar from '../../components/common_components/navbar/Navbar' 

const LandingPage = () => {
  const { login } = useAuth();

  const features = [
    {
      icon: "🎯",
      title: "Virtual Try-On",
      description: "Try different hairstyles on your bald head using our advanced AI technology"
    },
    {
      icon: "📸",
      title: "Photo Upload",
      description: "Simply upload your photo and see how different hairstyles look on you"
    },
    {
      icon: "🎨",
      title: "Style Library",
      description: "Browse through hundreds of hairstyles from classic to modern trends"
    },
    {
      icon: "💾",
      title: "Save & Share",
      description: "Save your favorite looks and share them with friends and family"
    }
  ];

  const popularStyles = [
    { name: "Textured Messy Quiff", image: "images/textured-messy-quiff.jpg" },
    { name: "Slick Back", image: "images/slick-back.jpg" },
    { name: "Messy Fringe", image: "images/messy-fringe-new.jpg" },
    { name: "Modern Fade", image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=200&h=200&fit=crop&crop=face" }
  ];

  const handleTryNow = () => {
    login(); // This will trigger the Google OAuth flow
  };

  return (
    <div className="min-h-screen">
      {/* Landing Header Component */}
      <LandingHeader />

      {/* Navbar Component */}
      <Navbar />

      {/* Hero Section with Interactive Sphere Gallery */}
      <section className="relative">
        <SphereGallery />
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="text-center bg-black/50 backdrop-blur-md rounded-3xl px-8 py-12 mx-4 max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
              Try Before You
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"> Style</span>
            </h1>
            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto drop-shadow-lg">
              Transform your look with our virtual hair try-on platform. 
              Explore different hairstyles in our interactive 3D gallery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto">
              <button
                onClick={handleTryNow}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                🚀 Try Hair Now
              </button>
              <a href="#gallery" className="border-2 border-white text-white bg-white/10 backdrop-blur-sm px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all duration-200 shadow-lg text-center">
                View Gallery
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose HeadZ?</h2>
            <p className="text-xl text-gray-600">Experience the future of hairstyle visualization</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-200">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Styles Section */}
      <section className="py-20 bg-gray-50" id="gallery">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Styles</h2>
            <p className="text-xl text-gray-600">Discover trending hairstyles that look great on bald heads</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularStyles.map((style, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-200">
                <div className="h-48 bg-gray-100 overflow-hidden">
                  <img 
                    src={style.image} 
                    alt={style.name}
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{style.name}</h3>
                  <button
                    onClick={handleTryNow}
                    className="block w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors text-center"
                  >
                    Try This Style
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Look?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have found their perfect hairstyle with HeadZ
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleTryNow}
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Start Free Trial
            </button>
            <a href="#gallery" className="border-2 border-white text-white bg-white/10 backdrop-blur-sm px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all duration-200">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-lg">💇‍♀️</span>
                </div>
                <span className="text-xl font-bold">HeadZ</span>
              </div>
              <p className="text-gray-400">AI-powered hairstyle transformation for everyone.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Virtual Try-On</li>
                <li>AI Transformation</li>
                <li>Style Library</li>
                <li>Photo Upload</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Get Started</h3>
              <button
                onClick={handleTryNow}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Try Now
              </button>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 HeadZ. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
