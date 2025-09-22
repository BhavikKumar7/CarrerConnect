import {
  Search,
  Users,
  FileText,
  MessageSquare,
  BarChart3,
  Shield,
  Clock,
  Award,
  Briefcase,
  Building2,
  LayoutDashboard,
  Plus,
} from "lucide-react";

export const jobSeekerFeatures = [
  {
    icon: Search,
    title: "Smart Job Matching",
    description: "AI-powered algorithm you with relevent opportunities based on your skills and preferences.",
  },
  {
    icon: FileText,
    title: "Resume Builder",
    description: "Create professional resumes with our intutuve builder and templates designed by experts.",
  },
  {
    icon: MessageSquare,
    title: "Direct Communication",
    description: "Connect directly with hiring managers and recruties through our secure messaging platform.",
  },
  {
    icon: Award,
    title: "Skill Assessment",
    description: "Showcase your abilities with verified skill tests and earn badges that employers trust.",
  },
];

export const employerFeatures = [
  {
    icon: Users,
    title: "Talent Pool Access",
    description: "Access our vast database of pre-screened candidates and find the perfect fit for your team.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track your hiring performance with detailed analytics and insights on candidate engagement.",
  },
  {
    icon: Shield,
    title: "Verified Candidates",
    description: "All candidates undergo background verfication to ensure you're hiring trustworthy professionals.",
  },
  {
    icon: Clock,
    title: "Quick Hiring",
    description: "Streamlined hiring process reduces time-to-hire by 60% with automated screening tools.",
  },
];

export const NAVIGATION_MENU = [
  {
    id: "employer-dashboard",
    name: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "post-job",
    name: "Post Job",
    icon: Plus,
  },
  {
    id: "manage-jobs",
    name: "Manage Jobs",
    icon: Briefcase,
  },
  {
    id: "company-profile",
    name: "Company Profile",
    icon: Building2,
  },
];

export const CATEGORIES = [
  {
    value: "Engineering",
    label: "Engineering",
  },
  {
    value: "Design",
    label: "Design",
  },
  {
    value: "Marketing",
    label: "Marketing",
  },
  {
    value: "Sales",
    label: "Sales",
  },
  {
    value: "IT & Software",
    label: "IT & Software",
  },
  {
    value: "Customer-service",
    label: "Customer Service",
  },
  {
    value: "Product",
    label: "Product",
  },
  {
    value: "Operations",
    label: "Operations",
  },
  {
    value: "Finance",
    label: "Finance",
  },
  {
    value: "HR",
    label: "Human Resources",
  },
  {
    value: "Other",
    label: "Other",
  },
];

export const JOB_TYPES = [
  {
    value: "Remote",
    label: "Remote",
  },
  {
    value: "Full-Time",
    label: "Full-Time",
  },
  {
    value: "Part-Time",
    label: "Part-Time",
  },
  {
    value: "Contract",
    label: "Contract",
  },
  {
    value: "Internship",
    label: "Internship",
  },
];

export const SALARY_RANGES = [
  "Less than 10 LPA",
  "10 LPA to 20 LPA",
  "More than 20 LPA",
];

export const THEMES = [
  {
    name: "winter",
    label: "Winter",
    colors: ["#ffffff", "#0284c7", "#d946ef", "#0f172a"],
  },
  {
    name: "forest",
    label: "Forest",
    colors: ["#1f1d1d", "#3ebc96", "#70c217", "#e2e8f0"],
  },
  {
    name: "corporate",
    label: "Corporate",
    colors: ["#ffffff", "#4b6bfb", "#7b92b2", "#1d232a"],
  },
  {
    name: "night",
    label: "Night",
    colors: ["#0f172a", "#38bdf8", "#818cf8", "#e2e8f0"],
  },
  {
    name: "lofi",
    label: "Lofi",
    colors: ["#0f0f0f", "#1a1919", "#232323", "#2c2c2c"],
  },
  {
    name: "fantasy",
    label: "Fantasy",
    colors: ["#ffe7d6", "#a21caf", "#3b82f6", "#f59e0b"],
  },
  {
    name: "black",
    label: "Black",
    colors: ["#000000", "#191919", "#313131", "#4a4a4a"],
  },
  {
    name: "light",
    label: "Light",
    colors: ["#ffffff", "#5a67d8", "#8b5cf6", "#1a202c"],
  },
  {
    name: "cupcake",
    label: "Cupcake",
    colors: ["#f5f5f4", "#65c3c8", "#ef9fbc", "#291334"],
  },
  {
    name: "dark",
    label: "Dark",
    colors: ["#1f2937", "#8b5cf6", "#ec4899", "#1a202c"],
  },
  {
    name: "bumblebee",
    label: "Bumblebee",
    colors: ["#ffffff", "#f8e36f", "#f0d50c", "#1c1917"],
  },
  {
    name: "emerald",
    label: "Emerald",
    colors: ["#ffffff", "#66cc8a", "#3b82f6", "#1e3a8a"],
  },
  {
    name: "synthwave",
    label: "Synthwave",
    colors: ["#2d1b69", "#e779c1", "#58c7f3", "#f8f8f2"],
  },
  {
    name: "retro",
    label: "Retro",
    colors: ["#e4d8b4", "#ea6962", "#6aaa64", "#282425"],
  },
  {
    name: "cyberpunk",
    label: "Cyberpunk",
    colors: ["#ffee00", "#ff7598", "#75d1f0", "#1a103d"],
  },
  {
    name: "valentine",
    label: "Valentine",
    colors: ["#f0d6e8", "#e96d7b", "#a991f7", "#37243c"],
  },
  {
    name: "halloween",
    label: "Halloween",
    colors: ["#0d0d0d", "#ff7800", "#006400", "#ffffff"],
  },
  {
    name: "garden",
    label: "Garden",
    colors: ["#e9e7e7", "#ec4899", "#16a34a", "#374151"],
  },

  {
    name: "aqua",
    label: "Aqua",
    colors: ["#193549", "#4cd4e3", "#9059ff", "#f8d766"],
  },
  {
    name: "pastel",
    label: "Pastel",
    colors: ["#f7f3f5", "#d1c1d7", "#a1e3d8", "#4a98f1"],
  },
  {
    name: "wireframe",
    label: "Wireframe",
    colors: ["#e6e6e6", "#b3b3b3", "#b3b3b3", "#888888"],
  },
  {
    name: "luxury",
    label: "Luxury",
    colors: ["#171618", "#1e293b", "#94589c", "#d4a85a"],
  },
  {
    name: "dracula",
    label: "Dracula",
    colors: ["#282a36", "#ff79c6", "#bd93f9", "#f8f8f2"],
  },
  {
    name: "cmyk",
    label: "CMYK",
    colors: ["#f0f0f0", "#0891b2", "#ec4899", "#facc15"],
  },
  {
    name: "autumn",
    label: "Autumn",
    colors: ["#f2f2f2", "#8c1f11", "#f28c18", "#6f4930"],
  },
  {
    name: "business",
    label: "Business",
    colors: ["#f5f5f5", "#1e40af", "#3b82f6", "#f97316"],
  },
  {
    name: "acid",
    label: "Acid",
    colors: ["#110e0e", "#ff00f2", "#ff7a00", "#99ff01"],
  },
  {
    name: "lemonade",
    label: "Lemonade",
    colors: ["#ffffff", "#67e8f9", "#f5d742", "#2c3333"],
  },
  {
    name: "coffee",
    label: "Coffee",
    colors: ["#20161f", "#dd9866", "#497174", "#eeeeee"],
  },
  {
    name: "dim",
    label: "Dim",
    colors: ["#1c1c27", "#10b981", "#ff5a5f", "#0f172a"],
  },
  {
    name: "nord",
    label: "Nord",
    colors: ["#eceff4", "#5e81ac", "#81a1c1", "#3b4252"],
  },
  {
    name: "sunset",
    label: "Sunset",
    colors: ["#1e293b", "#f5734c", "#ec4899", "#ffffff"],
  },
];