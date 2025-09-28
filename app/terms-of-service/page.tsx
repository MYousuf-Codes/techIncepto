"use client";

import { Button } from "@/components/ui/button";
import { SocialLinks } from "@/components/SocialLinks";
import { Code as Code2 } from 'lucide-react';
import Link from 'next/link';

const handleEnrollClick = () => {
  const message = "Hi! I'm interested in enrolling in TECHINCEPTO courses. Can you please provide me with more information?";
  const whatsappUrl = `https://wa.me/923107796560?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};

export default function TermsOfServicePage() {
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

      {/* Content */}
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last updated: January 2024</p>
          
          <div className="prose prose-lg max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-600">
                  By enrolling in courses or using services provided by TECHINCEPTO, you agree to be bound 
                  by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Course Enrollment and Payment</h2>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    <strong>Enrollment:</strong> Course enrollment is confirmed upon payment of fees. 
                    Seats are limited to 25 students per class and are allocated on a first-come, first-served basis.
                  </p>
                  <p className="text-gray-600">
                    <strong>Payment:</strong> Course fees must be paid in full before the start of classes unless 
                    alternative payment arrangements have been agreed upon in writing.
                  </p>
                  <p className="text-gray-600">
                    <strong>Refund Policy:</strong> Refunds may be considered on a case-by-case basis and must be 
                    requested within 7 days of enrollment. Refunds after course commencement are generally not available.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Student Responsibilities</h2>
                <p className="text-gray-600 mb-4">As a student, you agree to:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Attend classes regularly and participate actively in learning activities</li>
                  <li>Complete assignments and projects within specified deadlines</li>
                  <li>Respect instructors, staff, and fellow students</li>
                  <li>Use course materials and resources responsibly</li>
                  <li>Maintain academic integrity and avoid plagiarism</li>
                  <li>Provide accurate information during enrollment</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Course Materials and Intellectual Property</h2>
                <p className="text-gray-600 mb-4">
                  All course materials, including but not limited to presentations, handouts, videos, and 
                  assignments, are the intellectual property of TECHINCEPTO. Students may:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Use materials for personal learning and reference</li>
                  <li>Create portfolio projects based on course assignments</li>
                </ul>
                <p className="text-gray-600 mt-4">Students may not:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Distribute, share, or sell course materials to third parties</li>
                  <li>Use materials for commercial purposes without written permission</li>
                  <li>Record or reproduce course content without authorization</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Attendance and Completion</h2>
                <p className="text-gray-600 mb-4">
                  <strong>Attendance:</strong> Regular attendance is essential for successful course completion. 
                  Students with excessive absences may be asked to re-enroll in a future batch.
                </p>
                <p className="text-gray-600">
                  <strong>Certificates:</strong> Certificates of completion are awarded to students who 
                  successfully complete all course requirements, including assignments and projects.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Code of Conduct</h2>
                <p className="text-gray-600 mb-4">
                  TECHINCEPTO maintains a professional learning environment. The following behaviors are not tolerated:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Harassment, discrimination, or disrespectful behavior</li>
                  <li>Disruption of classes or learning activities</li>
                  <li>Academic dishonesty or cheating</li>
                  <li>Violation of computer and internet usage policies</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  Violation of the code of conduct may result in suspension or termination from the program 
                  without refund.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
                <p className="text-gray-600">
                  TECHINCEPTO provides educational services to the best of our ability. However, we do not 
                  guarantee specific career outcomes or job placement. Our liability is limited to the fees 
                  paid for the course. We are not responsible for any indirect, incidental, or consequential damages.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Privacy and Data Protection</h2>
                <p className="text-gray-600">
                  Your privacy is important to us. Please refer to our Privacy Policy for information about 
                  how we collect, use, and protect your personal information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Course Changes and Cancellations</h2>
                <p className="text-gray-600">
                  TECHINCEPTO reserves the right to modify course content, schedules, or instructors as needed. 
                  In the event of course cancellation due to insufficient enrollment or other circumstances, 
                  students will receive a full refund or the option to transfer to another course.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Dispute Resolution</h2>
                <p className="text-gray-600">
                  Any disputes arising from these terms or our services will be resolved through good faith 
                  discussion. If resolution cannot be reached, disputes will be handled according to the 
                  laws of Pakistan.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to Terms</h2>
                <p className="text-gray-600">
                  We may update these Terms of Service from time to time. Changes will be posted on our 
                  website and will take effect immediately upon posting. Continued use of our services 
                  constitutes acceptance of the updated terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Information</h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-600 mb-2"><strong>Email:</strong> techincepto@gmail.com</p>
                  <p className="text-gray-600"><strong>WhatsApp:</strong> +92 310 7796560</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

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