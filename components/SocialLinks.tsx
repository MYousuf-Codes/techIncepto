"use client";

import { Facebook, Instagram, Youtube, MessageCircle, Mail, Phone } from 'lucide-react';

interface SocialLinksProps {
  className?: string;
  iconSize?: string;
  showLabels?: boolean;
}

export function SocialLinks({ className = "", iconSize = "h-6 w-6", showLabels = false }: SocialLinksProps) {
  const socialLinks = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      url: "https://wa.me/923107796560",
      color: "hover:text-green-500"
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://facebook.com/techincepto",
      color: "hover:text-blue-600"
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/techincepto",
      color: "hover:text-pink-500"
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://youtube.com/@techincepto",
      color: "hover:text-red-500"
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:techincepto@gmail.com",
      color: "hover:text-blue-500"
    }
  ];

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-gray-400 ${social.color} transition-colors ${showLabels ? 'flex items-center space-x-2' : ''}`}
          aria-label={social.name}
        >
          <social.icon className={iconSize} />
          {showLabels && <span className="text-sm">{social.name}</span>}
        </a>
      ))}
    </div>
  );
}