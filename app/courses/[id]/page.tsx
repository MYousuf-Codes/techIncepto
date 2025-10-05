'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  CheckCircle, 
  ArrowLeft,
  Play,
  Download,
  Globe,
  Award
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  courseIncludes: string[];
  price: number;
  thumbnailURL: string;
  createdAt: any;
  updatedAt: any;
}

interface User {
  uid: string;
  email: string;
  displayName?: string;
}

export default function CourseDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [enrollmentStatus, setEnrollmentStatus] = useState<'not-enrolled' | 'enrolled' | 'checking'>('checking');
  
  const courseId = params.id as string;
  const shouldAutoEnroll = searchParams.get('enroll') === 'true';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email!,
          displayName: firebaseUser.displayName || undefined
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  useEffect(() => {
    if (user && course && shouldAutoEnroll && enrollmentStatus === 'not-enrolled') {
      handleEnroll();
    }
  }, [user, course, shouldAutoEnroll, enrollmentStatus]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/courses/${courseId}`);
      if (!response.ok) {
        throw new Error('Course not found');
      }
      const result = await response.json();
      if (result.success) {
        setCourse(result.data);
        if (user) {
          checkEnrollmentStatus();
        }
      } else {
        throw new Error(result.error || 'Failed to load course');
      }
    } catch (err) {
      console.error('Error fetching course:', err);
      setError(err instanceof Error ? err.message : 'Failed to load course');
    } finally {
      setLoading(false);
    }
  };

  const checkEnrollmentStatus = async () => {
    if (!user || !courseId) return;
    
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) return;
      
      const response = await fetch(`/api/users/${user.uid}/enrollment/${courseId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const result = await response.json();
        setEnrollmentStatus(result.enrolled ? 'enrolled' : 'not-enrolled');
      } else {
        setEnrollmentStatus('not-enrolled');
      }
    } catch (err) {
      console.error('Error checking enrollment:', err);
      setEnrollmentStatus('not-enrolled');
    }
  };

  const handleEnroll = async () => {
    if (!user || !courseId) {
      router.push('/signup');
      return;
    }

    try {
      setEnrolling(true);
      
      // Get user's ID token
      const token = await auth.currentUser?.getIdToken();
      
      const response = await fetch(`/api/users/${user.uid}/enroll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ courseId })
      });

      const result = await response.json();
      
      if (result.success) {
        setEnrollmentStatus('enrolled');
        // Redirect to student dashboard or enrolled courses
        router.push('/dashboard');
      } else {
        throw new Error(result.error || 'Failed to enroll in course');
      }
    } catch (err) {
      console.error('Error enrolling in course:', err);
      setError(err instanceof Error ? err.message : 'Failed to enroll in course');
    } finally {
      setEnrolling(false);
    }
  };

  const handleGoBack = () => {
    router.push('/courses');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-24 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Skeleton className="h-64 w-full mb-6" />
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-3/4 mb-6" />
          </div>
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-12 w-full mb-4" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-2/3" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={handleGoBack} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Button>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The course you are looking for does not exist.'}</p>
          <Button onClick={handleGoBack}>Browse All Courses</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={handleGoBack} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Courses
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <img
              src={course.thumbnailURL || '/placeholder-course.jpg'}
              alt={course.title}
              className="w-full h-64 object-cover rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder-course.jpg';
              }}
            />
          </div>

          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{course.title}</h1>
            <p className="text-lg text-gray-700 leading-relaxed">{course.description}</p>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                <span>{course.courseIncludes?.length || 0} modules</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>Self-paced</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>All levels</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span>4.8 (120 reviews)</span>
              </div>
            </div>
          </div>

          {course.courseIncludes && course.courseIncludes.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What You'll Learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {course.courseIncludes.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardContent className="p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {course.price === 0 ? 'Free' : `$${course.price}`}
                  </span>
                  <Badge variant="secondary">
                    {course.price === 0 ? 'Free Course' : 'Premium'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">One-time payment, lifetime access</p>
              </div>

              {error && (
                <Alert className="mb-4" variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {!user ? (
                <div className="space-y-3">
                  <Button size="lg" className="w-full" onClick={() => router.push('/signup')}>
                    Sign Up to Enroll
                  </Button>
                  <Button variant="outline" size="lg" className="w-full" onClick={() => router.push('/login')}>
                    Already have an account? Sign In
                  </Button>
                </div>
              ) : enrollmentStatus === 'enrolled' ? (
                <div className="space-y-3">
                  <Button size="lg" className="w-full" onClick={() => router.push('/dashboard')}>
                    <Play className="h-4 w-4 mr-2" />
                    Continue Learning
                  </Button>
                  <p className="text-sm text-green-600 text-center font-medium">
                    ✓ You're enrolled in this course
                  </p>
                </div>
              ) : (
                <Button 
                  size="lg" 
                  className="w-full" 
                  onClick={handleEnroll}
                  disabled={enrolling}
                >
                  {enrolling ? 'Enrolling...' : 'Enroll Now'}
                </Button>
              )}

              <Separator className="my-6" />

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">This course includes:</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-3">
                    <Play className="h-4 w-4" />
                    <span>Video lectures</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Download className="h-4 w-4" />
                    <span>Downloadable resources</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4" />
                    <span>Lifetime access</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="h-4 w-4" />
                    <span>Certificate of completion</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}