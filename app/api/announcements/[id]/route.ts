// Individual announcement API endpoints - GET, PUT, DELETE (admin only for PUT/DELETE)
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { updateAnnouncement, deleteAnnouncement } from '@/lib/firestore';
import { verifyAdminCookie } from '@/lib/auth/admin';
import { adminDb } from '@/lib/firebaseAdmin';

const updateAnnouncementSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200).optional(),
  message: z.string().min(1, 'Message is required').max(2000).optional()
});

// GET single announcement
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const announcementDoc = await adminDb.collection('announcements').doc(params.id).get();
    
    if (!announcementDoc.exists) {
      return NextResponse.json(
        { success: false, error: 'Announcement not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { id: announcementDoc.id, ...announcementDoc.data() }
    });

  } catch (error) {
    console.error('Get announcement error:', error);
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT update announcement - admin only
export async function PUT(
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

    const body = await request.json();
    const updateData = updateAnnouncementSchema.parse(body);

    // Check if announcement exists
    const announcementDoc = await adminDb.collection('announcements').doc(params.id).get();
    
    if (!announcementDoc.exists) {
      return NextResponse.json(
        { success: false, error: 'Announcement not found' },
        { status: 404 }
      );
    }

    await updateAnnouncement(params.id, updateData);

    return NextResponse.json({
      success: true,
      message: 'Announcement updated successfully'
    });

  } catch (error) {
    console.error('Update announcement error:', error);

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

// DELETE announcement - admin only
export async function DELETE(
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

    // Check if announcement exists
    const announcementDoc = await adminDb.collection('announcements').doc(params.id).get();
    
    if (!announcementDoc.exists) {
      return NextResponse.json(
        { success: false, error: 'Announcement not found' },
        { status: 404 }
      );
    }

    await deleteAnnouncement(params.id);

    return NextResponse.json({
      success: true,
      message: 'Announcement deleted successfully'
    });

  } catch (error) {
    console.error('Delete announcement error:', error);
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}