// Update user last active timestamp API endpoint - POST (authenticated user only)
import { NextRequest, NextResponse } from 'next/server';
import { getAuthorizationToken } from '@/lib/auth/admin';
import { adminAuth } from '@/lib/firebaseAdmin';
import { updateUserLastActive } from '@/lib/firestore';

export async function POST(request: NextRequest) {
  try {
    // Get authorization token from request
    const token = getAuthorizationToken(request);
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Authorization header required' },
        { status: 401 }
      );
    }

    // Verify Firebase token
    const decodedToken = await adminAuth.verifyIdToken(token);
    const userId = decodedToken.uid;

    // Update user's last active timestamp
    await updateUserLastActive(userId);

    return NextResponse.json({
      success: true,
      message: 'User activity updated successfully'
    });

  } catch (error) {
    console.error('Update user activity error:', error);

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