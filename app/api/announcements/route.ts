// Announcements API endpoints - GET (all users) and POST (admin only)
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getAnnouncements, createAnnouncement } from '@/lib/firestore';
import { verifyAdminCookie } from '@/lib/auth/admin';

const createAnnouncementSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  message: z.string().min(1, 'Message is required').max(2000)
});

// GET announcements - accessible to all authenticated users
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam) : 20;

    const announcements = await getAnnouncements(limit);

    return NextResponse.json({
      success: true,
      data: announcements
    });

  } catch (error) {
    console.error('Get announcements error:', error);
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST announcement - admin only
export async function POST(request: NextRequest) {
  try {
    const adminPayload = verifyAdminCookie(request);
    
    if (!adminPayload) {
      return NextResponse.json(
        { success: false, error: 'Admin authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, message } = createAnnouncementSchema.parse(body);

    const announcementId = await createAnnouncement(adminPayload.adminId, {
      title,
      message
    });

    return NextResponse.json({
      success: true,
      data: {
        id: announcementId,
        message: 'Announcement created successfully'
      }
    });

  } catch (error) {
    console.error('Create announcement error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}