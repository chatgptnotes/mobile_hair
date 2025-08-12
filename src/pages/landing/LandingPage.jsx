import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import SphereGallery from '../../components/SphereGallery';
import LandingHeader from './components/LandingHeader'
import Navbar from '../../components/common_components/navbar/Navbar' 

const LandingPage = () => {
  const { login } = useAuth();
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqData = [
    {
      question: "What image formats are supported?",
      answer: "We support all major image formats including JPEG, PNG, WebP, and HEIC. For best results, we recommend using high-resolution images (at least 512x512 pixels) with clear facial features."
    },
    {
      question: "Is my uploaded image data secure?",
      answer: "Absolutely! Your privacy is our top priority. All uploaded images are automatically deleted from our servers after 24 hours. We use enterprise-grade encryption and never store, share, or use your photos for any other purpose."
    },
    {
      question: "How long does image processing take?",
      answer: "Our AI processes most images in under 30 seconds. Processing time may vary slightly based on image size and complexity, but you'll typically see results almost instantly."
    },
    {
      question: "Can I process multiple images at once?",
      answer: "Currently, our service processes one image at a time to ensure the highest quality results. However, you can quickly upload and process multiple images in sequence without any delays."
    },
    {
      question: "Can I use this hairstyle changer on my phone?",
      answer: "Yes! RightHair works perfectly on all devices including smartphones, tablets, and computers. No app download required - simply use your mobile browser for the full experience."
    },
    {
      question: "What if I'm not satisfied with the results?",
      answer: "We offer a 100% satisfaction guarantee! If you're not happy with your results, try different hairstyles or contact our support team. We're committed to helping you find the perfect look."
    },
    {
      question: "Do I need to create an account to use RightHair?",
      answer: "No account required for basic use! You can try several hairstyles instantly. Creating a free account allows you to save your favorite looks and access premium features."
    }
  ];

  const howToUseSteps = [
    {
      icon: "📤",
      step: "1. Upload",
      title: "Upload",
      description: "Drag and drop your image or click to select from your device. We support all major image formats."
    },
    {
      icon: "⚡",
      step: "2. Choose Hairstyle & Process",
      title: "Choose Hairstyle & Process",
      description: "Pick a hairstyle and color, click generate, and see your new look instantly."
    },
    {
      icon: "📥",
      step: "3. Preview & Download",
      title: "Preview & Download",
      description: "Preview your new hairstyle. If you like the result, download your AI-generated look and share it anywhere."
    }
  ];

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

      {/* How to Use Section */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">How to Use AI Hairstyle Changer for Free</h2>
            <p className="text-2xl text-gray-600">Get professional results in just three simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-8xl mx-auto">
            {howToUseSteps.map((step, index) => (
              <div key={index} className="bg-white rounded-3xl p-16 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-10">
                  <span className="text-5xl text-blue-600">{step.icon}</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">{step.step}</h3>
                <p className="text-xl text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
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

      {/* Who Uses Our AI Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Who Uses Our AI Hairstyle Changer?</h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">From brides planning their perfect wedding look to professionals seeking career-enhancing styles, our AI hairstyle changer serves diverse needs across different life moments and goals.</p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-4">65%</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Women 25-45</h3>
              <p className="text-gray-600">Primary users seeking style changes and professional looks</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-4">20%</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Brides & Event Attendees</h3>
              <p className="text-gray-600">Special occasion styling and wedding preparation</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-4">10%</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Beauty Professionals</h3>
              <p className="text-gray-600">Stylists and consultants using as client tools</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-4">5%</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Men & Teens</h3>
              <p className="text-gray-600">Growing segment exploring personal style</p>
            </div>
          </div>

          {/* Use Cases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Wedding & Special Events */}
            <div className="bg-pink-50 rounded-3xl p-8 border border-pink-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">💕</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Wedding & Special Events</h3>
                  <p className="text-pink-600 font-medium">Bridal & Event Attendees</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6">Perfect your bridal look or find the ideal hairstyle for weddings, graduations, and special celebrations. Try multiple elegant styles risk-free before your big day.</p>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li>• Bridal hairstyle preview</li>
                <li>• Formal event looks</li>
                <li>• Updo and elegant styles</li>
                <li>• Color coordination</li>
              </ul>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-colors">
                Try This Use Case
              </button>
            </div>

            {/* Personal Style Exploration */}
            <div className="bg-purple-50 rounded-3xl p-8 border border-purple-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">✨</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Personal Style Exploration</h3>
                  <p className="text-purple-600 font-medium">Style Enthusiasts</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6">Experiment with bold new looks and discover your personal style. From trendy cuts to vibrant colors, explore endless possibilities without commitment.</p>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li>• Trendy hairstyles</li>
                <li>• Bold color experiments</li>
                <li>• Seasonal style changes</li>
                <li>• Fashion-forward looks</li>
              </ul>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-colors">
                Try This Use Case
              </button>
            </div>

            {/* Pre-Salon Consultation */}
            <div className="bg-green-50 rounded-3xl p-8 border border-green-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">💇</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Pre-Salon Consultation</h3>
                  <p className="text-green-600 font-medium">Salon Clients</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6">Avoid costly hair mistakes by previewing your desired look before visiting the salon. Show your stylist exactly what you want with visual references.</p>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li>• Salon consultation prep</li>
                <li>• Avoid hair disasters</li>
                <li>• Clear communication</li>
                <li>• Cost-effective planning</li>
              </ul>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-colors">
                Try This Use Case
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Styles Section */}
      <section className="py-32 bg-gray-50" id="gallery">
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

      {/* User Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">User Testimonials</h2>
            <p className="text-xl text-gray-600">See what our customers are saying about RightHair</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-purple-600 font-semibold">SJ</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500">New York, NY</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 italic">
                "RightHair completely changed how I approach hairstyling! I was able to try dozens of different looks before my wedding and found the perfect style. The AI is incredibly accurate and saved me from a potential hair disaster."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-semibold">MR</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Maria Rodriguez</h4>
                  <p className="text-sm text-gray-500">Los Angeles, CA</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 italic">
                "As someone who's always been afraid to experiment with hair colors, this tool gave me the confidence to finally go blonde! The virtual preview was so realistic, and now I love my new look."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 font-semibold">EC</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Emily Chen</h4>
                  <p className="text-sm text-gray-500">Chicago, IL</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 italic">
                "I'm a busy mom and don't have time for salon consultations. RightHair lets me explore different hairstyles at home and show my stylist exactly what I want. It's a game-changer!"
              </p>
            </div>

            {/* Testimonial 4 */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-pink-600 font-semibold">JW</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Jessica Williams</h4>
                  <p className="text-sm text-gray-500">Miami, FL</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 italic">
                "The before and after comparisons are amazing! I tried over 50 different hairstyles and colors. It's like having a personal stylist available 24/7. Highly recommend!"
              </p>
            </div>

            {/* Testimonial 5 */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-indigo-600 font-semibold">AD</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Amanda Davis</h4>
                  <p className="text-sm text-gray-500">Seattle, WA</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 italic">
                "I was skeptical at first, but the AI technology is incredibly sophisticated. The hairstyles look so natural on my face shape. It helped me avoid an expensive mistake at the salon."
              </p>
            </div>

            {/* Testimonial 6 */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-orange-600 font-semibold">LT</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Lisa Thompson</h4>
                  <p className="text-sm text-gray-500">Austin, TX</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 italic">
                "Perfect for trying bold new looks without commitment! I experimented with pixie cuts, long waves, and even crazy colors. Now I know exactly what suits me best."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose RightHair Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Why Choose RightHair?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what makes RightHair the #1 choice for AI-powered hairstyle transformations.
              Experience the perfect blend of technology, convenience, and quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Advanced AI Technology</h3>
              <p className="text-gray-600">
                Our cutting-edge AI algorithms provide the most realistic and accurate hairstyle
                transformations available online, powered by machine learning and computer vision.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Lightning Fast Results</h3>
              <p className="text-gray-600">
                Get your transformed hairstyle in under 30 seconds. No waiting, no delays - just
                instant, professional-quality results that save you time.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">100% Privacy Protected</h3>
              <p className="text-gray-600">
                Your photos are automatically deleted after 24 hours. We never store, share, or use
                your images for any purpose other than your hairstyle transformation.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Works on Any Device</h3>
              <p className="text-gray-600">
                No app downloads required! Use RightHair directly in your browser on smartphones,
                tablets, or computers. Perfect compatibility across all platforms.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Unlimited Style Options</h3>
              <p className="text-gray-600">
                Choose from hundreds of hairstyles and colors. From classic cuts to trendy styles,
                natural colors to bold fantasy shades - explore endless possibilities.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Trusted by 50k+ Users</h3>
              <p className="text-gray-600">
                Join thousands of satisfied users who've found their perfect hairstyle with RightHair.
                Rated 4.9/5 stars with 98% satisfaction rate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Find answers to common questions about our image processing service</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${openFAQ === index ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-4 text-gray-600 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
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
