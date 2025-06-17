// ai-affiliate-frontend/package.json
{
  "name": "ai-affiliate-frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "autoprefixer": "^10.4.14",
    "lucide-react": "^0.270.0",
    "next": "^13.5.6",
    "postcss": "^8.4.21",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwindcss": "^3.3.2"
  }
}

// ai-affiliate-frontend/postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

// ai-affiliate-frontend/tailwind.config.js
module.exports = {
  content: ["./pages/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

// ai-affiliate-frontend/styles/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

// ai-affiliate-frontend/.gitignore
node_modules
.next
.env.local

// ai-affiliate-frontend/.env.local
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com

// ai-affiliate-frontend/pages/index.js
export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold">Welcome to AI Affiliate Marketing System</h1>
    </div>
  );
}

// ai-affiliate-frontend/pages/dashboard.jsx
"use client";
import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  Settings,
  TrendingUp,
  Mail,
  FileText,
  Share2,
  DollarSign,
  Target,
  Calendar,
  BarChart3,
  Bot,
  Zap,
  Clock,
} from "lucide-react";

const AffiliateMarketingAI = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentTask, setCurrentTask] = useState("");
  const [stats, setStats] = useState({
    contentCreated: 0,
    emailsSent: 0,
    socialPosts: 0,
    leads: 0,
    revenue: 0,
    conversions: 0,
  });
  const [automationLog, setAutomationLog] = useState([]);

  const automationTasks = [
    "Analyzing trending keywords in your niche...",
    "Generating SEO-optimized blog post outline...",
    "Creating affiliate product review content...",
    "Scheduling social media posts...",
    "Sending personalized email campaigns...",
    "Optimizing conversion rates...",
    "Analyzing competitor strategies...",
    "Updating product recommendations...",
    "Generating video scripts...",
    "Creating Pinterest pins...",
  ];

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        const randomTask =
          automationTasks[Math.floor(Math.random() * automationTasks.length)];
        setCurrentTask(randomTask);

        setStats((prev) => ({
          contentCreated: prev.contentCreated + Math.floor(Math.random() * 3),
          emailsSent: prev.emailsSent + Math.floor(Math.random() * 50),
          socialPosts: prev.socialPosts + Math.floor(Math.random() * 5),
          leads: prev.leads + Math.floor(Math.random() * 10),
          revenue: prev.revenue + Math.floor(Math.random() * 100),
          conversions: prev.conversions + Math.floor(Math.random() * 2),
        }));

        setAutomationLog((prev) => [
          ...prev.slice(-4),
          {
            time: new Date().toLocaleTimeString(),
            task: randomTask,
            id: Date.now(),
          },
        ]);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const automationModules = [
    {
      name: "Content Generator",
      description: "AI creates SEO-optimized blog posts, product reviews, and comparisons",
      active: true,
      icon: FileText,
    },
    {
      name: "Social Media Manager",
      description: "Automatically posts content across all social platforms",
      active: true,
      icon: Share2,
    },
    {
      name: "Email Marketing",
      description: "Sends personalized email sequences to nurture leads",
      active: true,
      icon: Mail,
    },
    {
      name: "SEO Optimizer",
      description: "Optimizes content for search engines and tracks rankings",
      active: true,
      icon: TrendingUp,
    },
    {
      name: "Lead Magnet Creator",
      description: "Creates and deploys lead magnets to capture emails",
      active: false,
      icon: Target,
    },
    {
      name: "Performance Tracker",
      description: "Monitors affiliate links and optimizes for conversions",
      active: true,
      icon: BarChart3,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6 text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 flex items-center gap-3">
          <Bot className="text-cyan-400" size={40} /> AI Affiliate Marketing Dashboard
        </h1>

        <div className="bg-white/10 p-6 rounded-xl mb-6 border border-white/20">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Zap className="text-yellow-400" /> Control Panel
            </h2>
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`px-6 py-2 rounded-lg text-white font-semibold transition-all ${
                isRunning ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {isRunning ? <Pause size={20} /> : <Play size={20} />} {isRunning ? "Pause" : "Start"}
            </button>
          </div>
          {isRunning && (
            <div className="text-blue-300 mt-4">
              <Clock size={16} className="inline mr-2" />
              {currentTask}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {[
            { label: "Revenue", value: `$${stats.revenue}`, icon: DollarSign },
            { label: "Content Created", value: stats.contentCreated, icon: FileText },
            { label: "Emails Sent", value: stats.emailsSent, icon: Mail },
            { label: "Social Posts", value: stats.socialPosts, icon: Share2 },
            { label: "Leads", value: stats.leads, icon: Target },
            { label: "Conversions", value: stats.conversions, icon: TrendingUp },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white/10 p-4 rounded-xl flex items-center justify-between border border-white/10"
            >
              <div>
                <p className="text-sm text-gray-300">{stat.label}</p>
                <p className="text-xl font-bold text-white">{stat.value}</p>
              </div>
              <stat.icon size={24} className="text-white" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/10 p-4 rounded-xl border border-white/10">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Settings className="text-cyan-400" /> Automation Modules
            </h3>
            <div className="space-y-2">
              {automationModules.map((mod, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3 rounded-md bg-white/5 border border-white/10"
                >
                  <div className="flex items-center gap-3">
                    <mod.icon size={20} className="text-cyan-300" />
                    <div>
                      <p className="font-medium">{mod.name}</p>
                      <p className="text-sm text-gray-400">{mod.description}</p>
                    </div>
                  </div>
                  <span
                    className={`w-3 h-3 rounded-full ${mod.active ? "bg-green-400" : "bg-gray-400"}`}
                  ></span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 p-4 rounded-xl border border-white/10">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Calendar className="text-cyan-400" /> Activity Log
            </h3>
            <div className="space-y-2">
              {automationLog.length ? (
                automationLog.map((log) => (
                  <div key={log.id} className="text-sm text-white">
                    <span className="text-cyan-400 font-mono">{log.time}</span> — {log.task}
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No activity yet. Start automation to begin logging.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateMarketingAI;
