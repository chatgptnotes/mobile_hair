# Google OAuth Setup Instructions

## 🔐 Setting up Google OAuth for HeadZ App

Follow these steps to configure Google OAuth authentication for your HeadZ hairstyle transformation app.

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: `headz-hairstyle-app`
4. Click "Create"

### Step 2: Enable Google Identity Services

1. In the Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Google Identity Services API"
3. Click on it and press "Enable"

### Step 3: Configure OAuth Consent Screen

1. Go to "APIs & Services" → "OAuth consent screen"
2. Choose "External" user type (unless you have a Google Workspace)
3. Fill in the required information:
   - **App name**: HeadZ - AI Hairstyle Transformation
   - **User support email**: Your email
   - **Developer contact information**: Your email
   - **App domain**: Your domain (e.g., localhost:5173 for development)
4. Add scopes:
   - `email`
   - `profile`
   - `openid`
5. Save and continue

### Step 4: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Configure:
   - **Name**: HeadZ Web Client
   - **Authorized JavaScript origins**: 
     - `http://localhost:5173` (for development)
     - `https://yourdomain.com` (for production)
   - **Authorized redirect URIs**: 
     - `http://localhost:5173` (for development)
     - `https://yourdomain.com` (for production)
5. Click "Create"
6. Copy the **Client ID** (you'll need this)

### Step 5: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Google Client ID:
   ```env
   REACT_APP_GOOGLE_CLIENT_ID=your_actual_client_id_here.apps.googleusercontent.com
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```

### Step 6: Test the Authentication

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173`
3. You should see the login screen
4. Click "Continue with Google" to test authentication

## 🔧 Troubleshooting

### Common Issues:

1. **"This app isn't verified" warning**:
   - This is normal for development
   - Click "Advanced" → "Go to HeadZ (unsafe)" to continue
   - For production, you'll need to verify your app

2. **"redirect_uri_mismatch" error**:
   - Check that your authorized redirect URIs match exactly
   - Include both `http://localhost:5173` and your production domain

3. **"invalid_client" error**:
   - Verify your Client ID is correct in the `.env` file
   - Make sure there are no extra spaces or characters

4. **Authentication not working**:
   - Check browser console for errors
   - Verify Google Identity Services script is loading
   - Ensure your domain is authorized in Google Console

## 🚀 Production Deployment

For production deployment:

1. Add your production domain to authorized origins
2. Update the `.env` file with production values
3. Consider app verification for better user experience
4. Set up proper error handling and logging

## 📱 Features Included

- ✅ Google OAuth 2.0 authentication
- ✅ User profile display with avatar
- ✅ Session management and persistence
- ✅ Secure logout functionality
- ✅ Protected routes (all pages require authentication)
- ✅ Transformation counter tracking
- ✅ User-specific data storage

## 🔒 Security Notes

- Never commit your `.env` file to version control
- Use HTTPS in production
- Regularly rotate your API keys
- Monitor authentication logs for suspicious activity
- Consider implementing rate limiting for API calls
