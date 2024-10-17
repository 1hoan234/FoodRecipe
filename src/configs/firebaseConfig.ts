// Import the functions you need from the SDKs 
import { initializeApp } from "firebase/app"; 
 
// Retrieve Firebase configuration 
const firebaseConfig = { 
    apiKey: process.env.API_KEY, // Use the variable from your .env file 
    authDomain: process.env.AUTH_DOMAIN, 
    projectId: process.env.PROJECT_ID, 
    storageBucket: process.env.STORAGE_BUCKET, 
    messagingSenderId: process.env.MESSAGING_SENDER_ID, 
    appId: process.env.APP_ID, 
    measurementId: process.env.MEASUREMENT_ID, 
}; 
 
if (!firebaseConfig) { 
    throw new Error("Firebase configuration is missing!"); 
}; 
 
// Initialize Firebase 
const app = initializeApp(firebaseConfig); 
 
export default app;
