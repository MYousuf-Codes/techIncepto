"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SocialLinks } from "@/components/SocialLinks";
import { Code as Code2, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const handleEnrollClick = () => {
  const message = "Hi! I'm interested in enrolling in TECHINCEPTO courses. Can you please provide me with more information?";
  const whatsappUrl = `https://wa.me/923107796560?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { href: '/', label: 'Home' },
    { href: '/courses', label: 'Courses' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="fixed top-4 right-4 z-50 bg-white shadow-md">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-80 bg-white">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                <div className="w-10 h-10 bg-gradient-to-r from-[#ff4a03] to-[#ff6b35] rounded-lg flex items-center justify-center">
                  <Code2 className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-[#ff4a03] to-[#ff6b35] bg-clip-text text-transparent">
                  TECHINCEPTO
                </span>
              </Link>
            </div>
            
            <nav className="flex-1">
              <ul className="space-y-4">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block py-3 px-4 rounded-lg text-lg font-medium transition-colors ${
                        pathname === item.href
                          ? 'bg-orange-50 text-[#ff4a03]'
                          : 'text-gray-700 hover:bg-orange-50 hover:text-[#ff4a03]'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="mt-8">
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Follow Us</h3>
                <SocialLinks />
              </div>
              <Button 
                className="w-full bg-[#ff4a03] hover:bg-[#e63e02] text-white"
                onClick={() => {
                  handleEnrollClick();
                  setIsOpen(false);
                }}
              >
                Enroll Now
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}