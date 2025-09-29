"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SocialLinks } from "@/components/SocialLinks";
import { LazyImage } from "@/components/LazyImage";
import { Code as Code2, Users, Award, CircleCheck as CheckCircle, Target, BookOpen, Lightbulb, Heart } from 'lucide-react';
import Link from 'next/link';

const handleEnrollClick = () => {
  const message = "Hi! I'm interested in learning more about TECHINCEPTO and your courses. Can you please provide me with more information?";
  const whatsappUrl = `https://wa.me/923107796560?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};

export default function AboutPage() {
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
              <Link href="/about" className="text-[#ff4a03] font-medium">About</Link> 
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
            About <span className="text-[#ff4a03]">TECHINCEPTO</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We are a new and dedicated IT training institute committed to empowering individuals with 
            practical digital skills through online IT courses in Pakistan that open doors to new career opportunities in today's 
            technology-driven world.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  TECHINCEPTO was recently founded with a simple yet powerful vision: to bridge the gap 
                  between traditional education and the practical skills needed in today's digital economy. 
                  We recognize that many talented individuals are struggling to find quality, 
                  affordable online IT courses in Pakistan that actually prepare them for real-world challenges.
                </p>
                <p>
                  Our new institute focuses on hands-on learning with small class sizes to ensure every 
                  student receives personalized attention. We believe that learning should be practical, 
                  engaging, and directly applicable to your career goals.
                </p>
                <p>
                  We offer comprehensive online training programs in various IT domains, from basic 
                  computer skills to advanced web development, all designed to help our students 
                  succeed in the digital world.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <LazyImage 
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Students learning at TECHINCEPTO" 
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-[#ff4a03]" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  To provide high-quality, practical online IT education in Pakistan that empowers individuals with 
                  the skills and confidence needed to succeed in the digital economy. We are 
                  committed to making technology education accessible, affordable, and relevant 
                  to current industry needs.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="h-8 w-8 text-[#ff4a03]" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  To become a leading IT training institute in Pakistan that transforms lives through 
                  education, creating a skilled workforce ready for the challenges of tomorrow's 
                  digital landscape. We envision a future where everyone has access to quality 
                  online technology education.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our <span className="text-[#ff4a03]">Core Values</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These values guide everything we do and shape the learning experience we provide to our students.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Quality Education",
                description: "We are committed to providing the highest quality education with up-to-date curriculum and industry-relevant content that prepares students for real-world challenges."
              },
              {
                icon: Users,
                title: "Personalized Learning",
                description: "With small class sizes of maximum 25 students, we ensure every learner receives individual attention and support throughout their educational journey."
              },
              {
                icon: Heart,
                title: "Student Success",
                description: "Our students' success is our success. We are dedicated to helping each individual achieve their career goals and reach their full potential in the IT industry."
              },
              {
                icon: CheckCircle,
                title: "Practical Approach",
                description: "We believe in learning by doing. Every course includes hands-on projects and real-world applications to ensure students gain practical experience."
              },
              {
                icon: Award,
                title: "Excellence",
                description: "We strive for excellence in everything we do, from course content and teaching methods to student support and career guidance services."
              },
              {
                icon: Lightbulb,
                title: "Innovation",
                description: "We continuously update our teaching methods and course content to stay current with the latest technology trends and industry requirements."
              }
            ].map((value, index) => (
              <Card key={index} className="text-center border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="pt-8">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-[#ff4a03]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-[#ff4a03]">TECHINCEPTO</span>?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We offer more than just courses - we provide a complete learning experience designed 
              to help you succeed in your IT career.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Small Class Sizes",
                description: "Maximum 25 students per class ensures personalized attention and better learning outcomes for every student."
              },
              {
                title: "Practical Training",
                description: "Every course includes hands-on projects and real-world applications to build your portfolio and gain experience."
              },
              {
                title: "Industry-Relevant Curriculum",
                description: "Our courses are designed to meet current market demands with content that employers are looking for."
              },
              {
                title: "Affordable Pricing",
                description: "Quality education shouldn't be expensive. We offer competitive pricing to make IT education accessible to everyone."
              },
              {
                title: "Flexible Learning",
                description: "We understand that everyone has different schedules, so we offer flexible timing options to accommodate your needs."
              },
              {
                title: "Ongoing Support",
                description: "Our support doesn't end when the course does. We provide ongoing guidance and assistance even after completion."
              }
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Commitment to <span className="text-[#ff4a03]">Your Success</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-600">
              <p>
                At TECHINCEPTO, we understand that choosing the right online IT training institute is a significant 
                decision that can impact your career trajectory. That's why we are committed to providing 
                not just education, but a transformative learning experience.
              </p>
              <p>
                As a new institute, we believe that every student has the potential to succeed in the IT industry, regardless 
                of their background or previous experience. Our role is to provide the guidance, support, 
                and practical skills needed to unlock that potential.
              </p>
              <p>
                When you choose TECHINCEPTO, you're not just enrolling in a course - you're joining a 
                new community of learners and professionals who are committed to growth, excellence, and 
                mutual success in the digital world.
              </p>
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
            Join TECHINCEPTO today and take the first step towards a successful career in IT. 
            Our team is here to guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-[#ff4a03] hover:bg-gray-100"
              onClick={handleEnrollClick}
            >
              Contact Us on WhatsApp
            </Button>
            <Link href="/courses">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#ff4a03]">
                View Our Courses
              </Button>
            </Link>
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