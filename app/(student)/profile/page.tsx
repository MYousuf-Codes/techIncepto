"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  GraduationCap,
  Award,
  Clock,
  BookOpen,
  Star,
  Edit,
  Download,
  Share2,
  Trophy,
  Target,
  TrendingUp
} from 'lucide-react';

// Mock student profile data
const studentProfile = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+92 300 1234567",
  location: "Karachi, Pakistan",
  avatar: "/api/placeholder/150/150",
  joinDate: new Date('2024-06-01'),
  bio: "Passionate learner focused on developing digital marketing and web development skills. Currently working as a freelancer while expanding my expertise through TECHINCEPTO courses.",
  interests: ["Digital Marketing", "Web Development", "Graphic Design", "Freelancing"],
  
  // Academic Info
  stats: {
    totalCourses: 4,
    completedCourses: 1,
    activeCourses: 3,
    totalLearningHours: 156,
    certificatesEarned: 1,
    averageGrade: 85,
    currentStreak: 12, // days
    longestStreak: 28
  },
  
  // Recent Achievements
  achievements: [
    {
      id: 1,
      title: "Course Completion Master",
      description: "Completed your first course",
      icon: GraduationCap,
      date: new Date('2024-08-01'),
      category: "milestone"
    },
    {
      id: 2,
      title: "Consistent Learner",
      description: "Maintained a 12-day learning streak",
      icon: Target,
      date: new Date('2024-10-02'),
      category: "streak"
    },
    {
      id: 3,
      title: "High Achiever",
      description: "Scored above 85% in all assignments",
      icon: Star,
      date: new Date('2024-09-15'),
      category: "performance"
    }
  ],
  
  // Skills Progress
  skills: [
    { name: "Digital Marketing", level: 75, courses: 1 },
    { name: "Web Development", level: 60, courses: 1 },
    { name: "Graphic Design", level: 45, courses: 1 },
    { name: "MS Office", level: 90, courses: 1 },
    { name: "Social Media Marketing", level: 70, courses: 1 }
  ],
  
  // Recent Activity
  recentActivity: [
    {
      type: "lesson_completed",
      title: "Completed Facebook Ads Campaign Setup",
      course: "Digital Marketing",
      date: new Date('2024-10-02T14:30:00')
    },
    {
      type: "assignment_submitted",
      title: "Submitted Social Media Strategy Assignment",
      course: "Digital Marketing",
      date: new Date('2024-10-01T16:45:00')
    },
    {
      type: "course_started",
      title: "Started Advanced Photoshop Techniques",
      course: "Graphic Design",
      date: new Date('2024-10-01T10:00:00')
    }
  ],
  
  // Certificates
  certificates: [
    {
      id: 1,
      courseName: "MS Office Mastery",
      issueDate: new Date('2024-08-01'),
      grade: 88,
      credentialId: "TECH-MS-2024-001",
      fileName: "MS_Office_Certificate_JohnDoe_2024.pdf"
    }
  ]
};

export default function ProfilePage() {
  const formatJoinDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatActivityDate = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const getAchievementIcon = (category: string) => {
    switch (category) {
      case 'milestone':
        return Trophy;
      case 'streak':
        return Target;
      case 'performance':
        return Star;
      default:
        return Award;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <User className="mr-3 h-8 w-8 text-[#ff4a03]" />
            Profile
          </h1>
          <p className="text-gray-600 mt-2">
            View and manage your learning profile
          </p>
        </div>
        <Button className="mt-4 lg:mt-0 bg-[#ff4a03] hover:bg-[#e63e02] text-white">
          <Edit className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Basic Info Card */}
          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={studentProfile.avatar} alt="Profile" />
                  <AvatarFallback className="bg-[#ff4a03] text-white text-2xl">
                    {studentProfile.firstName[0]}{studentProfile.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {studentProfile.firstName} {studentProfile.lastName}
                </h2>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-center">
                    <Mail className="h-4 w-4 mr-2" />
                    {studentProfile.email}
                  </div>
                  <div className="flex items-center justify-center">
                    <Phone className="h-4 w-4 mr-2" />
                    {studentProfile.phone}
                  </div>
                  <div className="flex items-center justify-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {studentProfile.location}
                  </div>
                  <div className="flex items-center justify-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Joined {formatJoinDate(studentProfile.joinDate)}
                  </div>
                </div>
                
                {studentProfile.bio && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg text-left">
                    <p className="text-sm text-gray-700">{studentProfile.bio}</p>
                  </div>
                )}
                
                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Learning Stats */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Learning Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#ff4a03]">
                    {studentProfile.stats.totalCourses}
                  </div>
                  <div className="text-xs text-gray-600">Total Courses</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {studentProfile.stats.completedCourses}
                  </div>
                  <div className="text-xs text-gray-600">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {studentProfile.stats.totalLearningHours}
                  </div>
                  <div className="text-xs text-gray-600">Learning Hours</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {studentProfile.stats.averageGrade}%
                  </div>
                  <div className="text-xs text-gray-600">Avg Grade</div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Current Streak</span>
                  <span className="text-sm font-semibold">{studentProfile.stats.currentStreak} days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Longest Streak</span>
                  <span className="text-sm font-semibold">{studentProfile.stats.longestStreak} days</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interests */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Interests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {studentProfile.interests.map((interest, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {interest}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Skills Progress */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Skills Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {studentProfile.skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{skill.level}%</span>
                      <Badge variant="outline" className="text-xs">
                        {skill.courses} course{skill.courses > 1 ? 's' : ''}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentProfile.achievements.map((achievement) => {
                  const IconComponent = getAchievementIcon(achievement.category);
                  return (
                    <div key={achievement.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="p-2 rounded-full bg-yellow-100">
                        <IconComponent className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {formatJoinDate(achievement.date)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Certificates */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <GraduationCap className="mr-2 h-5 w-5" />
                Certificates
              </CardTitle>
            </CardHeader>
            <CardContent>
              {studentProfile.certificates.length === 0 ? (
                <div className="text-center py-8">
                  <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No certificates yet</h3>
                  <p className="text-gray-600">Complete courses to earn certificates</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {studentProfile.certificates.map((cert) => (
                    <div key={cert.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#ff4a03] transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{cert.courseName}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <span>Grade: {cert.grade}%</span>
                            <span>•</span>
                            <span>Issued: {formatJoinDate(cert.issueDate)}</span>
                            <span>•</span>
                            <span>ID: {cert.credentialId}</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="border-[#ff4a03] text-[#ff4a03] hover:bg-orange-50">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
                {studentProfile.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#ff4a03] rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-600">{activity.course}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatActivityDate(activity.date)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}