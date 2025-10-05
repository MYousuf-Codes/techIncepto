// Firebase Admin SDK initialization for server-side operations
import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getFirestore, Firestore, Timestamp } from 'firebase-admin/firestore';

let adminApp: App;
let adminAuth: Auth;
let adminDb: Firestore;

try {
  // Check if Firebase Admin is already initialized
  if (getApps().length === 0) {
    // Validate required environment variables
    const requiredEnvVars = {
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
    };

    const missingEnvVars = Object.entries(requiredEnvVars)
      .filter(([_, value]) => !value)
      .map(([key]) => `FIREBASE_ADMIN_${key.toUpperCase()}`);

    if (missingEnvVars.length > 0) {
      throw new Error(
        `Missing required Firebase Admin environment variables: ${missingEnvVars.join(', ')}\n` +
        'Please check your .env.local file and ensure all Firebase Admin configuration variables are set.'
      );
    }

    // Initialize Firebase Admin
    adminApp = initializeApp({
      credential: cert({
        projectId: requiredEnvVars.projectId!,
        clientEmail: requiredEnvVars.clientEmail!,
        privateKey: requiredEnvVars.privateKey!.replace(/\\n/g, '\n'),
      }),
      projectId: requiredEnvVars.projectId!,
    });
  } else {
    adminApp = getApps()[0] as App;
  }

  adminAuth = getAuth(adminApp);
  adminDb = getFirestore(adminApp);

} catch (error) {
  console.error('Firebase Admin initialization error:', error);
  
  // Create mock objects for build time to prevent build failures
  if (process.env.NODE_ENV === 'development' || process.env.CI) {
    console.warn('Firebase Admin SDK not properly configured, using mock objects');
    
    // Create minimal mock objects that won't crash the build
    adminApp = {} as App;
    adminAuth = {} as Auth;
    adminDb = {} as Firestore;
  } else {
    throw error;
  }
}

// Helper function to get server timestamp
export const getFirestoreTimestamp = () => {
  try {
    return Timestamp.now();
  } catch (error) {
    // Fallback for build time
    return { seconds: Date.now() / 1000, nanoseconds: 0 } as any;
  }
};

export { adminApp, adminAuth, adminDb };