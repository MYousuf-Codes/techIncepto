"use client";

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/student/Sidebar';
import { Topbar } from '@/components/student/Topbar';
import { cn } from '@/lib/utils';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle responsive sidebar behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(true);
        setMobileMenuOpen(false);
      } else {
        setMobileMenuOpen(false);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setMobileMenuOpen(!mobileMenuOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 transition-transform duration-300 lg:relative lg:translate-x-0",
        "lg:flex lg:flex-col",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <Sidebar 
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={toggleSidebar}
          className="h-full"
        />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <Topbar onToggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}