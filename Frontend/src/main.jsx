
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './Services/AuthContext.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="enter api">
    <AuthProvider>
      <App />
    </AuthProvider>
  </GoogleOAuthProvider>
);
