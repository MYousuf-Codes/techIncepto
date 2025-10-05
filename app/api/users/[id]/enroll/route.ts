// User course enrollment API endpoint - POST enroll user in course
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { enrollUserInCourse, getCourseById, updateUserLastActive } from '@/lib/firestore';
import { getAuthorizationToken } from '@/lib/auth/admin';
import { adminAuth } from '@/lib/firebaseAdmin';

const enrollSchema = z.object({
  courseId: z.string().min(1, 'Course ID is required')
});

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
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

    // Parse request body
    const body = await request.json();
    const { courseId } = enrollSchema.parse(body);

    // Check if course exists
    const course = await getCourseById(courseId);
    if (!course) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      );
    }

    // Enroll user in course
    await enrollUserInCourse(params.id, courseId);

    // Update user last active timestamp
    await updateUserLastActive(params.id);

    return NextResponse.json({
      success: true,
      message: 'Successfully enrolled in course',
      course: {
        id: course.id,
        title: course.title,
        description: course.description
      }
    });

  } catch (error) {
    console.error('User enrollment error:', error);

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

    if (error && typeof error === 'object' && 'message' in error) {
      const messageError = error as { message: string };
      if (messageError.message === 'User not found') {
        return NextResponse.json(
          { success: false, error: 'User not found' },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}