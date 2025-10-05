'use client';

import { Code2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  variant?: 'default' | 'transparent';
  className?: string;
}

export default function Header({ variant = 'default', className = '' }: HeaderProps) {
  const pathname = usePathname();
  
  const handleEnrollClick = () => {
    const message = "Hi! I'm interested in enrolling in TECHINCEPTO courses. Can you please provide me with more information?";
    const whatsappUrl = `https://wa.me/923107796560?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const isActive = (path: string) => pathname === path;

  return (
    <header className={`fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50 ${className}`}>
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
            <Link 
              href="/" 
              className={`transition-colors font-medium ${
                isActive('/') 
                  ? 'text-[#ff4a03]' 
                  : 'text-gray-700 hover:text-[#ff4a03]'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/courses" 
              className={`transition-colors font-medium ${
                isActive('/courses') 
                  ? 'text-[#ff4a03]' 
                  : 'text-gray-700 hover:text-[#ff4a03]'
              }`}
            >
              Courses
            </Link>
            <Link 
              href="/about" 
              className={`transition-colors font-medium ${
                isActive('/about') 
                  ? 'text-[#ff4a03]' 
                  : 'text-gray-700 hover:text-[#ff4a03]'
              }`}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`transition-colors font-medium ${
                isActive('/contact') 
                  ? 'text-[#ff4a03]' 
                  : 'text-gray-700 hover:text-[#ff4a03]'
              }`}
            >
              Contact
            </Link>
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
  );
}