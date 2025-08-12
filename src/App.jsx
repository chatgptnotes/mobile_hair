import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import ProtectedRoute from './components/auth/ProtectedRoute'
import LandingPage from './pages/landing/LandingPage'
import Home from './pages/home/Home'
import TryNow from './pages/trynow/TryNow'
import About from './pages/about/About'
import Contact from './pages/contact/Contact'
import Gallery from './pages/gallery/Gallery'
import Styles from './pages/styles/Styles'
import AuthCallback from './pages/auth/AuthCallback'

// Root route: show landing if not logged in, or redirect to /home if logged in
const RootRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return null;
  return isAuthenticated ? <Navigate to="/home" replace /> : <LandingPage />;
}

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Root: Landing when logged out, redirect to /home when logged in */}
          <Route path="/" element={<RootRoute />} />

          {/* Auth callback route */}
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* Protected routes - require authentication */}
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/trynow" element={
            <ProtectedRoute>
              <TryNow />
            </ProtectedRoute>
          } />
          <Route path="/about" element={
            // <ProtectedRoute>
              <About />
            // </ProtectedRoute>
          } />
          <Route path="/contact" element={
            // <ProtectedRoute>
              <Contact />
            // </ProtectedRoute>
          } />
          <Route path="/gallery" element={
            // <ProtectedRoute>
              <Gallery />
            // </ProtectedRoute>
          } />
          <Route path="/styles" element={
            // <ProtectedRoute>
              <Styles />
            // </ProtectedRoute>
          } />

        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App