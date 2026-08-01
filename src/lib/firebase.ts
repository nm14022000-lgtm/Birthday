import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics, isSupported, Analytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHUdHlKr0IR1un01f_iLnoaurS8zDWV0Y",
  authDomain: "birthday-630a6.firebaseapp.com",
  projectId: "birthday-630a6",
  storageBucket: "birthday-630a6.firebasestorage.app",
  messagingSenderId: "1085368265882",
  appId: "1:1085368265882:web:8fb01cdf173bd5f80e4323",
  measurementId: "G-X7Y7V40Q72"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let analytics: Analytics | null = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch((err) => {
    console.warn('Firebase Analytics not supported in this environment:', err);
  });
}

export { app, analytics, firebaseConfig };
