import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize Supabase Auth
  useEffect(() => {
    // Handle hash fragments from OAuth redirect
    const handleAuthCallback = async () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');

      if (accessToken) {
        // Clear the hash from URL
        window.history.replaceState(null, null, window.location.pathname);

        // Set the session with the token
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: hashParams.get('refresh_token')
        });

        if (data.session) {
          setUser(data.session.user);
          setIsAuthenticated(true);
          // Redirect to home page
          window.location.href = '/home';
          return;
        }
      }
    };

    // Check for hash fragments first
    if (window.location.hash.includes('access_token')) {
      handleAuthCallback();
      return;
    }

    // Check for stored tokens from OAuth callback
    const checkStoredTokens = async () => {
      const accessToken = localStorage.getItem('supabase_access_token');
      const refreshToken = localStorage.getItem('supabase_refresh_token');

      if (accessToken) {
        try {
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });

          if (data.session) {
            setUser(data.session.user);
            setIsAuthenticated(true);
            // Clear stored tokens
            localStorage.removeItem('supabase_access_token');
            localStorage.removeItem('supabase_refresh_token');
            setIsLoading(false);
            return;
          }
        } catch (error) {
          console.error('Error setting session:', error);
          localStorage.removeItem('supabase_access_token');
          localStorage.removeItem('supabase_refresh_token');
        }
      }

      // Get initial session if no stored tokens
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    checkStoredTokens();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event);

        if (session) {
          setUser(session.user);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) {
        console.error('❌ Login error:', error);
        throw error;
      }

      console.log('✅ Login initiated');
    } catch (error) {
      console.error('❌ Authentication error:', error);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('❌ Logout error:', error);
        throw error;
      }

      setUser(null);
      setIsAuthenticated(false);
      console.log('✅ User logged out successfully');

      // Redirect to landing page
      window.location.href = '/';
    } catch (error) {
      console.error('❌ Logout error:', error);
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
