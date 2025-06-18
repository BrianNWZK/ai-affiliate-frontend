"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Play, Pause, Settings, TrendingUp, Mail, FileText, Share2, DollarSign, Target,
  Calendar, BarChart3, Bot, Zap, Clock, CreditCard, FilePlus, ShoppingCart, Star, 
  Users, AlertCircle, ExternalLink, Rocket, TrendingDown, Eye , MousePointer, Gift,
  Brain, Globe, Network, Cpu, Activity, Command, Shield, Crown, Layers, Workflow,
  Sparkles, Radar, Atom, Infinity, Hexagon, Satellite, Gamepad2, Gauge
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
  const [blogPost, setBlogPost] = useState(null);
  const [quantumMatches, setQuantumMatches] = useState(0);
  const API = process.env.NEXT_PUBLIC_API_URL || "https://ai-affiliate-backend.onrender.com";

  useEffect(() => {
    fetch(`${API}/paystack/neural-revenue`)
      .then(res => res.json())
      .then(data => {
        if (data?.total !== undefined) {
          setStats(prev => ({ ...prev, revenue: data.total }));
        }
      });
  }, [API]);

  const handleBuyNow = async () => {
    try {
      const res = await fetch(`${API}/paystack/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "buyer@example.com",
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
      alert("Error during checkout");
    }
  };

  const automationTasks = [
    "Analyzing trending keywords...",
    "Generating SEO-optimized blog...",
    "Creating affiliate product review...",
    "Sending email campaigns...",
    "Posting to socials...",
    "Generating video scripts...",
    "/neural/economic-predictions",
    "/neural/deploy-agents",
    "/neural/deploy-single-agent",
    "/neural/activate-economic-system",
    "/neural/quantum-matching",
    "/neural/butterfly-effect",
    "/neural/emergency-stop",
    "/analytics/neural-track"
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
        setAutomationLog(prev => [...prev.slice(-4), {
          time: new Date().toLocaleTimeString(),
          task, id: Date.now()
        }]);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

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

        <div className="bg-white/10 p-4 rounded-xl mb-6 border border-white/20">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <FilePlus size={18} /> AI Blog Generator
          </h3>
          <button
            onClick={async () => {
              const res = await fetch(`${API}/api/generate-blog`);
              const data = await res.json();
              setBlogPost(data);
            }}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg mb-4"
          >
            Generate Blog Post
          </button>
          {blogPost && (
            <div className="text-white space-y-2 text-sm">
              <h4 className="font-bold text-lg">{blogPost.title}</h4>
              <p>{blogPost.intro}</p>
              <div dangerouslySetInnerHTML={{ __html: blogPost.body }} />
            </div>
          )}
        </div>

        <div className="bg-white/10 p-4 rounded-xl mb-6 border border-white/20">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Radar size={18} /> Quantum Matches: {quantumMatches}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default AffiliateMarketingAI;
