import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Handle OAuth callback immediately
if (window.location.hash.includes('access_token')) {
  // Redirect to auth callback page with hash
  const currentHash = window.location.hash;
  window.location.href = `/auth/callback${currentHash}`;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)