// Admin session verification API endpoint - checks if admin is logged in
import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminCookie } from '@/lib/auth/admin';
import { getAdminByUsername } from '@/lib/firestore';

export async function GET(request: NextRequest) {
  try {
    const adminPayload = verifyAdminCookie(request);
    
    if (!adminPayload) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get admin details from database
    const admin = await getAdminByUsername(adminPayload.username);
    
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Admin not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        adminId: admin.adminId,
        username: admin.username,
        admin_name: admin.admin_name,
        admin_email: admin.admin_email
      }
    });

  } catch (error) {
    console.error('Admin session verification error:', error);
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}