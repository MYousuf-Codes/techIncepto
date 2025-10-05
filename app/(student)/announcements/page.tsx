"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Bell, 
  Search, 
  Calendar,
  AlertCircle,
  Info,
  CheckCircle,
  Star,
  Filter
} from 'lucide-react';
import { useState } from 'react';

// Mock announcements data
const announcements = [
  {
    id: 1,
    title: 'New Course Launch: Advanced React Development',
    content: 'We are excited to announce the launch of our new Advanced React Development course! This comprehensive program covers React 18 features, Next.js 13, TypeScript integration, and modern state management. Early bird discount of 20% available until October 15th.',
    type: 'course' as const,
    priority: 'high' as const,
    author: 'Admin Team',
    publishDate: new Date('2024-10-02T10:00:00'),
    readTime: '2 min read',
    tags: ['New Course', 'React', 'Development'],
    isRead: false,
    isPinned: true
  },
  {
    id: 2,
    title: 'System Maintenance Scheduled',
    content: 'Our learning platform will undergo scheduled maintenance on October 5th from 2:00 AM to 4:00 AM PST. During this time, you may experience brief interruptions in service. All course materials will remain accessible offline through our mobile app.',
    type: 'system' as const,
    priority: 'medium' as const,
    author: 'Technical Team',
    publishDate: new Date('2024-10-01T15:30:00'),
    readTime: '1 min read',
    tags: ['Maintenance', 'System'],
    isRead: true,
    isPinned: false
  },
  {
    id: 3,
    title: 'Assignment Deadline Extension',
    content: 'Due to the recent technical issues, we are extending the deadline for Web Development final projects by 3 days. The new deadline is October 8th, 11:59 PM. Please make sure to submit your work before the extended deadline.',
    type: 'assignment' as const,
    priority: 'high' as const,
    author: 'Ahmed Ali',
    publishDate: new Date('2024-09-30T14:20:00'),
    readTime: '1 min read',
    tags: ['Assignment', 'Deadline', 'Web Development'],
    isRead: false,
    isPinned: false
  },
  {
    id: 4,
    title: 'Welcome to TECHINCEPTO Student Portal',
    content: 'Welcome to your personalized learning hub! Here you can track your progress, access course materials, communicate with instructors, and manage your learning journey. Don\'t forget to complete your profile setup to get the most out of your experience.',
    type: 'general' as const,
    priority: 'low' as const,
    author: 'Admin Team',
    publishDate: new Date('2024-09-28T09:00:00'),
    readTime: '2 min read',
    tags: ['Welcome', 'Getting Started'],
    isRead: true,
    isPinned: false
  },
  {
    id: 5,
    title: 'Student Feedback Survey',
    content: 'Your feedback matters! Please take 5 minutes to complete our course satisfaction survey. Your responses help us improve our teaching methods and course content. Survey participants will receive a 10% discount on their next course enrollment.',
    type: 'survey' as const,
    priority: 'medium' as const,
    author: 'Student Success Team',
    publishDate: new Date('2024-09-27T11:45:00'),
    readTime: '1 min read',
    tags: ['Survey', 'Feedback', 'Discount'],
    isRead: false,
    isPinned: false
  }
];

const getAnnouncementIcon = (type: string) => {
  switch (type) {
    case 'course':
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    case 'system':
      return <AlertCircle className="h-5 w-5 text-amber-600" />;
    case 'assignment':
      return <Calendar className="h-5 w-5 text-blue-600" />;
    case 'survey':
      return <Star className="h-5 w-5 text-purple-600" />;
    default:
      return <Info className="h-5 w-5 text-gray-600" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function AnnouncementsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'unread' && !announcement.isRead) ||
                         (selectedFilter === 'pinned' && announcement.isPinned) ||
                         announcement.type === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Bell className="mr-3 h-8 w-8 text-[#ff4a03]" />
            Announcements
          </h1>
          <p className="text-gray-600 mt-2">
            Stay updated with the latest news and important information
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search announcements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={selectedFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('all')}
            className={selectedFilter === 'all' ? 'bg-[#ff4a03] hover:bg-[#e63e02]' : ''}
          >
            All
          </Button>
          <Button
            variant={selectedFilter === 'unread' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('unread')}
            className={selectedFilter === 'unread' ? 'bg-[#ff4a03] hover:bg-[#e63e02]' : ''}
          >
            Unread
          </Button>
          <Button
            variant={selectedFilter === 'pinned' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('pinned')}
            className={selectedFilter === 'pinned' ? 'bg-[#ff4a03] hover:bg-[#e63e02]' : ''}
          >
            Pinned
          </Button>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.length === 0 ? (
          <Card className="border-0 shadow-md">
            <CardContent className="text-center py-12">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No announcements found</h3>
              <p className="text-gray-600">
                {searchQuery ? 'Try adjusting your search terms or filters.' : 'Check back later for new updates.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredAnnouncements.map((announcement) => (
            <Card 
              key={announcement.id} 
              className={`border-0 shadow-md hover:shadow-lg transition-all duration-200 ${
                !announcement.isRead ? 'border-l-4 border-l-[#ff4a03]' : ''
              } ${announcement.isPinned ? 'ring-2 ring-[#ff4a03] ring-opacity-20' : ''}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getAnnouncementIcon(announcement.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <CardTitle className="text-lg">{announcement.title}</CardTitle>
                        {announcement.isPinned && (
                          <Badge variant="outline" className="text-xs bg-[#ff4a03] text-white border-[#ff4a03]">
                            Pinned
                          </Badge>
                        )}
                        {!announcement.isRead && (
                          <div className="w-2 h-2 bg-[#ff4a03] rounded-full"></div>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{announcement.author}</span>
                        <span>•</span>
                        <span>{formatDate(announcement.publishDate)}</span>
                        <span>•</span>
                        <span>{announcement.readTime}</span>
                      </div>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`text-xs capitalize ${getPriorityColor(announcement.priority)}`}
                  >
                    {announcement.priority}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {announcement.content}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {announcement.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  {!announcement.isRead && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-[#ff4a03] text-[#ff4a03] hover:bg-orange-50"
                    >
                      Mark as Read
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-[#ff4a03]">
            {announcements.length}
          </div>
          <div className="text-sm text-gray-600">Total Announcements</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-amber-600">
            {announcements.filter(a => !a.isRead).length}
          </div>
          <div className="text-sm text-gray-600">Unread</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {announcements.filter(a => a.isPinned).length}
          </div>
          <div className="text-sm text-gray-600">Pinned</div>
        </div>
      </div>
    </div>
  );
}