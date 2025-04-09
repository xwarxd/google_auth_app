# React Firebase Google Authentication

A simple React application that implements Google Authentication using Firebase.

## Features
- Google Authentication with Firebase
- Display user information after successful login
- Sign out functionality
- Responsive design

## Quick Setup

### 1. Create a Firebase Project
- Go to the Firebase Console
- Add project and register your web app
- Copy your Firebase configuration

### 2. Enable Google Authentication
- Enable Google as a sign-in provider in Firebase Authentication
- Allow domain if using a custom domain in firebase console

### 3. Set Up the React App
```
npx create-react-app firebase-auth-app
cd firebase-auth-app
npm install firebase
```

### 4. Update Configuration
- Replace the Firebase configuration in `src/App.jsx` with a new one.

### 5. Run the Application
```
npm start
```

## Project Structure
- `App.jsx`: Main application component with Firebase setup and authentication logic
- `App.css`: Styling for the application

## Deployment
```
npm run build
```
