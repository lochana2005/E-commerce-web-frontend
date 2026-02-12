import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './context/AuthContext';
import './index.css'
import App from './App.jsx'


const GOOGLE_CLIENT_ID = "25820545637-rq1p2ieak6kiet13lffbdmrlqjgp4v5o.apps.googleusercontent.com";

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <App />
      </AuthProvider>

    </GoogleOAuthProvider>
  </StrictMode>,
)