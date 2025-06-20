"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Play, Pause, Mail, FileText, Share2, DollarSign, 
  Target, TrendingUp, Clock, CreditCard, Loader2, AlertCircle, CheckCircle
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://ai-affiliate-backend.onrender.com";

const AffiliateMarketingAI = () => {
  // ========== 1. ENHANCED STATE MANAGEMENT ========== //
  const [automationState, setAutomationState] = useState({
    isRunning: false,
    isPaused: false,
    isLoading: false,
    lastError: null
  });

  const [stats, setStats] = useState({
    revenue: null, // null = uninitialized state
    content: 0,
    emails: 0,
    posts: 0,
    leads: 0,
    conversions: 0,
    _lastUpdated: null
  });

  const [activityLog, setActivityLog] = useState([]);
  const [currency, setCurrency] = useState("NGN");
  const [currentTask, setCurrentTask] = useState("System ready");

  // ========== 2. BULLETPROOF DATA FETCHING ========== //
  const fetchRevenue = useCallback(async () => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);

      const res = await fetch(`${API_URL}/paystack/revenue?currency=${currency}`, {
        signal: controller.signal
      });
      clearTimeout(timeout);

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      const revenue = data?.total ?? 0;

      setStats(prev => ({
        ...prev,
        revenue,
        _lastUpdated: new Date().toISOString()
      }));

      logActivity(`💰 Revenue updated: ₦${revenue.toLocaleString()}`);
      return revenue;
    } catch (err) {
      console.error("Revenue fetch failed:", err);
      logActivity("⚠️ Using cached revenue data");
      return stats.revenue ?? 0;
    }
  }, [currency]);

  // ========== 3. ROBUST AUTOMATION CONTROL ========== //
  const toggleAutomation = useCallback(async (action) => {
    try {
      setAutomationState(prev => ({
        ...prev,
        isLoading: true,
        lastError: null
      }));

      const res = await fetch(`${API_URL}/affiliate/automation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, currency })
      });

      if (!res.ok) throw new Error(await res.text());

      setAutomationState({
        isRunning: action === "start",
        isPaused: action === "pause",
        isLoading: false,
        lastError: null
      });

      logActivity(
        action === "start" ? "🚀 Automation started" :
        action === "pause" ? "⏸ Automation paused" :
        "🛑 Automation stopped"
      );
    } catch (err) {
      console.error("Automation control error:", err);
      setAutomationState(prev => ({
        ...prev,
        isLoading: false,
        lastError: err.message
      }));
      logActivity(`❌ ${err.message}`);
    }
  }, [currency]);

  // ========== 4. TASK SIMULATION ENGINE ========== //
  const automationTasks = [
    "Analyzing trending keywords...",
    "Generating SEO-optimized content...",
    "Creating product reviews...",
    "Sending email campaigns...",
    "Posting to social media...",
    "Optimizing conversion paths..."
  ];

  useEffect(() => {
    let interval;
    if (automationState.isRunning && !automationState.isPaused) {
      interval = setInterval(() => {
        const task = automationTasks[Math.floor(Math.random() * automationTasks.length)];
        setCurrentTask(task);
        
        // Simulate metrics growth
        setStats(prev => ({
          ...prev,
          content: prev.content + 1,
          emails: prev.emails + 25,
          posts: prev.posts + 2,
          leads: prev.leads + 3,
          conversions: prev.conversions + 1
        }));

        logActivity(task);
        fetchRevenue();
      }, 5000); // More realistic 5s interval
    }
    return () => clearInterval(interval);
  }, [automationState.isRunning, automationState.isPaused, fetchRevenue]);

  // ========== 5. PAYMENT PROCESSING ========== //
  const handlePayment = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/paystack/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "user@example.com",
          amount: 100000, // 1000 NGN in kobo
          currency
        })
      });

      const data = await res.json();
      if (data.authorization_url) {
        window.open(data.authorization_url, "_blank");
        logActivity("🔗 Payment link generated");
      } else {
        throw new Error("Failed to create payment link");
      }
    } catch (err) {
      console.error("Payment error:", err);
      logActivity(`❌ Payment failed: ${err.message}`);
    }
  }, [currency]);

  // ========== 6. HELPER FUNCTIONS ========== //
  const logActivity = (message) => {
    setActivityLog(prev => [
      ...prev.slice(-9), // Keep last 10 entries
      {
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        message,
        icon: message.startsWith("⚠️") ? AlertCircle :
              message.startsWith("❌") ? AlertCircle :
              message.startsWith("💰") ? DollarSign :
              CheckCircle
      }
    ]);
  };

  const formatCurrency = (value, curr = currency) => {
    const symbols = { NGN: "₦", USD: "$", GBP: "£", EUR: "€" };
    return `${symbols[curr]}${(value || 0).toLocaleString()}`;
  };

  // ========== 7. COMPONENT RENDER ========== //
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6 text-white">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
            <FileText className="text-cyan-400" /> 
            AI Affiliate Marketing System
          </h1>
          <p className="text-white/80 mt-2">Automated content generation & campaign management</p>
        </header>

        {/* Control Panel */}
        <section className="bg-white/10 p-6 rounded-xl mb-8 border border-white/20">
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
                    {formatCurrency(0, curr).replace(/0/g, '')} {curr}
                  </option>
                ))}
              </select>

              <button
                onClick={handlePayment}
                disabled={automationState.isLoading}
                className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg font-medium disabled:opacity-50"
              >
                <CreditCard size={18} /> Buy Now
              </button>

              <button
                onClick={() => toggleAutomation(automationState.isRunning ? "stop" : "start")}
                disabled={automationState.isLoading}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium disabled:opacity-50 ${
                  automationState.isRunning ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {automationState.isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : automationState.isRunning ? (
                  <Pause size={20} />
                ) : (
                  <Play size={20} />
                )}
                {automationState.isRunning ? "Stop" : "Start"}
              </button>
            </div>
          </div>

          {automationState.isRunning && (
            <p className="mt-4 text-blue-300 flex items-center gap-2">
              <Clock size={16} />
              {currentTask}
              {automationState.isPaused && "(Paused)"}
            </p>
          )}
        </section>

        {/* Stats Dashboard */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {[
            { label: "Revenue", value: stats.revenue !== null ? formatCurrency(stats.revenue) : "--", icon: DollarSign },
            { label: "Content", value: stats.content, icon: FileText },
            { label: "Emails", value: stats.emails, icon: Mail },
            { label: "Posts", value: stats.posts, icon: Share2 },
            { label: "Leads", value: stats.leads, icon: Target },
            { label: "Conversions", value: stats.conversions, icon: TrendingUp }
          ].map((stat) => (
            <div key={stat.label} className="bg-white/10 p-4 rounded-xl flex flex-col">
              <p className="text-sm text-gray-300 mb-1">{stat.label}</p>
              <div className="flex items-end justify-between">
                <p className="text-xl font-bold">{stat.value}</p>
                <stat.icon size={20} className="opacity-80" />
              </div>
            </div>
          ))}
        </section>

        {/* Activity Log */}
        <section className="bg-white/10 p-6 rounded-xl border border-white/20">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="text-cyan-400" /> Activity Log
          </h3>
          <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
            {activityLog.length > 0 ? (
              activityLog.map(log => (
                <div key={log.id} className="text-sm flex items-start gap-2">
                  <span className="text-cyan-400 font-mono">{log.time}</span>
                  <span className="flex-1">{log.message}</span>
                  <log.icon size={16} className="flex-shrink-0" />
                </div>
              ))
            ) : (
              <p className="text-gray-400 italic">No activities yet. Start automation to begin tracking.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AffiliateMarketingAI;
