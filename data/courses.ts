import { Code as Code2, Palette, TrendingUp, Video, FileText, Briefcase} from 'lucide-react';

export const courses = [
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