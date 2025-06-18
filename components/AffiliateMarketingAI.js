"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Play, Pause, Settings, TrendingUp, Mail,
  FileText, Share2, DollarSign, Target,
  Calendar, BarChart3, Bot, Zap, Clock, CreditCard
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
    conversions: 0
  });
  const [automationLog, setAutomationLog] = useState([]);
  const [currency, setCurrency] = useState("NGN");
  const API = process.env.NEXT_PUBLIC_API_URL;

  const fetchRevenue = useCallback(async () => {
    try {
      const res = await fetch(`${API}/paystack/revenue?currency=${currency}`);
      const data = await res.json();
      if (data?.total !== undefined) {
        setStats(prev => ({ ...prev, revenue: data.total }));
      }
    } catch (error) {
      console.error("Failed to fetch revenue:", error);
    }
  }, [API, currency]);

  useEffect(() => {
    fetchRevenue();
  }, [fetchRevenue]);

  const handleBuyNow = useCallback(async () => {
    try {
      const res = await fetch(`${API}/paystack/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "buyer@example.com", // Update with actual user email if needed
          amount: 1000,
          currency: currency
        })
      });

      const data = await res.json();
      if (data.authorization_url) {
        window.open(data.authorization_url, "_blank");
      } else {
        alert("Checkout failed. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An error occurred during payment.");
    }
  }, [API, currency]);

  const automationTasks = [
    "Analyzing trending keywords...",
    "Generating SEO-optimized blog...",
    "Creating affiliate product review...",
    "Sending email campaigns...",
    "Posting to socials...",
    "Generating video scripts..."
  ];

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        const task = automationTasks[Math.floor(Math.random() * automationTasks.length)];
        setCurrentTask(task);
        setStats(prev => ({
          ...prev,
          contentCreated: prev.contentCreated + 1,
          emailsSent: prev.emailsSent + 25,
          socialPosts: prev.socialPosts + 2,
          leads: prev.leads + 3,
          conversions: prev.conversions + 1
        }));
        setAutomationLog(prev => [
          ...prev.slice(-4), 
          { time: new Date().toLocaleTimeString(), task, id: Date.now() }
        ]);
        fetchRevenue();
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isRunning, fetchRevenue]);

  const automationModules = [
    { name: "Content Generator", description: "AI creates SEO-optimized blog posts, product reviews, and comparisons", active: true, icon: FileText },
    { name: "Social Media Manager", description: "Automatically posts content across all social platforms", active: true, icon: Share2 },
    { name: "Email Marketing", description: "Sends personalized email sequences to nurture leads", active: true, icon: Mail },
    { name: "SEO Optimizer", description: "Optimizes content for search engines and tracks rankings", active: true, icon: TrendingUp },
    { name: "Lead Magnet Creator", description: "Creates and deploys lead magnets to capture emails", active: false, icon: Target },
    { name: "Performance Tracker", description: "Monitors affiliate links and optimizes for conversions", active: true, icon: BarChart3 }
  ];

  const StatCard = ({ label, value, Icon }) => (
    <div className="bg-white/10 p-4 rounded-xl flex justify-between">
      <div>
        <p className="text-sm text-gray-300">{label}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
      <Icon size={24} />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6 text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 flex items-center gap-3">
          <Bot className="text-cyan-400" size={40} /> AI Affiliate Dashboard
        </h1>

        <div className="bg-white/10 p-6 rounded-xl mb-6 border border-white/20">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Zap className="text-yellow-400" /> Control Panel
            </h2>
            <div className="flex items-center gap-3">
              <select
                value={currency}
                onChange={e => setCurrency(e.target.value)}
                className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg"
              >
                <option value="NGN">₦ Naira</option>
                <option value="USD">$ US Dollar</option>
                <option value="GBP">£ British Pound</option>
                <option value="EUR">€ Euro</option>
              </select>
              <button
                onClick={handleBuyNow}
                className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg font-semibold"
              >
                <CreditCard size={18} /> Buy Now
              </button>
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg font-semibold ${
                  isRunning ? "bg-red-500" : "bg-green-500"
                }`}
              >
                {isRunning ? <Pause size={20} /> : <Play size={20} />} {isRunning ? "Pause" : "Start"}
              </button>
            </div>
          </div>
          {isRunning && (
            <p className="text-blue-300 mt-4">
              <Clock size={16} className="inline" /> {currentTask}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {[{ label: "Revenue", value: `${currency} ${stats.revenue}`, icon: DollarSign },
            { label: "Content", value: stats.contentCreated, icon: FileText },
            { label: "Emails", value: stats.emailsSent, icon: Mail },
            { label: "Posts", value: stats.socialPosts, icon: Share2 },
            { label: "Leads", value: stats.leads, icon: Target },
            { label: "Conversions", value: stats.conversions, icon: TrendingUp }]
            .map(({ label, value, icon: Icon }) => (
              <StatCard key={label} label={label} value={value} Icon={Icon} />
            ))}
        </div>

        <div className="bg-white/10 p-4 rounded-xl border border-white/20">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Calendar className="text-cyan-400" /> Activity Log
          </h3>
          {automationLog.length ? automationLog.map(log => (
            <p key={log.id} className="text-sm text-white">
              <span className="text-cyan-400 font-mono">{log.time}</span> — {log.task}
            </p>
          )) : <p className="text-gray-400">Start automation to see logs...</p>}
        </div>
      </div>
    </div>
  );
};

export default AffiliateMarketingAI;
