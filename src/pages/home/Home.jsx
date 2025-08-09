import React from 'react'
import Header from './components/Header'
import Navbar from '../../components/common_components/navbar/Navbar'
import MainBody from './components/MainBody'
import Footer from '../../components/common_components/footer/Footer'
import UserProfile from '../../components/auth/UserProfile'
import { useAuth } from '../../contexts/AuthContext'

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Custom Header with User Profile */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-800 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl">💇‍♀️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">HeadZ</h1>
                <p className="text-blue-100 text-sm">AI Hairstyle Transformation</p>
              </div>
            </div>

            {/* User Profile and Logout */}
            <div className="flex items-center space-x-4">
              <UserProfile />
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <Navbar />
      <MainBody />
      <Footer />
    </div>
  )
}

export default Home