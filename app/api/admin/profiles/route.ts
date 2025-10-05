// Admin profiles list API endpoint - GET all users (admin only)
import { NextRequest, NextResponse } from 'next/server';
import { getAllUsers, User } from '@/lib/firestore';
import { verifyAdminCookie } from '@/lib/auth/admin';

// GET all users - admin only
export async function GET(request: NextRequest) {
  try {
    const adminPayload = verifyAdminCookie(request);
    
    if (!adminPayload) {
      return NextResponse.json(
        { success: false, error: 'Admin authentication required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const role = searchParams.get('role') || '';

    let users = await getAllUsers();

    // Filter by search term (username, email, or name)
    if (search) {
      const searchLower = search.toLowerCase();
      users = users.filter(user => 
        user.username.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchLower)
      );
    }

    // Filter by role
    if (role) {
      users = users.filter(user => user.role === role);
    }

    // Transform users data for admin view
    const usersData = users.map(user => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      phone: user.phone,
      role: user.role,
      enrolledCoursesCount: user.enrolledCourses.length,
      completedCoursesCount: user.completedCourses.length,
      createdAt: user.createdAt,
      lastActive: user.lastActive
    }));

    return NextResponse.json({
      success: true,
      data: {
        users: usersData,
        totalCount: usersData.length
      }
    });

  } catch (error) {
    console.error('Get users error:', error);
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}