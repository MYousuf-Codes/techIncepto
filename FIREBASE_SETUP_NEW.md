# Firebase Setup Guide for TECHINCEPTO

This guide will help you set up Firebase for your TECHINCEPTO project, enabling authentication, Firestore database, and admin functionality.

## Prerequisites

- Google account
- Node.js installed
- TECHINCEPTO project running locally

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"**
3. Enter project name: `techincepto-courses` (or your preferred name)
4. Enable Google Analytics (optional)
5. Select your country/region
6. Click **"Create project"**

## Step 2: Enable Authentication

1. In Firebase Console, click **"Authentication"** in the left sidebar
2. Click **"Get started"**
3. Go to **"Sign-in method"** tab
4. Click on **"Email/Password"**
5. Enable **"Email/Password"** (first toggle)
6. Click **"Save"**

## Step 3: Create Firestore Database

1. Click **"Firestore Database"** in the left sidebar
2. Click **"Create database"**
3. Select **"Start in test mode"** (we'll secure it later)
4. Choose your preferred location (same as your users' location)
5. Click **"Done"**

## Step 4: Get Web App Configuration

1. Click the **settings gear icon** → **"Project settings"**
2. Scroll down to **"Your apps"** section
3. Click **"Add app"** → **Web app icon** `</>`
4. Enter app nickname: `TECHINCEPTO Web`
5. **Don't** check "Also set up Firebase Hosting"
6. Click **"Register app"**
7. **Copy the configuration object** - you'll need these values:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",           // Copy this
  authDomain: "your-project.firebaseapp.com",  // Copy this
  projectId: "your-project-id", // Copy this
  storageBucket: "your-project.appspot.com",   // Copy this
  messagingSenderId: "123456789",  // Copy this
  appId: "1:123456789:web:abcdef"  // Copy this
};
```

## Step 5: Generate Admin SDK Service Account

1. Still in **"Project settings"**, click **"Service accounts"** tab
2. Click **"Generate new private key"**
3. Click **"Generate key"** in the popup
4. **Download the JSON file** and keep it secure
5. Open the JSON file and note these values:
   - `project_id`
   - `client_email`  
   - `private_key`

## Step 6: Configure Environment Variables

1. In your project root, copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Open `.env.local` and fill in the values:

```env
# From Step 4 (Web App Config)
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef

# From Step 5 (Service Account JSON)
FIREBASE_ADMIN_PROJECT_ID=your-project-id
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour complete private key here\n-----END PRIVATE KEY-----\n"

# Generate a secure random string (run: openssl rand -base64 32)
ADMIN_JWT_SECRET=your_32_character_or_longer_secret_here
```

## Step 7: Test Your Setup

1. **Restart your development server**:
   ```bash
   npm run dev
   ```

2. **Visit your app**:
   - Go to `http://localhost:3000`
   - Visit `/courses` - should load without Firebase errors
   - Try signing up a new account
   - Try logging in

## Troubleshooting

### Common Issues:

1. **"auth/invalid-api-key" error**:
   - Check that `NEXT_PUBLIC_FIREBASE_API_KEY` is set correctly
   - Make sure there are no extra spaces or quotes

2. **"Missing environment variables" error**:
   - Ensure all required variables are in `.env.local`
   - Restart your development server after adding variables

3. **Private key formatting issues**:
   - Make sure the private key includes `\n` characters
   - Wrap the entire private key in double quotes

## Quick Start

1. Create Firebase project and enable Auth + Firestore
2. Copy `.env.local.example` to `.env.local`  
3. Fill in your Firebase configuration values
4. Run `npm run dev`
5. Visit `/courses` to test

The `/courses` page should now work without authentication errors!