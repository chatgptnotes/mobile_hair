import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Handle the auth callback
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          navigate('/');
          return;
        }

        if (data.session) {
          console.log('✅ Authentication successful');
          navigate('/home');
        } else {
          console.log('❌ No session found');
          navigate('/');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        navigate('/');
      }
    };

    // Small delay to ensure auth state is processed
    const timer = setTimeout(handleAuthCallback, 1000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Completing Sign In...</h2>
        <p className="text-gray-600">Please wait while we redirect you.</p>
      </div>
    </div>
  );
};

export default AuthCallback;
