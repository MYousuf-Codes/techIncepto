"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SocialLinks } from "@/components/SocialLinks";
import { LazyImage } from "@/components/LazyImage";
import { Code as Code2, Palette, TrendingUp, Video, FileText, Briefcase, Users, Award, Clock, ArrowRight, Play, CircleCheck as CheckCircle } from 'lucide-react';
import Link from 'next/link';

const courses = [
  {
    id: 1,
    title: "MS Office Mastery",
    price: 5000,
    duration: "2 months",
    level: "Beginner",
    icon: FileText,
    description: "Master Microsoft Office suite for professional productivity and career advancement.",
    highlights: [
      "Professional document formatting",
      "Advanced Excel formulas & pivot tables", 
      "Dynamic PowerPoint presentations",
      "Email management with Outlook"
    ]
  },
  {
    id: 2,
    title: "Digital Marketing & Social Media",
    price: 6000,
    duration: "2 months", 
    level: "Intermediate",
    icon: TrendingUp,
    description: "Build your brand online and master digital marketing strategies that convert.",
    highlights: [
      "SEO optimization techniques",
      "Social media advertising", 
      "Content marketing strategies",
      "Email campaign management"
    ]
  },
  {
    id: 3,
    title: "Video Editing & Content Creation",
    price: 6000,
    duration: "2 months",
    level: "Intermediate", 
    icon: Video,
    description: "Create stunning videos and content that engages audiences across platforms.",
    highlights: [
      "Professional video editing",
      "Audio synchronization",
      "Color grading techniques", 
      "Content strategy"
    ]
  },
  {
    id: 4,
    title: "Graphic Designing",
    price: 7000,
    duration: "2.5 months",
    level: "Beginner",
    icon: Palette,
    description: "Master visual design principles and create stunning graphics for any purpose.",
    highlights: [
      "Design fundamentals",
      "Professional photo editing",
      "Logo & brand design",
      "Social media graphics"
    ]
  },
  {
    id: 5,
    title: "Web Development",
    price: 9000,
    duration: "3 months",
    level: "Intermediate",
    icon: Code2,
    description: "Build responsive, modern websites using the latest web technologies.",
    highlights: [
      "Modern web technologies",
      "Responsive design", 
      "JavaScript fundamentals",
      "Content management systems"
    ]
  },
  {
    id: 6,
    title: "Freelancing Skills",
    price: 3000,
    duration: "1 month",
    level: "Beginner", 
    icon: Briefcase,
    description: "Start your freelancing career with proven strategies and platform mastery.",
    highlights: [
      "Profile optimization",
      "Winning proposals",
      "Client management", 
      "Payment systems"
    ]
  }
];

const handleEnrollClick = () => {
  const message = "Hi! I'm interested in enrolling in TECHINCEPTO courses. Can you please provide me with more information about the admission process and available batches?";
  const whatsappUrl = `https://wa.me/923107796560?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-[#ff4a03] to-[#ff6b35] rounded-lg flex items-center justify-center">
                <Code2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#ff4a03] to-[#ff6b35] bg-clip-text text-transparent">
                TECHINCEPTO
              </span>
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-[#ff4a03] transition-colors font-medium">Home</Link>
              <Link href="/courses" className="text-gray-700 hover:text-[#ff4a03] transition-colors font-medium">Courses</Link>
              <Link href="/about" className="text-gray-700 hover:text-[#ff4a03] transition-colors font-medium">About</Link> 
              <Link href="/contact" className="text-gray-700 hover:text-[#ff4a03] transition-colors font-medium">Contact</Link>
              <Button 
                className="bg-[#ff4a03] hover:bg-[#e63e02] text-white"
                onClick={handleEnrollClick}
              >
                Enroll Now
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full text-[#ff4a03] text-sm font-medium">
                <Award className="h-4 w-4 mr-2" />
                Professional IT Training Institute
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Master
                <span className="bg-gradient-to-r from-[#ff4a03] to-[#ff6b35] bg-clip-text text-transparent"> Digital Skills</span>
                <br />
                Build Your Future
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Transform your career with practical online IT courses in Pakistan designed for today's digital world. 
                Learn computer courses online, digital marketing, web development, and freelancing skills from industry professionals.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-[#ff4a03] hover:bg-[#e63e02] text-white"
                  onClick={handleEnrollClick}
                >
                  <Play className="h-5 w-5 mr-2" />
                  Start Learning Today
                </Button>
                <Link href="/courses">
                  <Button size="lg" variant="outline" className="border-orange-200 text-[#ff4a03] hover:bg-orange-50 w-full sm:w-auto">
                    View All Courses
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">6+</div>
                  <div className="text-sm text-gray-600">Expert Courses</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">25</div>
                  <div className="text-sm text-gray-600">Students Per Class</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">100%</div>
                  <div className="text-sm text-gray-600">Practical Training</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-orange-100 to-orange-50 rounded-3xl p-8">
                <LazyImage 
                  src="https://aitech.edu.pk/wp-content/uploads/2025/04/picture-1.jpg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Students learning IT skills" 
                  className="w-full h-96 object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our <span className="text-[#ff4a03]">IT Courses</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our comprehensive range of online IT courses in Pakistan designed to give you practical skills 
              and knowledge needed to succeed in today's digital economy. Learn computer skills, digital marketing, 
              graphic design, and web development from home.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white relative overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-[#ff4a03] transition-colors">
                      <course.icon className="h-6 w-6 text-[#ff4a03] group-hover:text-white transition-colors" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {course.level}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-xl mb-2 group-hover:text-[#ff4a03] transition-colors">
                    {course.title}
                  </CardTitle>
                  
                  <CardDescription className="text-gray-600 mb-4">
                    {course.description}
                  </CardDescription>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-sm">{course.duration}</span>
                    </div>
                    <div className="flex items-center text-[#ff4a03] font-bold">
                      <span>Rs. {course.price.toLocaleString()}</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Course Highlights:</h4>
                      <ul className="space-y-1">
                        {course.highlights.slice(0, 3).map((highlight, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex gap-2">
                      <Link href={`/courses/${course.id}`} className="flex-1">
                        <Button variant="outline" className="w-full border-[#ff4a03] text-[#ff4a03] hover:bg-orange-50">
                          View Details
                        </Button>
                      </Link>
                      <Button 
                        className="flex-1 bg-[#ff4a03] hover:bg-[#e63e02] text-white"
                        onClick={() => {
                          const message = `Hi! I'm interested in enrolling in the ${course.title} course at TECHINCEPTO. Can you please provide me with more information about the admission process, batch timings, and payment details?`;
                          const whatsappUrl = `https://wa.me/923107796560?text=${encodeURIComponent(message)}`;
                          window.open(whatsappUrl, '_blank');
                        }}
                      >
                        Enroll Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/courses">
              <Button size="lg" className="bg-[#ff4a03] hover:bg-[#e63e02] text-white">
                View All Courses
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-[#ff4a03]">TECHINCEPTO</span>?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We are committed to providing quality online IT education in Pakistan that transforms careers and opens new opportunities in the digital world. Our approach combines theoretical knowledge with practical application to ensure you're job-ready.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: Users, 
                title: "Small Class Size", 
                desc: "We maintain small class sizes with maximum 25 students per batch to ensure every student receives individual attention and personalized guidance throughout their learning journey." 
              },
              { 
                icon: Award, 
                title: "Practical Training", 
                desc: "Every course includes hands-on projects and real-world applications. You'll work on actual scenarios that mirror workplace challenges, building a portfolio while you learn." 
              },
              { 
                icon: CheckCircle, 
                title: "Live Assistance with Q&A Sessions", 
                desc: "Get real-time support during classes with dedicated Q&A sessions. Our instructors are available to clarify doubts and provide additional guidance when needed." 
              },
              { 
                icon: Briefcase, 
                title: "Skills to Freelancing Journey", 
                desc: "We don't just teach technical skills - we guide you on how to monetize them. Learn how to start your freelancing career and work with international clients." 
              }
            ].map((item, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-8 w-8 text-[#ff4a03]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 bg-gradient-to-r from-orange-50 to-white rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Teaching Methodology</h3>
              <p className="text-gray-600 max-w-3xl mx-auto">
                At TECHINCEPTO, we believe in learning by doing with our online IT courses in Pakistan. Our structured approach ensures that you not only understand concepts but can apply them confidently in real-world situations.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#ff4a03] text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">1</div>
                <h4 className="font-semibold text-gray-900 mb-2">Learn</h4>
                <p className="text-sm text-gray-600">Comprehensive theoretical foundation with industry best practices</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#ff4a03] text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">2</div>
                <h4 className="font-semibold text-gray-900 mb-2">Practice</h4>
                <p className="text-sm text-gray-600">Hands-on exercises and real-world projects to reinforce learning</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#ff4a03] text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">3</div>
                <h4 className="font-semibold text-gray-900 mb-2">Apply</h4>
                <p className="text-sm text-gray-600">Build portfolio projects and start your professional journey</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#ff4a03] to-[#ff6b35]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join TECHINCEPTO today and gain the digital skills you need to succeed with our online IT courses in Pakistan. 
            Start your journey in computer courses, digital marketing, and web development. Limited seats available - only 25 students per class.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-[#ff4a03] hover:bg-gray-100"
            onClick={handleEnrollClick}
          >
            Enroll Now - WhatsApp Us
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-[#ff4a03] to-[#ff6b35] rounded-lg flex items-center justify-center">
                  <Code2 className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">TECHINCEPTO</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Professional IT training institute dedicated to providing quality education 
                and practical skills for the digital world.
              </p>
              <SocialLinks className="mb-4" />
              <div className="space-y-2 text-gray-400">
                <p>Email: techincepto@gmail.com</p>
                <p>WhatsApp: +92 310 7796560</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/" className="hover:text-[#ff4a03] transition-colors">Home</Link></li>
                <li><Link href="/courses" className="hover:text-[#ff4a03] transition-colors">Courses</Link></li>
                <li><Link href="/about" className="hover:text-[#ff4a03] transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-[#ff4a03] transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy-policy" className="hover:text-[#ff4a03] transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service" className="hover:text-[#ff4a03] transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 TECHINCEPTO. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
