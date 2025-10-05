'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen, Star, DollarSign } from 'lucide-react';

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

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/courses');
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }
      const result = await response.json();
      if (result.success) {
        setCourses(result.data);
      } else {
        throw new Error(result.error || 'Failed to load courses');
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError(err instanceof Error ? err.message : 'Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handleCourseClick = (courseId: string) => {
    router.push(`/courses/${courseId}`);
  };

  const handleEnrollClick = (courseId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      router.push('/signup');
      return;
    }
    router.push(`/courses/${courseId}?enroll=true`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-6 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Error Loading Courses</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={fetchCourses}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Explore Our Courses
        </h1>
        <p className="text-xl text-gray-600">
          Discover our comprehensive collection of courses designed to help you learn and grow.
        </p>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-24 w-24 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Courses Available</h2>
          <p className="text-gray-600">Check back soon for new courses!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card 
              key={course.id} 
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => handleCourseClick(course.id)}
            >
              <div className="relative">
                <img
                  src={course.thumbnailURL || '/placeholder-course.jpg'}
                  alt={course.title}
                  className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-course.jpg';
                  }}
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-900">
                    <DollarSign className="h-3 w-3 mr-1" />
                    {course.price === 0 ? 'Free' : `$${course.price}`}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {course.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {course.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{course.courseIncludes?.length || 0} modules</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>4.8</span>
                    </div>
                  </div>
                  
                  {course.courseIncludes && course.courseIncludes.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Course Includes:</p>
                      <div className="flex flex-wrap gap-1">
                        {course.courseIncludes.slice(0, 3).map((item, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                        {course.courseIncludes.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{course.courseIncludes.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={(e) => handleEnrollClick(course.id, e)}
                  variant={user ? "default" : "outline"}
                >
                  {user ? 'Enroll Now' : 'Sign Up to Enroll'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}