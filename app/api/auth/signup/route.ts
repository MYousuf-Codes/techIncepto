// Student signup API endpoint - creates Firebase Auth user and Firestore user document
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { adminAuth, adminDb, getFirestoreTimestamp } from '@/lib/firebaseAdmin';
import { User } from '@/lib/firestore';

const signupSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  username: z.string().min(3, 'Username must be at least 3 characters').max(30).regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().optional()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = signupSchema.parse(body);

    // Check if username is already taken
    const usernameQuery = await adminDb
      .collection('users')
      .where('username', '==', validatedData.username)
      .limit(1)
      .get();

    if (!usernameQuery.empty) {
      return NextResponse.json(
        { success: false, error: 'Username is already taken' },
        { status: 400 }
      );
    }

    // Check if email is already registered
    try {
      await adminAuth.getUserByEmail(validatedData.email);
      return NextResponse.json(
        { success: false, error: 'Email is already registered' },
        { status: 400 }
      );
    } catch (error) {
      // User doesn't exist, which is what we want
    }

    // Create Firebase Auth user
    const userRecord = await adminAuth.createUser({
      email: validatedData.email,
      password: validatedData.password,
      displayName: `${validatedData.firstName} ${validatedData.lastName}`,
      emailVerified: false
    });

    // Create Firestore user document
    const timestamp = getFirestoreTimestamp();
    const userData: Omit<User, 'id'> = {
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      username: validatedData.username,
      email: validatedData.email,
      phone: validatedData.phone,
      enrolledCourses: [],
      completedCourses: [],
      role: 'student',
      createdAt: timestamp,
      updatedAt: timestamp,
      lastActive: timestamp
    };

    await adminDb.collection('users').doc(userRecord.uid).set(userData);

    // Send email verification
    const emailVerificationLink = await adminAuth.generateEmailVerificationLink(validatedData.email);
    
    // In a real app, you would send this email via your email service
    console.log('Email verification link:', emailVerificationLink);

    return NextResponse.json({
      success: true,
      data: {
        uid: userRecord.uid,
        email: validatedData.email,
        message: 'Account created successfully. Please check your email for verification link.'
      }
    });

  } catch (error) {
    console.error('Signup error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message.includes('auth/email-already-exists')) {
      return NextResponse.json(
        { success: false, error: 'Email is already registered' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}