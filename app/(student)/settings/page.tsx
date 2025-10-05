"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Eye,
  Camera,
  Save,
  AlertTriangle,
  Smartphone,
  Mail,
  Globe,
  Lock,
  Trash2
} from 'lucide-react';

// Mock current settings data
const currentSettings = {
  profile: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+92 300 1234567",
    bio: "Passionate learner focused on developing digital marketing and web development skills. Currently working as a freelancer while expanding my expertise through TECHINCEPTO courses.",
    avatar: "/api/placeholder/150/150",
    location: "Karachi, Pakistan",
    website: "https://johndoe.portfolio.com",
    linkedin: "https://linkedin.com/in/johndoe"
  },
  notifications: {
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    courseUpdates: true,
    assignmentReminders: true,
    promotionalEmails: false,
    weeklyDigest: true,
    liveSessionReminders: true
  },
  privacy: {
    profileVisibility: 'public', // public, private, students-only
    showProgress: true,
    showCertificates: true,
    showContactInfo: false,
    allowMessages: true
  },
  security: {
    twoFactorEnabled: false,
    lastPasswordChange: new Date('2024-08-15'),
    activeSessions: 3
  }
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState(currentSettings.profile);
  const [notifications, setNotifications] = useState(currentSettings.notifications);
  const [privacy, setPrivacy] = useState(currentSettings.privacy);
  const [security, setSecurity] = useState(currentSettings.security);
  const [isLoading, setIsLoading] = useState(false);

  const handleProfileUpdate = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    // Show success message
    console.log('Profile updated successfully');
  };

  const handleNotificationUpdate = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    console.log('Notification preferences updated');
  };

  const handlePrivacyUpdate = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    console.log('Privacy settings updated');
  };

  const handlePasswordChange = () => {
    console.log('Password change requested');
  };

  const handleEnable2FA = () => {
    setSecurity(prev => ({ ...prev, twoFactorEnabled: !prev.twoFactorEnabled }));
    console.log('2FA toggled');
  };

  const handleDeleteAccount = () => {
    console.log('Account deletion requested');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Eye },
    { id: 'security', label: 'Security', icon: Shield }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Settings className="mr-3 h-8 w-8 text-[#ff4a03]" />
            Settings
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-md">
            <CardContent className="p-0">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-left text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-[#ff4a03] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="mr-3 h-5 w-5" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <p className="text-sm text-gray-600">Update your personal information and profile details.</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={profileData.avatar} alt="Profile" />
                    <AvatarFallback className="bg-[#ff4a03] text-white text-2xl">
                      {profileData.firstName[0]}{profileData.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button size="sm" variant="outline" className="mb-2">
                      <Camera className="mr-2 h-4 w-4" />
                      Change Photo
                    </Button>
                    <p className="text-xs text-gray-500">JPG, PNG up to 2MB</p>
                  </div>
                </div>

                <Separator />

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={profileData.website}
                      onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={profileData.linkedin}
                      onChange={(e) => setProfileData(prev => ({ ...prev, linkedin: e.target.value }))}
                    />
                  </div>
                </div>

                <Button onClick={handleProfileUpdate} disabled={isLoading} className="bg-[#ff4a03] hover:bg-[#e63e02]">
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <p className="text-sm text-gray-600">Choose how you want to be notified about updates and activities.</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium">Email Notifications</div>
                        <div className="text-sm text-gray-500">Receive notifications via email</div>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.emailNotifications}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, emailNotifications: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium">Push Notifications</div>
                        <div className="text-sm text-gray-500">Receive push notifications in browser</div>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.pushNotifications}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, pushNotifications: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium">SMS Notifications</div>
                        <div className="text-sm text-gray-500">Receive important updates via SMS</div>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.smsNotifications}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, smsNotifications: checked }))}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Course & Learning Notifications</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Course Updates</div>
                      <div className="text-sm text-gray-500">New lessons, materials, and announcements</div>
                    </div>
                    <Switch
                      checked={notifications.courseUpdates}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, courseUpdates: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Assignment Reminders</div>
                      <div className="text-sm text-gray-500">Reminders for upcoming assignment deadlines</div>
                    </div>
                    <Switch
                      checked={notifications.assignmentReminders}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, assignmentReminders: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Live Session Reminders</div>
                      <div className="text-sm text-gray-500">Notifications for upcoming live classes</div>
                    </div>
                    <Switch
                      checked={notifications.liveSessionReminders}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, liveSessionReminders: checked }))}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Marketing & Updates</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Promotional Emails</div>
                      <div className="text-sm text-gray-500">Special offers and new course announcements</div>
                    </div>
                    <Switch
                      checked={notifications.promotionalEmails}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, promotionalEmails: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Weekly Digest</div>
                      <div className="text-sm text-gray-500">Summary of your learning progress and updates</div>
                    </div>
                    <Switch
                      checked={notifications.weeklyDigest}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, weeklyDigest: checked }))}
                    />
                  </div>
                </div>

                <Button onClick={handleNotificationUpdate} disabled={isLoading} className="bg-[#ff4a03] hover:bg-[#e63e02]">
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? 'Saving...' : 'Save Preferences'}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Privacy Settings */}
          {activeTab === 'privacy' && (
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <p className="text-sm text-gray-600">Control who can see your information and activity.</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="profileVisibility">Profile Visibility</Label>
                  <select
                    id="profileVisibility"
                    value={privacy.profileVisibility}
                    onChange={(e) => setPrivacy(prev => ({ ...prev, profileVisibility: e.target.value }))}
                    className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-md"
                  >
                    <option value="public">Public - Anyone can view</option>
                    <option value="students-only">Students Only - Only TECHINCEPTO students</option>
                    <option value="private">Private - Only you can view</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Controls who can see your basic profile information</p>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Show Learning Progress</div>
                      <div className="text-sm text-gray-500">Display your course progress and achievements</div>
                    </div>
                    <Switch
                      checked={privacy.showProgress}
                      onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, showProgress: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Show Certificates</div>
                      <div className="text-sm text-gray-500">Display your earned certificates on profile</div>
                    </div>
                    <Switch
                      checked={privacy.showCertificates}
                      onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, showCertificates: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Show Contact Information</div>
                      <div className="text-sm text-gray-500">Allow others to see your email and phone</div>
                    </div>
                    <Switch
                      checked={privacy.showContactInfo}
                      onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, showContactInfo: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Allow Messages</div>
                      <div className="text-sm text-gray-500">Let other students and instructors message you</div>
                    </div>
                    <Switch
                      checked={privacy.allowMessages}
                      onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, allowMessages: checked }))}
                    />
                  </div>
                </div>

                <Button onClick={handlePrivacyUpdate} disabled={isLoading} className="bg-[#ff4a03] hover:bg-[#e63e02]">
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? 'Saving...' : 'Save Privacy Settings'}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <p className="text-sm text-gray-600">Manage your account security and login preferences.</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Password Section */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Password</h3>
                      <p className="text-sm text-gray-500">
                        Last changed: {security.lastPasswordChange.toLocaleDateString()}
                      </p>
                    </div>
                    <Button onClick={handlePasswordChange} variant="outline">
                      <Lock className="mr-2 h-4 w-4" />
                      Change Password
                    </Button>
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-500">
                        {security.twoFactorEnabled ? 'Your account is protected with 2FA' : 'Add an extra layer of security to your account'}
                      </p>
                    </div>
                    <Button 
                      onClick={handleEnable2FA} 
                      variant={security.twoFactorEnabled ? "outline" : "default"}
                      className={!security.twoFactorEnabled ? "bg-[#ff4a03] hover:bg-[#e63e02]" : ""}
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      {security.twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                    </Button>
                  </div>
                </div>

                {/* Active Sessions */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-medium">Active Sessions</h3>
                      <p className="text-sm text-gray-500">
                        You have {security.activeSessions} active sessions
                      </p>
                    </div>
                    <Button variant="outline">
                      View All Sessions
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Danger Zone */}
                <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-medium text-red-800">Danger Zone</h3>
                      <p className="text-sm text-red-600 mb-3">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <Button 
                        onClick={handleDeleteAccount} 
                        variant="outline" 
                        className="border-red-300 text-red-700 hover:bg-red-100"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}