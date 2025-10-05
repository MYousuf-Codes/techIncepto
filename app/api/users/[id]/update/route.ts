// User profile update API endpoint - POST update user profile (user only)
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { updateUserProfile, getUserById } from '@/lib/firestore';
import { getAuthorizationToken } from '@/lib/auth/admin';
import { adminAuth } from '@/lib/firebaseAdmin';

const updateProfileSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50).optional(),
  lastName: z.string().min(1, 'Last name is required').max(50).optional(),
  phone: z.string().optional(),
  photoURL: z.string().url().optional().or(z.literal(''))
});

// POST update user profile - authenticated user only (for their own profile)
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify student authentication via Firebase ID token
    const idToken = getAuthorizationToken(request);
    
    if (!idToken) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Verify the Firebase ID token
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const authenticatedUserId = decodedToken.uid;

    // Check if user is trying to update their own profile (security check)
    const targetUserId = params.id;
    if (authenticatedUserId !== targetUserId) {
      return NextResponse.json(
        { success: false, error: 'You can only update your own profile' },
        { status: 403 }
      );
    }

    // Check if user exists
    const existingUser = await getUserById(targetUserId);
    if (!existingUser) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const updateData = updateProfileSchema.parse(body);

    // Remove undefined values
    const filteredUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    if (Object.keys(filteredUpdateData).length === 0) {
      return NextResponse.json(
        { success: false, error: 'No valid update data provided' },
        { status: 400 }
      );
    }

    // Update user profile
    await updateUserProfile(targetUserId, filteredUpdateData);

    // Also update Firebase Auth display name if first/last name changed
    if (updateData.firstName || updateData.lastName) {
      const updatedUser = await getUserById(targetUserId);
      if (updatedUser) {
        await adminAuth.updateUser(targetUserId, {
          displayName: `${updatedUser.firstName} ${updatedUser.lastName}`
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully'
    });

  } catch (error) {
    console.error('Update user profile error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    if (error && typeof error === 'object' && 'code' in error) {
      const firebaseError = error as { code: string };
      if (firebaseError.code === 'auth/id-token-expired' || firebaseError.code === 'auth/id-token-revoked') {
        return NextResponse.json(
          { success: false, error: 'Authentication token expired' },
          { status: 401 }
        );
      }
    }

    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}