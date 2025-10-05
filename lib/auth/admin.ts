// Server-side admin authentication helpers for JWT cookie management
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export interface AdminPayload {
  adminId: string;
  role: 'admin';
  username: string;
}

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'default-build-secret';
const SESSION_MAX_AGE = parseInt(process.env.ADMIN_SESSION_MAX_AGE || '86400'); // 24 hours default

if (!process.env.ADMIN_JWT_SECRET && process.env.NODE_ENV !== 'development') {
  console.warn('ADMIN_JWT_SECRET environment variable is required for production');
}

export function createAdminToken(payload: AdminPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: SESSION_MAX_AGE,
    algorithm: 'HS256'
  });
}

export function verifyAdminToken(token: string): AdminPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] }) as AdminPayload;
    return decoded;
  } catch (error) {
    console.error('Error verifying admin token:', error);
    return null;
  }
}

export function createAdminSessionCookie(response: NextResponse, adminPayload: AdminPayload): void {
  const token = createAdminToken(adminPayload);
  
  response.cookies.set('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: SESSION_MAX_AGE,
    path: '/'
  });
}

export function clearAdminSessionCookie(response: NextResponse): void {
  response.cookies.set('admin_session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/'
  });
}

export function verifyAdminCookie(request: NextRequest): AdminPayload | null {
  try {
    const token = request.cookies.get('admin_session')?.value;
    
    if (!token) {
      return null;
    }
    
    return verifyAdminToken(token);
  } catch (error) {
    console.error('Error verifying admin cookie:', error);
    return null;
  }
}

export function getAuthorizationToken(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  return authHeader.substring(7); // Remove 'Bearer ' prefix
}