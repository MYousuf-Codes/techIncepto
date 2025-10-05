"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  GraduationCap, 
  PlayCircle, 
  Calendar,
  Clock, 
  User,
  BookOpen,
  CheckCircle,
  AlertCircle,
  Trophy,
  Download,
  MessageCircle,
  Star
} from 'lucide-react';

// Mock enrolled courses data
const enrolledCourses = [
  {
    id: 2,
    title: "Digital Marketing & Social Media",
    instructor: "Sarah Khan",
    progress: 75,
    enrollmentDate: new Date('2024-08-15'),
    expectedCompletion: new Date('2024-10-15'),
    status: 'active' as const,
    currentLesson: {
      title: 'Facebook Ads Campaign Optimization',
      duration: '45 min',
      type: 'video'
    },
    totalLessons: 24,
    completedLessons: 18,
    totalDuration: '20 hours',
    completedDuration: '15 hours',
    assignments: {
      total: 6,
      completed: 4,
      pending: 2
    },
    grade: 85,
    certificate: null,
    nextLive: new Date('2024-10-04T15:00:00'),
    description: "Master digital marketing strategies and social media advertising",
    skills: ["Facebook Ads", "Instagram Marketing", "SEO", "Email Marketing"],
    recentActivity: [
      {
        type: 'lesson_completed',
        title: 'Instagram Story Ads Setup',
        date: new Date('2024-10-02T14:30:00')
      },
      {
        type: 'assignment_submitted',
        title: 'Social Media Strategy Plan',
        date: new Date('2024-10-01T16:45:00')
      }
    ]
  },
  {
    id: 4,
    title: "Graphic Designing",
    instructor: "Fatima Sheikh",
    progress: 45,
    enrollmentDate: new Date('2024-09-01'),
    expectedCompletion: new Date('2024-11-15'),
    status: 'active' as const,
    currentLesson: {
      title: 'Advanced Photoshop Techniques',
      duration: '60 min',
      type: 'video'
    },
    totalLessons: 30,
    completedLessons: 13,
    totalDuration: '25 hours',
    completedDuration: '11 hours',
    assignments: {
      total: 8,
      completed: 3,
      pending: 5
    },
    grade: 78,
    certificate: null,
    nextLive: new Date('2024-10-06T14:00:00'),
    description: "Create stunning graphics and master design principles",
    skills: ["Photoshop", "Illustrator", "Logo Design", "Color Theory"],
    recentActivity: [
      {
        type: 'lesson_started',
        title: 'Typography Fundamentals',
        date: new Date('2024-10-01T10:00:00')
      }
    ]
  },
  {
    id: 5,
    title: "Web Development",
    instructor: "Ali Raza",
    progress: 90,
    enrollmentDate: new Date('2024-07-01'),
    expectedCompletion: new Date('2024-10-01'),
    status: 'nearly_complete' as const,
    currentLesson: {
      title: 'Final Project Review',
      duration: '30 min',
      type: 'assignment'
    },
    totalLessons: 40,
    completedLessons: 36,
    totalDuration: '35 hours',
    completedDuration: '31.5 hours',
    assignments: {
      total: 10,
      completed: 9,
      pending: 1
    },
    grade: 92,
    certificate: null,
    nextLive: new Date('2024-10-05T16:00:00'),
    description: "Build modern, responsive websites with latest technologies",
    skills: ["HTML5", "CSS3", "JavaScript", "React", "Node.js"],
    recentActivity: [
      {
        type: 'assignment_graded',
        title: 'E-commerce Website Project',
        date: new Date('2024-10-02T09:00:00')
      }
    ]
  },
  {
    id: 1,
    title: "MS Office Mastery",
    instructor: "Ahmed Ali",
    progress: 100,
    enrollmentDate: new Date('2024-06-01'),
    expectedCompletion: new Date('2024-08-01'),
    status: 'completed' as const,
    currentLesson: null,
    totalLessons: 20,
    completedLessons: 20,
    totalDuration: '15 hours',
    completedDuration: '15 hours',
    assignments: {
      total: 5,
      completed: 5,
      pending: 0
    },
    grade: 88,
    certificate: 'MS_Office_Certificate_JohnDoe_2024.pdf',
    nextLive: null,
    description: "Master Microsoft Office suite for professional productivity",
    skills: ["Word", "Excel", "PowerPoint", "Outlook"],
    recentActivity: [
      {
        type: 'course_completed',
        title: 'Course Completed Successfully',
        date: new Date('2024-08-01T12:00:00')
      }
    ]
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-blue-100 text-blue-800';
    case 'nearly_complete':
      return 'bg-orange-100 text-orange-800';
    case 'completed':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'active':
      return 'In Progress';
    case 'nearly_complete':
      return 'Nearly Complete';
    case 'completed':
      return 'Completed';
    default:
      return 'Unknown';
  }
};

export default function EnrolledCoursesPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredCourses = enrolledCourses.filter(course => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'active') return course.status === 'active';
    if (selectedFilter === 'completed') return course.status === 'completed';
    if (selectedFilter === 'nearly_complete') return course.status === 'nearly_complete';
    return true;
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatUpcomingDate = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) return `Today at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    if (diffInHours < 48) return `Tomorrow at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <GraduationCap className="mr-3 h-8 w-8 text-[#ff4a03]" />
            My Courses
          </h1>
          <p className="text-gray-600 mt-2">
            Track your learning progress and continue your journey
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={selectedFilter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedFilter('all')}
          className={selectedFilter === 'all' ? 'bg-[#ff4a03] hover:bg-[#e63e02]' : ''}
        >
          All Courses ({enrolledCourses.length})
        </Button>
        <Button
          variant={selectedFilter === 'active' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedFilter('active')}
          className={selectedFilter === 'active' ? 'bg-[#ff4a03] hover:bg-[#e63e02]' : ''}
        >
          Active ({enrolledCourses.filter(c => c.status === 'active').length})
        </Button>
        <Button
          variant={selectedFilter === 'nearly_complete' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedFilter('nearly_complete')}
          className={selectedFilter === 'nearly_complete' ? 'bg-[#ff4a03] hover:bg-[#e63e02]' : ''}
        >
          Nearly Complete ({enrolledCourses.filter(c => c.status === 'nearly_complete').length})
        </Button>
        <Button
          variant={selectedFilter === 'completed' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedFilter('completed')}
          className={selectedFilter === 'completed' ? 'bg-[#ff4a03] hover:bg-[#e63e02]' : ''}
        >
          Completed ({enrolledCourses.filter(c => c.status === 'completed').length})
        </Button>
      </div>

      {/* Course Cards */}
      <div className="space-y-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getStatusColor(course.status)}`}
                    >
                      {getStatusText(course.status)}
                    </Badge>
                    {course.grade >= 90 && (
                      <Badge variant="outline" className="text-xs bg-yellow-100 text-yellow-800">
                        <Star className="h-3 w-3 mr-1" />
                        Excellent
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 space-x-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {course.instructor}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Enrolled: {formatDate(course.enrollmentDate)}
                    </div>
                    {course.grade && (
                      <div className="flex items-center">
                        <Trophy className="h-4 w-4 mr-1" />
                        Grade: {course.grade}%
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 lg:mt-0 flex gap-2">
                  {course.status === 'completed' && course.certificate ? (
                    <Button size="sm" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                      <Download className="mr-2 h-4 w-4" />
                      Certificate
                    </Button>
                  ) : (
                    <Button size="sm" className="bg-[#ff4a03] hover:bg-[#e63e02] text-white">
                      <PlayCircle className="mr-2 h-4 w-4" />
                      {course.status === 'completed' ? 'Review' : 'Continue'}
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Discuss
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Progress Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-gray-600">{course.progress}% Complete</span>
                </div>
                <Progress value={course.progress} className="mb-3" />
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
                    <span>{course.completedLessons}/{course.totalLessons} Lessons</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-purple-600" />
                    <span>{course.completedDuration}/{course.totalDuration}</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                    <span>{course.assignments.completed}/{course.assignments.total} Assignments</span>
                  </div>
                  {course.assignments.pending > 0 && (
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2 text-orange-600" />
                      <span>{course.assignments.pending} Pending</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Current Lesson or Next Live Session */}
              {course.status !== 'completed' && (
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      {course.currentLesson ? (
                        <>
                          <h4 className="font-semibold text-gray-900 mb-1">Continue Learning</h4>
                          <p className="text-sm text-gray-600 mb-2">{course.currentLesson.title}</p>
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="h-3 w-3 mr-1" />
                            {course.currentLesson.duration}
                          </div>
                        </>
                      ) : (
                        <>
                          <h4 className="font-semibold text-gray-900 mb-1">Course Completed!</h4>
                          <p className="text-sm text-gray-600">Great job completing this course.</p>
                        </>
                      )}
                    </div>
                    
                    {course.nextLive && (
                      <div className="mt-3 lg:mt-0 lg:ml-4">
                        <div className="text-xs text-gray-500 mb-1">Next Live Session</div>
                        <div className="text-sm font-medium text-blue-600">
                          {formatUpcomingDate(course.nextLive)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Skills and Description */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Skills You're Learning</h4>
                  <div className="flex flex-wrap gap-2">
                    {course.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Course Description</h4>
                  <p className="text-sm text-gray-600">{course.description}</p>
                </div>
              </div>

              {/* Recent Activity */}
              {course.recentActivity.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Recent Activity</h4>
                  <div className="space-y-2">
                    {course.recentActivity.slice(0, 2).map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 text-sm">
                        <div className="w-2 h-2 bg-[#ff4a03] rounded-full"></div>
                        <span className="text-gray-900">{activity.title}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-500">{formatDate(activity.date)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-[#ff4a03]">
            {enrolledCourses.length}
          </div>
          <div className="text-sm text-gray-600">Total Enrolled</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {enrolledCourses.filter(c => c.status === 'active').length}
          </div>
          <div className="text-sm text-gray-600">In Progress</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {enrolledCourses.filter(c => c.status === 'completed').length}
          </div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            {Math.round(enrolledCourses.reduce((acc, course) => acc + course.progress, 0) / enrolledCourses.length)}%
          </div>
          <div className="text-sm text-gray-600">Avg Progress</div>
        </div>
      </div>
    </div>
  );
}