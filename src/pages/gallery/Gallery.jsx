import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/common_components/navbar/Navbar'
import Footer from '../../components/common_components/footer/Footer'
import Carousel3D from '../../components/Carousel3D'

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState(null)
  const [viewMode, setViewMode] = useState('carousel') // Default to 3D carousel view

  // Gallery images (added more Indian male hairstyles)

  const galleryImages = [
    // Short
    {
      id: 1,
      title: 'Indian Textured Quiff',
      category: 'short',
      before: 'https://images.unsplash.com/photo-1520975922284-9bcd0cafa6e6?w=430&h=610&fit=crop&crop=faces',
      after: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=430&h=610&fit=crop&crop=faces',
      description: 'Clean sides with textured volume on top'
    },
    {
      id: 2,
      title: 'Indian Classic Fade',
      category: 'short',
      before: 'https://images.unsplash.com/photo-1519346131800-56e9c5555521?w=430&h=610&fit=crop&crop=faces',
      after: 'https://images.unsplash.com/photo-1520975942200-6b0e06ef19ab?w=430&h=610&fit=crop&crop=faces',
      description: 'Low fade with neat top for daily wear'
    },
    {
      id: 3,
      title: 'Indian Messy Crop',
      category: 'short',
      before: 'https://images.unsplash.com/photo-1537386415560-1923c12e8cda?w=430&h=610&fit=crop&crop=faces',
      after: 'https://images.unsplash.com/photo-1520975922131-6d89f9b4b3b7?w=430&h=610&fit=crop&crop=faces',
      description: 'Textured messy crop with light fringe'
    },
    {
      id: 4,
      title: 'Indian Buzz Cut',
      category: 'short',
      before: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=430&h=610&fit=crop&crop=faces',
      after: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=430&h=610&fit=crop&crop=faces',
      description: 'Clean buzz cut with sharp edges'
    },
    // Medium
    {
      id: 5,
      title: 'Indian Side Part',
      category: 'medium',
      before: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=430&h=610&fit=crop&crop=faces',
      after: 'https://images.unsplash.com/photo-1547106634-056c87d1edf7?w=430&h=610&fit=crop&crop=faces',
      description: 'Professional side part with light shine'
    },
    {
      id: 6,
      title: 'Indian Slick Back',
      category: 'medium',
      before: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=430&h=610&fit=crop&crop=faces',
      after: 'https://images.unsplash.com/photo-1559102877-4a2cc0f8d3d7?w=430&h=610&fit=crop&crop=faces',
      description: 'Slick back with medium hold and shine'
    },
    {
      id: 7,
      title: 'Indian Pompadour',
      category: 'medium',
      before: 'https://images.unsplash.com/photo-1600986602661-7e089d7f6d1d?w=430&h=610&fit=crop&crop=faces',
      after: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=430&h=610&fit=crop&crop=faces',
      description: 'High volume front with tapered sides'
    },
    {
      id: 8,
      title: 'Indian Medium Waves',
      category: 'medium',
      before: 'https://images.unsplash.com/photo-1601288496920-b6154fe3626a?w=430&h=610&fit=crop&crop=faces',
      after: 'https://images.unsplash.com/photo-1605992280421-7d7a0d0d2e88?w=430&h=610&fit=crop&crop=faces',
      description: 'Natural waves with light texture'
    },
    // Long
    {
      id: 9,
      title: 'Indian Long Layered',
      category: 'long',
      before: 'https://images.unsplash.com/photo-1558244661-d248897f7bc4?w=430&h=610&fit=crop&crop=faces',
      after: 'https://images.unsplash.com/photo-1541537103745-ea3429c65dc0?w=430&h=610&fit=crop&crop=faces',
      description: 'Layered long hair with natural flow'
    },
    {
      id: 10,
      title: 'Indian Shoulder Length Waves',
      category: 'long',
      before: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=430&h=610&fit=crop&crop=faces',
      after: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=430&h=610&fit=crop&crop=faces',
      description: 'Relaxed waves at shoulder length'
    },
    // Curly
    {
      id: 11,
      title: 'Indian Curly Volume',
      category: 'curly',
      before: 'https://images.unsplash.com/photo-1518544801976-3e0a6d06b32a?w=430&h=610&fit=crop&crop=faces',
      after: 'https://images.unsplash.com/photo-1533670801800-8d54d0f1f1af?w=430&h=610&fit=crop&crop=faces',
      description: 'Defined curls with controlled volume'
    },
    {
      id: 12,
      title: 'Indian Tight Curls',
      category: 'curly',
      before: 'https://images.unsplash.com/photo-1583864697784-a0efc8379f70?w=430&h=610&fit=crop&crop=faces',
      after: 'https://images.unsplash.com/photo-1600679620924-47bf7fcbd629?w=430&h=610&fit=crop&crop=faces',
      description: 'Tight curls with shape and structure'
    },
    // From TryNow Page
    {
      id: 13,
      title: 'Messy Fringe',
      category: 'short',
      before: '/images/handsome-indian-man.png',
      after: '/images/messy-fringe-new.jpg',
      description: 'Modern messy fringe with forward sweep'
    },
    {
      id: 14,
      title: 'Slick Back Style',
      category: 'medium',
      before: '/images/handsome-indian-man.png',
      after: '/images/slick-back.jpg',
      description: 'Classic slick back with medium hold'
    },
    {
      id: 15,
      title: 'Textured Messy Quiff',
      category: 'short',
      before: '/images/handsome-indian-man.png',
      after: '/images/textured-messy-quiff.jpg',
      description: 'Textured quiff with upward styling'
    },
    {
      id: 16,
      title: 'Indian Professional Cut',
      category: 'short',
      before: '/images/handsome-indian-man-3.png',
      after: 'https://images.unsplash.com/photo-1520975922284-9bcd0cafa6e6?w=430&h=610&fit=crop&crop=faces',
      description: 'Clean professional cut with textured styling'
    }
  ]

  // Compute category counts dynamically from images
  const categories = [
    { id: 'all', name: 'All Styles' },
    { id: 'short', name: 'Short Hair' },
    { id: 'medium', name: 'Medium Hair' },
    { id: 'long', name: 'Long Hair' },
    { id: 'curly', name: 'Curly & Wavy' }
  ].map((category) => ({
    ...category,
    count:
      category.id === 'all'
        ? galleryImages.length
        : galleryImages.filter((img) => img.category === category.id).length,
  }))

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory)

  const openModal = (image) => {
    setSelectedImage(image)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedImage(null)
    document.body.style.overflow = 'unset'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Show navbar only in grid view */}
      {viewMode === 'grid' && <Navbar />}

      {/* 3D Carousel View - Default view */}
      {viewMode === 'carousel' && (
        <div className="relative">
          <Carousel3D images={filteredImages} />

          {/* Floating Navigation */}
          <div className="fixed top-4 left-4 z-50 flex flex-col gap-2">
            <Link
              to="/"
              className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-200 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Home
            </Link>

            {/* 3D Experience Indicator */}
            <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-md text-white px-3 py-1 rounded-lg text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              3D Gallery Experience
            </div>
          </div>

          {/* View Toggle */}
          <div className="fixed top-4 right-4 z-50">
            <button
              onClick={() => setViewMode('grid')}
              className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-200 flex items-center gap-2 group"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span className="text-sm">Grid View</span>
            </button>
          </div>

          {/* Category Filter for Carousel */}
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-2 flex gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-white text-gray-900'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Try Now CTA */}
          <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-40">
            <Link
              to="/trynow"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg"
            >
              Try Your Own Transformation
            </Link>
          </div>
        </div>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <>
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl font-bold mb-6">Hair Transformation Gallery</h1>
                <p className="text-xl leading-relaxed text-purple-100 mb-8">
                  See real transformations from our AI hairstyle technology.
                  Browse before and after photos from thousands of satisfied users.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/trynow"
                    className="inline-block bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                  >
                    Try Your Own Transformation
                  </Link>
                  <button
                    onClick={() => setViewMode('carousel')}
                    className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all duration-200"
                  >
                    ✨ Back to 3D Carousel
                  </button>
                </div>
              </div>
            </div>
          </section>

      {/* Filter Categories */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Browse by Style</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                  <span className="ml-2 text-sm opacity-75">({category.count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  onClick={() => openModal(image)}
                >
                  <div className="relative">
                    <div className="grid grid-cols-2 h-64">
                      <div className="relative overflow-hidden">
                        <img
                          src={image.before}
                          alt="Before"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Before
                        </div>
                      </div>
                      <div className="relative overflow-hidden">
                        <img
                          src={image.after}
                          alt="After"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          After
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{image.title}</h3>
                    <p className="text-gray-600 mb-4">{image.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="inline-block bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium capitalize">
                        {image.category} Hair
                      </span>
                      <button className="text-purple-600 font-medium hover:text-purple-800 transition-colors">
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="relative">
                  <img
                    src={selectedImage.before}
                    alt="Before transformation"
                    className="w-full h-96 md:h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full font-medium">
                    Before
                  </div>
                </div>
                <div className="relative">
                  <img
                    src={selectedImage.after}
                    alt="After transformation"
                    className="w-full h-96 md:h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full font-medium">
                    After
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedImage.title}</h2>
                <p className="text-lg text-gray-600 mb-6">{selectedImage.description}</p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/trynow"
                    className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-purple-700 transition-colors"
                  >
                    Try This Style
                  </Link>
                  <button
                    onClick={closeModal}
                    className="flex-1 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready for Your Transformation?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-purple-100">
            Join thousands who have discovered their perfect hairstyle with our AI technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/trynow" 
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Start Your Transformation
            </Link>
            <Link 
              to="/signup" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all duration-200"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>

          <Footer />
        </>
      )}
    </div>
  )
}

export default Gallery