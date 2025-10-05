// Admin logout API endpoint - clears session cookie
import { NextResponse } from 'next/server';
import { clearAdminSessionCookie } from '@/lib/auth/admin';

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    });

    clearAdminSessionCookie(response);
    
    return response;
  } catch (error) {
    console.error('Admin logout error:', error);
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}