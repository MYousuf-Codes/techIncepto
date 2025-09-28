"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SocialLinks } from "@/components/SocialLinks";
import { Code as Code2, Palette, TrendingUp, Video, FileText, Briefcase, Clock, CircleCheck as CheckCircle, Users } from 'lucide-react';
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
      "Professional document formatting in Word",
      "Advanced Excel formulas & pivot tables", 
      "Dynamic PowerPoint presentations",
      "Professional email management with Outlook",
      "Mail merge and document automation",
      "Data analysis and reporting"
    ],
    syllabus: [
      "Microsoft Word → formatting, tables, mail merge",
      "Excel → formulas, charts, pivot tables", 
      "PowerPoint → animations, presentations",
      "Outlook → professional email handling"
    ],
    project: "Resume, reports, and presentation"
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
      "SEO optimization and keyword research",
      "Facebook and Instagram advertising", 
      "TikTok and YouTube growth strategies",
      "Email marketing campaigns",
      "Content marketing and strategy",
      "Analytics and performance tracking"
    ],
    syllabus: [
      "SEO basics, keyword research",
      "Facebook/Instagram Ads",
      "TikTok & YouTube growth strategies", 
      "Email marketing"
    ],
    project: "Run a demo ad campaign"
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
      "Professional video editing techniques",
      "Audio synchronization and mixing",
      "Color grading and correction", 
      "Content strategy for social media",
      "Motion graphics and effects",
      "Export optimization for different platforms"
    ],
    syllabus: [
      "Premiere Pro basics → cuts, transitions",
      "CapCut/Filmora → quick edits",
      "Audio syncing, background music",
      "Color grading"
    ],
    project: "Short YouTube/TikTok video"
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
      "Design fundamentals and color theory",
      "Professional photo editing in Photoshop",
      "Logo and brand identity design",
      "Social media graphics and templates",
      "Print design and layouts",
      "Vector graphics and illustrations"
    ],
    syllabus: [
      "Design principles, color theory",
      "Photoshop → photo editing, posters", 
      "Illustrator → logos, vector art",
      "Canva → social media design"
    ],
    project: "Logo + flyer + social campaign"
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
      "HTML5 and CSS3 fundamentals",
      "Responsive design principles", 
      "JavaScript programming basics",
      "Modern CSS frameworks",
      "WordPress development",
      "Website deployment and hosting"
    ],
    syllabus: [
      "HTML5, CSS3, responsive layouts",
      "JavaScript basics, DOM manipulation", 
      "Bootstrap/Tailwind for design",
      "WordPress basics"
    ],
    project: "Responsive website"
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
      "Profile optimization on major platforms",
      "Writing winning proposals",
      "Client communication and management", 
      "Pricing strategies and negotiation",
      "Payment systems and security",
      "Building long-term client relationships"
    ],
    syllabus: [
      "Fiverr profile setup, gig creation",
      "Upwork proposals and pricing",
      "Client communication",
      "Payments via JazzCash/Payoneer"
    ],
    project: "2 Fiverr gigs + Upwork profile"
  }
];

const handleEnrollClick = () => {
  const message = "Hi! I'm interested in enrolling in TECHINCEPTO courses. Can you please provide me with more information about the admission process and available batches?";
  const whatsappUrl = `https://wa.me/923107796560?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};

export default function CoursesPage() {
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
              <Link href="/courses" className="text-[#ff4a03] font-medium">Courses</Link>
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
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-[#ff4a03]">IT Training Courses</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Comprehensive IT training programs designed to give you practical skills and knowledge 
            needed to succeed in today's digital economy. Each course is limited to 25 students 
            to ensure personalized attention and quality learning.
          </p>
          <div className="flex items-center justify-center space-x-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#ff4a03]">6</div>
              <div className="text-sm text-gray-600">Expert Courses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#ff4a03]">25</div>
              <div className="text-sm text-gray-600">Max Students Per Class</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#ff4a03]">100%</div>
              <div className="text-sm text-gray-600">Practical Training</div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Card key={course.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white shadow-md relative overflow-hidden">
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
                  
                  <div className="flex items-center text-gray-500 mb-4">
                    <Users className="h-4 w-4 mr-1" />
                    <span className="text-sm">Max 25 students per class</span>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">What You'll Learn:</h4>
                      <ul className="space-y-1">
                        {course.highlights.slice(0, 4).map((highlight, index) => (
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
                        onClick={handleEnrollClick}
                      >
                        Enroll Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Courses */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Why Choose Our <span className="text-[#ff4a03]">Training Programs</span>?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our courses are designed with a practical approach to ensure you gain real-world skills 
              that are immediately applicable in your career.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Small Class Sizes",
                description: "With only 25 students per class, you get personalized attention and can ask questions freely. This ensures better understanding and faster learning progress."
              },
              {
                title: "Practical Projects",
                description: "Every course includes hands-on projects that you can add to your portfolio. You'll work on real scenarios that mirror actual workplace challenges."
              },
              {
                title: "Industry-Relevant Skills",
                description: "Our curriculum is updated regularly to match current industry demands. You'll learn the tools and techniques that employers are actually looking for."
              }
            ].map((item, index) => (
              <Card key={index} className="text-center border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="pt-8">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-[#ff4a03]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#ff4a03] to-[#ff6b35]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Don't wait - seats are limited to 25 students per class. Secure your spot today 
            and start building the skills you need for a successful career in IT.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-[#ff4a03] hover:bg-gray-100"
            onClick={handleEnrollClick}
          >
            Enroll Now via WhatsApp
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