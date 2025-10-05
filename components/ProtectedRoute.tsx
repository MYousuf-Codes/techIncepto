"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireRole?: 'student' | 'admin';
  redirectTo?: string;
}

export function ProtectedRoute({ 
  children, 
  requireRole = 'student', 
  redirectTo = '/login' 
}: ProtectedRouteProps) {
  const { firebaseUser, user, loading, error } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // Not authenticated
      if (!firebaseUser) {
        router.push(redirectTo);
        return;
      }

      // Email not verified
      if (!firebaseUser.emailVerified) {
        router.push('/login');
        return;
      }

      // User data not loaded or wrong role
      if (!user || user.role !== requireRole) {
        if (!user) {
          // User data not found, might be a data issue
          console.error('User data not found for authenticated user');
        }
        return; // Don't redirect immediately, show error instead
      }
    }
  }, [firebaseUser, user, loading, router, redirectTo, requireRole]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#ff4a03] mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!firebaseUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#ff4a03] mx-auto mb-4" />
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // Email not verified
  if (!firebaseUser.emailVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#ff4a03] mx-auto mb-4" />
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // Error or wrong role
  if (error || !user || user.role !== requireRole) {
    const errorMessage = error || 
      (!user ? 'User profile not found' : `Access denied. ${requireRole} role required.`);

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-600">Access Error</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {errorMessage}
              </AlertDescription>
            </Alert>
            <div className="space-y-2">
              <Button asChild className="w-full">
                <Link href="/login">Back to Login</Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href="/">Go Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // All checks passed, render children
  return <>{children}</>;
}