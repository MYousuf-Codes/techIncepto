"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SocialLinks } from "@/components/SocialLinks";
import { Code as Code2, Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import Link from 'next/link';

const handleEnrollClick = () => {
  const message = "Hi! I'm interested in enrolling in TECHINCEPTO courses. Can you please provide me with more information about the admission process and available batches?";
  const whatsappUrl = `https://wa.me/923107796560?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const whatsappMessage = `Hi! I'm interested in TECHINCEPTO courses.

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Interested Course: ${formData.course || 'Not specified'}
Message: ${formData.message}

Please provide me with more information about the admission process and available batches.`;

    const whatsappUrl = `https://wa.me/923107796560?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

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
              <Link href="/contact" className="text-[#ff4a03] font-medium">Contact</Link>
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
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Get in <span className="bg-gradient-to-r from-blue-600 to-[#ff4a03] bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Ready to start your learning journey with online IT courses in Pakistan? We're here to help you choose the right course 
            and answer any questions you may have about our computer training programs.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900 flex items-center">
                    <MessageCircle className="h-6 w-6 text-blue-600 mr-3" />
                    Send us a Message
                  </CardTitle>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you as soon as possible for our online IT courses in Pakistan. 
                    You can also contact us directly via WhatsApp for immediate assistance.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="mt-1"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="mt-1"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="Enter your email address"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="course">Interested Course</Label>
                      <select
                        id="course"
                        name="course"
                        value={formData.course}
                        onChange={handleInputChange}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff4a03] focus:border-transparent"
                      >
                        <option value="">Select a course (optional)</option>
                        <option value="MS Office Mastery">MS Office Mastery</option>
                        <option value="Digital Marketing & Social Media">Digital Marketing & Social Media</option>
                        <option value="Video Editing & Content Creation">Video Editing & Content Creation</option>
                        <option value="Graphic Designing">Graphic Designing</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Freelancing Skills">Freelancing Skills</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        className="mt-1"
                        rows={4}
                        placeholder="Tell us about your learning goals and any questions you have..."
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-[#ff4a03] hover:bg-[#e63e02] text-white"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Message via WhatsApp
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <p className="text-lg text-gray-600 mb-8">
                  We're here to help you succeed in your IT career with our online courses in Pakistan. Reach out to us through any 
                  of the following channels and we'll be happy to assist you.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: Phone,
                    title: "WhatsApp",
                    info: "+92 310 7796560",
                    desc: "Available 9 AM - 8 PM (Mon-Sat)",
                    action: () => window.open('https://wa.me/923107796560', '_blank')
                  },
                  {
                    icon: Mail,
                    title: "Email",
                    info: "techincepto@gmail.com",
                    desc: "We reply within 24 hours",
                    action: () => window.open('mailto:techincepto@gmail.com', '_blank')
                  },
                  {
                    icon: MapPin,
                    title: "Location",
                    info: "Pakistan",
                    desc: "Online and in-person classes available",
                    action: null
                  },
                  {
                    icon: Clock,
                    title: "Office Hours",
                    info: "Mon - Sat: 9 AM - 8 PM",
                    desc: "Sunday: Closed",
                    action: null
                  }
                ].map((contact, index) => (
                  <Card 
                    key={index} 
                    className={`border-0 shadow-md hover:shadow-lg transition-shadow ${contact.action ? 'cursor-pointer' : ''}`}
                    onClick={contact.action || undefined}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          index % 2 === 0 ? 'bg-gradient-to-br from-blue-100 to-blue-200' : 'bg-gradient-to-br from-orange-100 to-orange-200'
                        }`}>
                          <contact.icon className={`h-6 w-6 ${index % 2 === 0 ? 'text-blue-600' : 'text-[#ff4a03]'}`} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{contact.title}</h3>
                          <p className="text-[#ff4a03] font-medium mb-1">{contact.info}</p>
                          <p className="text-gray-600 text-sm">{contact.desc}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick Contact */}
              <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-[#ff4a03] text-white">
                <CardHeader>
                  <CardTitle className="text-white">Need Immediate Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-50 mb-4">
                    For immediate assistance with our online IT courses selection, admission process, or any urgent queries,
                    contact us directly on WhatsApp.
                  </p>
                  <Button
                    className="w-full bg-white text-blue-600 hover:bg-gray-100 font-semibold"
                    onClick={handleEnrollClick}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    WhatsApp Us Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Frequently Asked <span className="bg-gradient-to-r from-[#ff4a03] to-blue-600 bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Here are some common questions about our online IT courses in Pakistan and admission process.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "How do I enroll in a course?",
                answer: "You can enroll in our online IT courses by contacting us via WhatsApp at +92 310 7796560 or by filling out the contact form above. We'll guide you through the admission process and help you choose the right course."
              },
              {
                question: "What is the class size?",
                answer: "As a new institute, we maintain small class sizes with a maximum of 25 students per class to ensure personalized attention and better learning outcomes for every student."
              },
              {
                question: "Do you provide certificates?",
                answer: "Yes, we provide certificates of completion for all our online IT courses. These certificates validate the skills and knowledge you've gained during the training program."
              },
              {
                question: "Are there any prerequisites?",
                answer: "Most of our online IT courses are designed for beginners and don't require specific prerequisites. However, basic computer knowledge is helpful. We'll discuss your background during the consultation."
              },
              {
                question: "What are the payment options?",
                answer: "We offer flexible payment options including bank transfer, JazzCash, EasyPaisa, and other convenient methods. Payment plans can be discussed during enrollment."
              },
              {
                question: "Do you offer job placement assistance?",
                answer: "As a new institute, while we don't guarantee job placement, we provide career guidance, resume building tips, and help you build a strong portfolio that showcases your skills to potential employers."
              }
            ].map((faq, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
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
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Follow Us</h3>
                <SocialLinks showLabels={true} className="flex-wrap" />
              </div>
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