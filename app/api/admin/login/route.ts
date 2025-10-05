// Admin login API endpoint - validates credentials and creates session cookie
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { getAdminByUsername, getAdminByEmail } from '@/lib/firestore';
import { createAdminSessionCookie, AdminPayload } from '@/lib/auth/admin';

const loginSchema = z.object({
  usernameOrEmail: z.string().min(1, 'Username or email is required'),
  password: z.string().min(1, 'Password is required')
});

// Rate limiting (simple in-memory store - use Redis in production)
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes

function isRateLimited(identifier: string): boolean {
  const attempts = loginAttempts.get(identifier);
  
  if (!attempts) {
    return false;
  }
  
  if (Date.now() - attempts.lastAttempt > LOCKOUT_TIME) {
    loginAttempts.delete(identifier);
    return false;
  }
  
  return attempts.count >= MAX_ATTEMPTS;
}

function recordLoginAttempt(identifier: string): void {
  const attempts = loginAttempts.get(identifier) || { count: 0, lastAttempt: 0 };
  attempts.count += 1;
  attempts.lastAttempt = Date.now();
  loginAttempts.set(identifier, attempts);
}

function clearLoginAttempts(identifier: string): void {
  loginAttempts.delete(identifier);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { usernameOrEmail, password } = loginSchema.parse(body);
    
    const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    const rateLimitKey = `${clientIP}:${usernameOrEmail}`;
    
    // Check rate limiting
    if (isRateLimited(rateLimitKey)) {
      return NextResponse.json(
        { success: false, error: 'Too many login attempts. Please try again later.' },
        { status: 429 }
      );
    }

    // Find admin by username or email
    let admin;
    if (usernameOrEmail.includes('@')) {
      admin = await getAdminByEmail(usernameOrEmail);
    } else {
      admin = await getAdminByUsername(usernameOrEmail);
    }

    if (!admin) {
      recordLoginAttempt(rateLimitKey);
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, admin.passwordHash);
    
    if (!isValidPassword) {
      recordLoginAttempt(rateLimitKey);
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Clear failed attempts on successful login
    clearLoginAttempts(rateLimitKey);

    // Create admin payload and session cookie
    const adminPayload: AdminPayload = {
      adminId: admin.adminId,
      role: 'admin',
      username: admin.username
    };

    const response = NextResponse.json({
      success: true,
      data: {
        adminId: admin.adminId,
        username: admin.username,
        admin_name: admin.admin_name,
        admin_email: admin.admin_email
      }
    });

    createAdminSessionCookie(response, adminPayload);

    return response;

  } catch (error) {
    console.error('Admin login error:', error);

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