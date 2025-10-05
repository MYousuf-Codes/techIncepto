"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Clock, 
  TrendingUp, 
  Award, 
  Calendar,
  PlayCircle,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// Mock data - replace with real API calls
const studentData = {
  name: "John Doe",
  enrolledCourses: 3,
  completedCourses: 1,
  totalLearningHours: 42,
  lastLogin: new Date('2024-10-02T10:30:00'),
  recentActivity: [
    {
      id: 1,
      type: 'course_completed',
      title: 'Completed MS Office Mastery',
      description: 'Congratulations! You have successfully completed the course.',
      timestamp: new Date('2024-10-01T14:30:00'),
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'assignment_due',
      title: 'Web Development Project Due Soon',
      description: 'Your final project is due in 2 days.',
      timestamp: new Date('2024-10-01T09:15:00'),
      icon: AlertCircle,
      color: 'text-amber-600'
    },
    {
      id: 3,
      type: 'new_lesson',
      title: 'New Lesson Available',
      description: 'JavaScript Fundamentals - Chapter 5 is now available.',
      timestamp: new Date('2024-09-30T16:45:00'),
      icon: PlayCircle,
      color: 'text-blue-600'
    }
  ],
  enrolledCoursesList: [
    {
      id: 1,
      title: 'Web Development',
      progress: 75,
      nextLesson: 'JavaScript Arrays and Objects',
      instructor: 'Ahmed Ali',
      dueDate: new Date('2024-10-05T23:59:00')
    },
    {
      id: 2,
      title: 'Digital Marketing & Social Media',
      progress: 45,
      nextLesson: 'Facebook Ads Campaign Setup',
      instructor: 'Sarah Khan',
      dueDate: new Date('2024-10-10T23:59:00')
    },
    {
      id: 3,
      title: 'Graphic Designing',
      progress: 20,
      nextLesson: 'Color Theory Basics',
      instructor: 'Hassan Ahmad',
      dueDate: new Date('2024-10-15T23:59:00')
    }
  ]
};

export default function DashboardPage() {
  const formatLastLogin = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  const formatActivityTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, <span className="text-[#ff4a03]">{studentData.name}</span>!
          </h1>
          <p className="text-gray-600 mt-2">
            Last login: {formatLastLogin(studentData.lastLogin)}
          </p>
        </div>
        <div className="mt-4 lg:mt-0">
          <Button className="bg-[#ff4a03] hover:bg-[#e63e02] text-white">
            <PlayCircle className="mr-2 h-4 w-4" />
            Continue Learning
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Enrolled Courses</p>
                <p className="text-3xl font-bold text-gray-900">{studentData.enrolledCourses}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-gray-900">{studentData.completedCourses}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Learning Hours</p>
                <p className="text-3xl font-bold text-gray-900">{studentData.totalLearningHours}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Progress</p>
                <p className="text-3xl font-bold text-gray-900">
                  {Math.round(studentData.enrolledCoursesList.reduce((acc, course) => acc + course.progress, 0) / studentData.enrolledCoursesList.length)}%
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-[#ff4a03]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Courses */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              Current Courses
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {studentData.enrolledCoursesList.map((course) => (
              <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#ff4a03] transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{course.title}</h3>
                  <Badge variant="outline" className="text-xs">
                    {course.progress}% Complete
                  </Badge>
                </div>
                
                <Progress value={course.progress} className="mb-3" />
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Next: {course.nextLesson}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Due: {course.dueDate.toLocaleDateString()}
                  </div>
                </div>
                
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="mt-3 w-full border-[#ff4a03] text-[#ff4a03] hover:bg-orange-50"
                >
                  Continue Learning
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studentData.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`p-2 rounded-full bg-gray-100 ${activity.color}`}>
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {formatActivityTime(activity.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <BookOpen className="h-6 w-6" />
              <span>Browse Courses</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Calendar className="h-6 w-6" />
              <span>View Schedule</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Award className="h-6 w-6" />
              <span>View Certificates</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}