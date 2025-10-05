// Admin detailed user profile API endpoint - GET specific user details (admin only)
import { NextRequest, NextResponse } from 'next/server';
import { getUserById, getEnrolledCoursesForUser } from '@/lib/firestore';
import { verifyAdminCookie } from '@/lib/auth/admin';
import { adminDb } from '@/lib/firebaseAdmin';

// GET detailed user profile - admin only
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const adminPayload = verifyAdminCookie(request);
    
    if (!adminPayload) {
      return NextResponse.json(
        { success: false, error: 'Admin authentication required' },
        { status: 401 }
      );
    }

    const userId = params.id;
    
    // Get user details
    const user = await getUserById(userId);
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Get enrolled courses with full details
    const enrolledCourses = await getEnrolledCoursesForUser(userId);
    
    // Get completed courses with full details
    const completedCourses = [];
    for (const courseId of user.completedCourses) {
      const courseDoc = await adminDb.collection('courses').doc(courseId).get();
      if (courseDoc.exists) {
        completedCourses.push({ id: courseDoc.id, ...courseDoc.data() });
      }
    }

    // Get activity logs (if you implement activity logging)
    // For now, we'll create mock activity data
    const activityLogs = [
      {
        id: '1',
        type: 'login',
        description: 'User logged in',
        timestamp: user.lastActive,
        metadata: {}
      },
      {
        id: '2',
        type: 'course_access',
        description: 'Accessed course materials',
        timestamp: user.lastActive,
        metadata: { courseId: enrolledCourses[0]?.id || null }
      }
    ];

    // Calculate learning statistics
    const stats = {
      totalLearningHours: enrolledCourses.length * 10, // Mock calculation
      averageProgress: enrolledCourses.length > 0 ? 75 : 0, // Mock calculation
      streakDays: 7, // Mock data
      lastActivityDays: Math.floor((Date.now() - user.lastActive.toMillis()) / (1000 * 60 * 60 * 24))
    };

    const userProfile = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      phone: user.phone,
      photoURL: user.photoURL,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      lastActive: user.lastActive,
      enrolledCourses,
      completedCourses,
      activityLogs,
      stats
    };

    return NextResponse.json({
      success: true,
      data: userProfile
    });

  } catch (error) {
    console.error('Get user profile error:', error);
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}