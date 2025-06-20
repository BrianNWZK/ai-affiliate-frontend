"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Play, Pause, Mail, FileText, Share2, DollarSign, 
  Target, TrendingUp, Clock, CreditCard, Loader2, AlertCircle, CheckCircle
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://ai-affiliate-backend.onrender.com";

const AffiliateMarketingAI = () => {
  // ===== 1. Enhanced State Management =====
  const [automationState, setAutomationState] = useState({
    isRunning: false,
    isPaused: false,
    isLoading: false,
    currentTask: "System ready",
    error: null
  });

  const [stats, setStats] = useState({
    revenue: null,
    content: 0,
    emails: 0,
    posts: 0,
    leads: 0,
    conversions: 0,
    _lastUpdated: null
  });

  const [activityLog, setActivityLog] = useState([]);
  const [currency, setCurrency] = useState("NGN");

  // ===== 2. Improved Automation Control =====
  const toggleAutomation = useCallback(async () => {
    setAutomationState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const action = automationState.isRunning ? "stop" : "start";
      const res = await fetch(`${API_URL}/affiliate/automation`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": "Bearer YOUR_TOKEN" // Add if needed
        },
        body: JSON.stringify({ 
          action,
          currency,
          timestamp: new Date().toISOString()
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to toggle automation");
      }

      setAutomationState(prev => ({
        ...prev,
        isRunning: !prev.isRunning,
        isLoading: false,
        currentTask: !prev.isRunning ? "Initializing campaigns..." : "Stopping systems..."
      }));

      logActivity(!automationState.isRunning ? "🚀 Automation started" : "🛑 Automation stopped");

    } catch (err) {
      setAutomationState(prev => ({
        ...prev,
        isLoading: false,
        error: err.message,
        currentTask: `Error: ${err.message}`
      }));
      logActivity(`❌ ${err.message}`);
    }
  }, [automationState.isRunning, currency]);

  // ===== 3. Task Simulation Engine =====
  useEffect(() => {
    let interval;
    if (automationState.isRunning && !automationState.isPaused) {
      interval = setInterval(() => {
        // Rotate through realistic tasks
        setAutomationState(prev => {
          const tasks = [
            "Analyzing market trends...",
            "Generating affiliate content...",
            "Optimizing campaign performance...",
            "Scheduled email dispatch...",
            "Updating social channels..."
          ];
          const nextIndex = (tasks.indexOf(prev.currentTask) + 1) % tasks.length;
          return { ...prev, currentTask: tasks[nextIndex] };
        });

        // Simulate metrics
        setStats(prev => ({
          ...prev,
          content: prev.content + 1,
          emails: prev.emails + Math.floor(Math.random() * 10),
          posts: prev.posts + (Math.random() > 0.7 ? 1 : 0),
          leads: prev.leads + Math.floor(Math.random() * 3),
          conversions: prev.conversions + (Math.random() > 0.9 ? 1 : 0)
        }));

      }, 3000); // More realistic 3s interval
    }
    return () => clearInterval(interval);
  }, [automationState.isRunning, automationState.isPaused]);

  // ===== 4. Revenue Tracking =====
  const fetchRevenue = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/paystack/revenue?currency=${currency}`);
      const data = await res.json();
      
      setStats(prev => ({
        ...prev,
        revenue: data?.total || 0,
        _lastUpdated: new Date().toISOString()
      }));
      
    } catch (err) {
      console.error("Revenue fetch failed:", err);
      logActivity("⚠️ Using cached revenue data");
    }
  }, [currency]);

  // ===== 5. Payment Processing =====
  const handlePayment = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/paystack/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "user@example.com",
          amount: 100000, // ₦1000 in kobo
          currency,
          metadata: {
            source: "affiliate_dashboard"
          }
        })
      });

      const data = await res.json();
      if (data.authorization_url) {
        window.open(data.authorization_url, "_blank");
        logActivity("🔗 Payment initiated");
      }
    } catch (err) {
      logActivity(`❌ Payment failed: ${err.message}`);
    }
  }, [currency]);

  // ===== 6. Helper Functions =====
  const logActivity = (message) => {
    setActivityLog(prev => [
      ...prev.slice(-9),
      {
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        message,
        icon: message.startsWith("❌") ? AlertCircle : CheckCircle
      }
    ]);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency
    }).format(value || 0);
  };

  // ===== 7. Component Render =====
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6 text-white">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FileText className="text-cyan-400" />
            Affiliate Marketing Dashboard
          </h1>
        </header>

        {/* Control Panel */}
        <div className="bg-white/10 p-6 rounded-xl mb-8 border border-white/20">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Clock className="text-yellow-400" /> Control Panel
            </h2>
            
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg"
              >
                {["NGN", "USD", "GBP", "EUR"].map(curr => (
                  <option key={curr} value={curr}>
                    {curr}
                  </option>
                ))}
              </select>

              <button
                onClick={handlePayment}
                className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg"
              >
                <CreditCard size={18} /> Buy Now
              </button>

              <button
                onClick={toggleAutomation}
                disabled={automationState.isLoading}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg ${
                  automationState.isRunning 
                    ? "bg-red-600 hover:bg-red-700" 
                    : "bg-green-600 hover:bg-green-700"
                } ${automationState.isLoading ? "opacity-50" : ""}`}
              >
                {automationState.isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : automationState.isRunning ? (
                  <>
                    <Pause size={20} /> Stop
                  </>
                ) : (
                  <>
                    <Play size={20} /> Start
                  </>
                )}
              </button>
            </div>
          </div>

          {automationState.currentTask && (
            <p className="mt-4 text-blue-300 flex items-center gap-2">
              <Clock size={16} />
              {automationState.currentTask}
              {automationState.error && (
                <span className="text-red-400 ml-2">
                  ({automationState.error})
                </span>
              )}
            </p>
          )}
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {[
            { label: "Revenue", value: stats.revenue, icon: DollarSign },
            { label: "Content", value: stats.content, icon: FileText },
            { label: "Emails", value: stats.emails, icon: Mail },
            { label: "Posts", value: stats.posts, icon: Share2 },
            { label: "Leads", value: stats.leads, icon: Target },
            { label: "Conversions", value: stats.conversions, icon: TrendingUp }
          ].map((stat) => (
            <div key={stat.label} className="bg-white/10 p-4 rounded-xl">
              <div className="flex items-center gap-2 text-gray-300 mb-1">
                <stat.icon size={16} />
                <span className="text-sm">{stat.label}</span>
              </div>
              <p className="text-xl font-bold">
                {typeof stat.value === "number" ? stat.value : "--"}
              </p>
            </div>
          ))}
        </div>

        {/* Activity Log */}
        <div className="bg-white/10 p-6 rounded-xl border border-white/20">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="text-cyan-400" /> Activity Log
          </h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {activityLog.length > 0 ? (
              activityLog.map(log => (
                <div key={log.id} className="text-sm">
                  <span className="text-cyan-400">{log.time}</span> - {log.message}
                </div>
              ))
            ) : (
              <p className="text-gray-400">No activities recorded</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateMarketingAI;
