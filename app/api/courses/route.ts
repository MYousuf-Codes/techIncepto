// Courses API endpoint - GET all courses (public access)
import { NextResponse } from 'next/server';
import { getCourses } from '@/lib/firestore';

export async function GET() {
  try {
    const courses = await getCourses();
    
    return NextResponse.json({
      success: true,
      data: courses
    });
  } catch (error) {
    console.error('Get courses error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}