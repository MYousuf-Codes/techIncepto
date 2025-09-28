"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SocialLinks } from "@/components/SocialLinks";
import { Code as Code2, Palette, TrendingUp, Video, FileText, Briefcase, Clock, CircleCheck as CheckCircle, Users, ArrowLeft, BookOpen, Target, Star, Calendar, Award, Download, Play, Zap } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const courses = [
  {
    id: 1,
    title: "MS Office Mastery",
    price: 5000,
    duration: "2 months",
    level: "Beginner",
    icon: FileText,
    description: "Master Microsoft Office suite for professional productivity and career advancement. This comprehensive course covers all essential Office applications used in modern workplaces.",
    highlights: [
      "Professional document formatting in Word",
      "Advanced Excel formulas & pivot tables", 
      "Dynamic PowerPoint presentations",
      "Professional email management with Outlook",
      "Mail merge and document automation",
      "Data analysis and reporting",
      "Template creation and customization",
      "Collaboration tools and sharing"
    ],
    syllabus: [
      "Microsoft Word → Document formatting, styles, tables, mail merge, templates",
      "Microsoft Excel → Formulas, functions, charts, pivot tables, data analysis", 
      "Microsoft PowerPoint → Slide design, animations, transitions, presentations",
      "Microsoft Outlook → Email management, calendar, contacts, tasks"
    ],
    project: "Create a professional resume, business reports, and presentation portfolio",
    prerequisites: "Basic computer knowledge",
    careerOpportunities: [
      "Administrative Assistant",
      "Data Entry Specialist", 
      "Office Manager",
      "Executive Assistant",
      "Business Analyst"
    ],
    tools: ["Microsoft Word", "Microsoft Excel", "Microsoft PowerPoint", "Microsoft Outlook"],
    rating: 4.8,
    students: 150,
    difficulty: "Easy",
    language: "English/Urdu",
    certificate: true,
    support: "24/7 WhatsApp Support",
    updates: "Lifetime Updates"
  },
  {
    id: 2,
    title: "Digital Marketing & Social Media",
    price: 6000,
    duration: "2 months", 
    level: "Intermediate",
    icon: TrendingUp,
    description: "Build your brand online and master digital marketing strategies that convert. Learn to create effective marketing campaigns across multiple digital platforms.",
    highlights: [
      "SEO optimization and keyword research",
      "Facebook and Instagram advertising", 
      "TikTok and YouTube growth strategies",
      "Email marketing campaigns",
      "Content marketing and strategy",
      "Analytics and performance tracking",
      "Social media management",
      "Brand building and online presence"
    ],
    syllabus: [
      "SEO Fundamentals → Keyword research, on-page optimization, link building",
      "Social Media Marketing → Facebook/Instagram Ads, content strategy",
      "Video Marketing → TikTok & YouTube growth, content creation", 
      "Email Marketing → Campaign creation, automation, analytics"
    ],
    project: "Run a complete digital marketing campaign with measurable results",
    prerequisites: "Basic internet and social media knowledge",
    careerOpportunities: [
      "Digital Marketing Specialist",
      "Social Media Manager", 
      "Content Marketing Manager",
      "SEO Specialist",
      "Marketing Coordinator"
    ],
    tools: ["Google Analytics", "Facebook Ads Manager", "Canva", "Mailchimp"],
    rating: 4.9,
    students: 200,
    difficulty: "Medium",
    language: "English/Urdu",
    certificate: true,
    support: "24/7 WhatsApp Support",
    updates: "Lifetime Updates"
  },
  {
    id: 3,
    title: "Video Editing & Content Creation",
    price: 6000,
    duration: "2 months",
    level: "Intermediate", 
    icon: Video,
    description: "Create stunning videos and content that engages audiences across platforms. Master professional video editing techniques and content creation strategies.",
    highlights: [
      "Professional video editing techniques",
      "Audio synchronization and mixing",
      "Color grading and correction", 
      "Content strategy for social media",
      "Motion graphics and effects",
      "Export optimization for different platforms",
      "Storytelling through video",
      "Brand video creation"
    ],
    syllabus: [
      "Adobe Premiere Pro → Professional editing, cuts, transitions, effects",
      "CapCut/Filmora → Quick editing for social media content",
      "Audio Production → Syncing, background music, sound effects",
      "Color Grading → Professional color correction and grading techniques"
    ],
    project: "Create a complete video portfolio including YouTube and TikTok content",
    prerequisites: "Basic computer skills and creativity",
    careerOpportunities: [
      "Video Editor",
      "Content Creator", 
      "Social Media Video Specialist",
      "YouTube Channel Manager",
      "Freelance Video Producer"
    ],
    tools: ["Adobe Premiere Pro", "CapCut", "Filmora", "DaVinci Resolve"],
    rating: 4.7,
    students: 120,
    difficulty: "Medium",
    language: "English/Urdu",
    certificate: true,
    support: "24/7 WhatsApp Support",
    updates: "Lifetime Updates"
  },
  {
    id: 4,
    title: "Graphic Designing",
    price: 7000,
    duration: "2.5 months",
    level: "Beginner",
    icon: Palette,
    description: "Master visual design principles and create stunning graphics for any purpose. Learn industry-standard design software and develop your creative skills.",
    highlights: [
      "Design fundamentals and color theory",
      "Professional photo editing in Photoshop",
      "Logo and brand identity design",
      "Social media graphics and templates",
      "Print design and layouts",
      "Vector graphics and illustrations",
      "Typography and composition",
      "Client project workflow"
    ],
    syllabus: [
      "Design Principles → Color theory, typography, composition, layout",
      "Adobe Photoshop → Photo editing, digital art, poster design", 
      "Adobe Illustrator → Logo design, vector graphics, illustrations",
      "Canva Pro → Social media design, templates, brand kits"
    ],
    project: "Complete brand identity package: logo, business card, flyer, and social media campaign",
    prerequisites: "Basic computer skills and creative interest",
    careerOpportunities: [
      "Graphic Designer",
      "Brand Identity Designer", 
      "Social Media Designer",
      "Print Designer",
      "Freelance Designer"
    ],
    tools: ["Adobe Photoshop", "Adobe Illustrator", "Canva Pro", "Figma"],
    rating: 4.8,
    students: 180,
    difficulty: "Easy",
    language: "English/Urdu",
    certificate: true,
    support: "24/7 WhatsApp Support",
    updates: "Lifetime Updates"
  },
  {
    id: 5,
    title: "Web Development",
    price: 9000,
    duration: "3 months",
    level: "Intermediate",
    icon: Code2,
    description: "Build responsive, modern websites using the latest web technologies. Learn to create professional websites from scratch and understand web development fundamentals.",
    highlights: [
      "HTML5 and CSS3 fundamentals",
      "Responsive design principles", 
      "JavaScript programming basics",
      "Modern CSS frameworks",
      "WordPress development and customization",
      "Website deployment and hosting",
      "SEO-friendly website structure",
      "Performance optimization"
    ],
    syllabus: [
      "Frontend Basics → HTML5 structure, CSS3 styling, responsive layouts",
      "JavaScript Fundamentals → DOM manipulation, events, basic programming", 
      "CSS Frameworks → Bootstrap/Tailwind for rapid development",
      "WordPress → Theme customization, plugins, content management"
    ],
    project: "Build and deploy a complete responsive website with multiple pages",
    prerequisites: "Basic computer skills and logical thinking",
    careerOpportunities: [
      "Frontend Developer",
      "WordPress Developer", 
      "Web Designer",
      "UI Developer",
      "Freelance Web Developer"
    ],
    tools: ["HTML5", "CSS3", "JavaScript", "WordPress", "Bootstrap"],
    rating: 4.9,
    students: 95,
    difficulty: "Hard",
    language: "English/Urdu",
    certificate: true,
    support: "24/7 WhatsApp Support",
    updates: "Lifetime Updates"
  },
  {
    id: 6,
    title: "Freelancing Skills",
    price: 3000,
    duration: "1 month",
    level: "Beginner", 
    icon: Briefcase,
    description: "Start your freelancing career with proven strategies and platform mastery. Learn how to build a successful freelance business and work with international clients.",
    highlights: [
      "Profile optimization on major platforms",
      "Writing winning proposals and bids",
      "Client communication and management", 
      "Pricing strategies and negotiation",
      "Payment systems and security",
      "Building long-term client relationships",
      "Time management and productivity",
      "Legal and tax considerations"
    ],
    syllabus: [
      "Platform Mastery → Fiverr profile setup, gig creation and optimization",
      "Upwork Success → Profile creation, proposal writing, bidding strategies",
      "Client Relations → Professional communication, project management",
      "Payment Systems → JazzCash, Payoneer, international payment methods"
    ],
    project: "Create optimized profiles on Fiverr and Upwork with 2 active gigs",
    prerequisites: "At least one marketable skill (design, writing, etc.)",
    careerOpportunities: [
      "Freelance Professional",
      "Independent Contractor", 
      "Online Service Provider",
      "Digital Nomad",
      "Consultant"
    ]
    ],
    tools: ["Fiverr", "Upwork", "PayPal", "Payoneer"],
    rating: 4.6,
    students: 250,
    difficulty: "Easy",
    language: "English/Urdu",
    certificate: true,
    support: "24/7 WhatsApp Support",
    updates: "Lifetime Updates"
  }
];

const handleEnrollClick = (courseTitle: string) => {
  const message = `Hi! I'm interested in enrolling in the ${courseTitle} course at TECHINCEPTO. Can you please provide me with more information about the admission process, batch timings, and payment details?`;
  const whatsappUrl = `https://wa.me/923107796560?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = parseInt(params.id as string);
  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <Link href="/courses">
            <Button className="bg-[#ff4a03] hover:bg-[#e63e02] text-white">
              Back to Courses
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = course.icon;

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
                onClick={() => handleEnrollClick(course.title)}
              >
                Enroll Now
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Course Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <Link href="/courses" className="inline-flex items-center text-[#ff4a03] hover:text-[#e63e02] mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Link>
          
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center">
                  <IconComponent className="h-8 w-8 text-[#ff4a03]" />
                </div>
                <div>
                  <Badge variant="outline" className="mb-2">{course.level}</Badge>
                  <h1 className="text-4xl font-bold text-gray-900">{course.title}</h1>
                </div>
              </div>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                {course.description}
              </p>
              
              <div className="flex items-center space-x-8">
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-2" />
                  <span>Max 25 students</span>
                </div>
                <div className="flex items-center text-yellow-500">
                  <Star className="h-5 w-5 mr-1 fill-current" />
                  <span className="font-medium">{course.rating}</span>
                </div>
                <div className="flex items-center text-[#ff4a03] font-bold text-xl">
                  <span>Rs. {course.price.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{course.students}+</div>
                  <div className="text-sm text-gray-600">Students Enrolled</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{course.difficulty}</div>
                  <div className="text-sm text-gray-600">Difficulty Level</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{course.language}</div>
                  <div className="text-sm text-gray-600">Language</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">✓</div>
                  <div className="text-sm text-gray-600">Certificate</div>
                </div>
              </div>
            </div>
            
            <div>
              <Card className="sticky top-32 border-0 shadow-lg">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-[#ff4a03]">Enroll Now</CardTitle>
                  <p className="text-gray-600">Limited seats available</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-2">Rs. {course.price.toLocaleString()}</div>
                    <div className="text-gray-600">{course.duration} course</div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>Maximum 25 students per class</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>Hands-on practical training</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>Real-world projects</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>Certificate upon completion</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>Live classes with QnA Session</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>24/7 WhatsApp support</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>Lifetime course updates</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-[#ff4a03] hover:bg-[#e63e02] text-white"
                    onClick={() => handleEnrollClick(course.title)}
                  >
                    Enroll via WhatsApp
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {/* What You'll Learn */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <BookOpen className="h-8 w-8 text-[#ff4a03] mr-3" />
                  What You'll Learn
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {course.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Syllabus */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Course Syllabus</h2>
                <div className="space-y-4">
                  {course.syllabus.map((item, index) => (
                    <Card key={index} className="border-l-4 border-l-[#ff4a03] border-t-0 border-r-0 border-b-0 rounded-l-none">
                      <CardContent className="pt-4">
                        <p className="text-gray-700">{item}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Course Project */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <Zap className="h-8 w-8 text-[#ff4a03] mr-3" />
                  Tools & Technologies
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {course.tools.map((tool, index) => (
                    <Card key={index} className="text-center hover:shadow-md transition-shadow">
                      <CardContent className="pt-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <Code2 className="h-6 w-6 text-[#ff4a03]" />
                        </div>
                        <p className="text-sm font-medium text-gray-700">{tool}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Course Features */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Course Features</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { icon: Award, title: "Industry Certificate", desc: "Get a professional certificate upon successful completion" },
                    { icon: Play, title: "Practical Projects", desc: "Work on real-world projects to build your portfolio" },
                    { icon: Users, title: "Small Batches", desc: "Maximum 25 students for personalized attention" },
                    { icon: Clock, title: "Flexible Timing", desc: "Multiple batch timings to fit your schedule" }
                  ].map((feature, index) => (
                    <Card key={index} className="flex items-start p-4 hover:shadow-md transition-shadow">
                      <feature.icon className="h-8 w-8 text-[#ff4a03] mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                        <p className="text-gray-600 text-sm">{feature.desc}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <Target className="h-8 w-8 text-[#ff4a03] mr-3" />
                  Course Project
                </h2>
                <Card className="bg-orange-50 border-[#ff4a03]">
                  <CardContent className="pt-6">
                    <p className="text-gray-700 text-lg">{course.project}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Prerequisites */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Prerequisites</h2>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-gray-700">{course.prerequisites}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Career Opportunities */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Career Opportunities</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {course.careerOpportunities.map((career, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-[#ff4a03] rounded-full"></div>
                          <span className="text-gray-700 font-medium">{career}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Course Info */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
                <CardContent className="pt-6 text-center">
                  <div className="flex items-center justify-center mb-4">
                    <Star className="h-8 w-8 text-yellow-500 fill-current" />
                    <span className="text-3xl font-bold text-gray-900 ml-2">{course.rating}</span>
                  </div>
                  <p className="text-gray-600 mb-2">Course Rating</p>
                  <p className="text-sm text-gray-500">{course.students}+ students enrolled</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Course Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Level:</span>
                    <span className="font-medium">{course.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Class Size:</span>
                    <span className="font-medium">Max 25 students</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-bold text-[#ff4a03]">Rs. {course.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Language:</span>
                    <span className="font-medium">{course.language}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Support:</span>
                    <span className="font-medium text-green-600">24/7 WhatsApp</span>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-[#ff4a03] to-[#ff6b35] text-white">
                <CardHeader>
                  <CardTitle className="text-white">Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-orange-100">
                    Have questions about this course? Contact us directly for personalized guidance.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p>WhatsApp: +92 310 7796560</p>
                    <p>Email: techincepto@gmail.com</p>
                  </div>
                  <Button 
                    className="w-full bg-white text-[#ff4a03] hover:bg-gray-100"
                    onClick={() => handleEnrollClick(course.title)}
                  >
                    Contact Us
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Student Reviews Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              What Our <span className="text-[#ff4a03]">Students Say</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real feedback from students who have completed this course and transformed their careers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Ahmed Khan",
                role: "Freelancer",
                rating: 5,
                review: "Excellent course! The practical approach helped me start my freelancing career immediately after completion."
              },
              {
                name: "Fatima Ali",
                role: "Marketing Executive",
                rating: 5,
                review: "The instructors are very knowledgeable and the small class size ensured I got personal attention."
              },
              {
                name: "Hassan Sheikh",
                role: "Business Owner",
                rating: 4,
                review: "Great value for money. The skills I learned have directly improved my business operations."
              }
            ].map((review, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{review.review}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{review.name}</p>
                    <p className="text-sm text-gray-500">{review.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Frequently Asked <span className="text-[#ff4a03]">Questions</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Here are some common questions about this course and our training methodology.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "What are the prerequisites for this course?",
                answer: course.prerequisites + ". We provide additional support for beginners to ensure everyone can follow along comfortably."
              },
              {
                question: "How are the classes conducted?",
                answer: "Classes are conducted in small batches of maximum 25 students to ensure personalized attention. We use a combination of theoretical explanations, practical demonstrations, and hands-on exercises."
              },
              {
                question: "Will I get a certificate after completion?",
                answer: "Yes, you will receive a certificate of completion after successfully finishing all course requirements, including assignments and the final project."
              },
              {
                question: "What if I miss a class?",
                answer: "We provide recorded sessions for students who miss classes due to genuine reasons. Additionally, you can clarify doubts in the next session or through our support channels."
              },
              {
                question: "Do you provide job placement assistance?",
                answer: "While we don't guarantee job placement, we provide career guidance, resume building tips, and help you create a strong portfolio that showcases your skills to potential employers."
              },
              {
                question: "Can I pay the course fee in installments?",
                answer: "Yes, we offer flexible payment options. You can discuss installment plans during the enrollment process. Contact us via WhatsApp for more details."
              }
            ].map((faq, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
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
