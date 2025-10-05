// Announcement reactions API endpoint - POST reaction (student only)
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { addReaction } from '@/lib/firestore';
import { getAuthorizationToken } from '@/lib/auth/admin';
import { adminAuth, adminDb } from '@/lib/firebaseAdmin';

const reactionSchema = z.object({
  emoji: z.string().min(1, 'Emoji is required').max(10)
});

// POST reaction - authenticated students only
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
    const userId = decodedToken.uid;

    // Verify user is a student (not admin)
    const userDoc = await adminAuth.getUser(userId);
    if (!userDoc) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { emoji } = reactionSchema.parse(body);

    // Check if announcement exists
    const announcementDoc = await adminDb.collection('announcements').doc(params.id).get();
    
    if (!announcementDoc.exists) {
      return NextResponse.json(
        { success: false, error: 'Announcement not found' },
        { status: 404 }
      );
    }

    await addReaction(params.id, userId, emoji);

    return NextResponse.json({
      success: true,
      message: 'Reaction added successfully'
    });

  } catch (error) {
    console.error('Add reaction error:', error);

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