// Handle OAuth callback with hash fragments
export const handleAuthCallback = () => {
  // Check if we have hash fragments in the URL
  if (window.location.hash.includes('access_token')) {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get('access_token');
    const refreshToken = hashParams.get('refresh_token');
    
    if (accessToken) {
      // Store tokens in localStorage temporarily
      localStorage.setItem('supabase_access_token', accessToken);
      if (refreshToken) {
        localStorage.setItem('supabase_refresh_token', refreshToken);
      }
      
      // Clear the hash and redirect to home
      window.history.replaceState(null, null, '/home');
      window.location.reload();
    }
  }
};

// Initialize auth callback handling
if (typeof window !== 'undefined') {
  // Run on page load
  document.addEventListener('DOMContentLoaded', handleAuthCallback);
  
  // Run immediately if DOM is already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleAuthCallback);
  } else {
    handleAuthCallback();
  }
}
