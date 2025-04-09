// Google Authentication Demo
import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  onAuthStateChanged, 
  signOut 
} from 'firebase/auth';
import './App.css';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyClCQnm-R6vSOSc3IlcId3fdoCGagKeUzY",
  authDomain: "auth-app-2b13e.firebaseapp.com",
  projectId: "auth-app-2b13e",
  storageBucket: "auth-app-2b13e.firebasestorage.app",
  messagingSenderId: "522265974826",
  appId: "1:522265974826:web:c015fac14a82e5c3260b53",
  measurementId: "G-XW8T1XQ39D"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [signOutMessage, setSignOutMessage] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Handle auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.photoURL) {
        // Validate profile image URL
        const img = new Image();
        img.onload = () => setImageError(false);
        img.onerror = () => setImageError(true);
        img.src = currentUser.photoURL;
      }
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setSignOutMessage(false);
      setImageError(false);
      
      // Validate profile picture if available
      const user = result.user;
      if (user.photoURL) {
        const img = new Image();
        img.onload = () => setImageError(false);
        img.onerror = () => setImageError(true);
        img.src = user.photoURL;
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setSignOutMessage(true);
      setTimeout(() => setSignOutMessage(false), 5000);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>
          <span className="header-text-auth">Google Authentication Demo</span>
        </h1>
      </header>

      <main className="app-main">
        {signOutMessage && (
          <div className="sign-out-message">
            <p>Signed out successfully!</p>
          </div>
        )}
        
        {!user && (
          <p className="welcome-text-outside">Welcome! This is a demo for Google authentication</p>
        )}
        
        {user ? (
          // User is logged in
          <div className="welcome-screen animate-fade-in">
            <h2>Welcome, {user.displayName}!</h2>
            <div className="user-info">
              <div className="profile-image-container">
                {user.photoURL && !imageError ? (
                  <img 
                    src={user.photoURL} 
                    alt="Profile" 
                    className="profile-image" 
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="profile-image-placeholder">
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : '?'}
                  </div>
                )}
              </div>
              <div className="user-details">
                <p><span className="user-detail-label">Name:</span> {user.displayName}</p>
                <p><span className="user-detail-label">Email:</span> {user.email}</p>
              </div>
            </div>
            <button 
              onClick={handleSignOut} 
              className="sign-out-button"
            >
              Sign Out
            </button>
          </div>
        ) : (
          // User is logged out
          <div className="login-screen animate-fade-in">
            <h2>Please sign in to continue</h2>
            <button 
              onClick={handleSignIn} 
              className="google-sign-in-button"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1, 0, 0, 1, 0, 0)">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </g>
              </svg>
              Sign in with Google
            </button>
          </div>
        )}
      </main>
      
      <footer className="app-footer">
        <p>Made by Sanskar Agrawal | Google Authentication Demo</p>
      </footer>
    </div>
  );
}

export default App;