// User enrollment status API endpoint - GET check if user is enrolled in course
import { NextRequest, NextResponse } from 'next/server';
import { getUserById } from '@/lib/firestore';
import { getAuthorizationToken } from '@/lib/auth/admin';
import { adminAuth } from '@/lib/firebaseAdmin';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; courseId: string } }
) {
  try {
    // Verify authorization
    const token = getAuthorizationToken(request);
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Authorization header required' },
        { status: 401 }
      );
    }

    // Verify Firebase token
    const decodedToken = await adminAuth.verifyIdToken(token);
    
    // Verify user ID matches token
    if (decodedToken.uid !== params.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Get course ID from URL path
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/');
    const courseId = pathSegments[pathSegments.length - 1];

    // Get user data
    const user = await getUserById(params.id);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if user is enrolled in the course
    const isEnrolled = user.enrolledCourses.includes(courseId);

    return NextResponse.json({
      success: true,
      enrolled: isEnrolled,
      courseId: courseId,
      userId: params.id
    });

  } catch (error) {
    console.error('Check enrollment error:', error);

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