"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Play, Pause, Mail, FileText, Share2, DollarSign, 
  Target, TrendingUp, Clock, CreditCard, Loader2, 
  AlertCircle, CheckCircle, RefreshCw
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://ai-affiliate-backend.onrender.com";

const AffiliateMarketingAI = () => {
  // ===== 1. Enhanced State Management =====
  const [automation, setAutomation] = useState({
    status: 'idle', // 'idle' | 'starting' | 'running' | 'stopping' | 'error'
    currentTask: 'System ready',
    error: null
  });

  const [stats, setStats] = useState({
    revenue: null,
    content: 0,
    emails: 0,
    posts: 0,
    leads: 0,
    conversions: 0,
    lastUpdated: null
  });

  const [activityLog, setActivityLog] = useState([]);
  const [currency, setCurrency] = useState("NGN");
  const automationTasks = useRef([
    "Analyzing market trends...",
    "Generating affiliate content...",
    "Optimizing campaign performance...",
    "Scheduled email dispatch...",
    "Updating social channels..."
  ]);

  // ===== 2. Robust API Client =====
  const apiClient = useCallback(async (endpoint, options = {}) => {
    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          ...options.headers
        }
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText.startsWith('<!DOCTYPE') 
          ? "Server returned HTML error page" 
          : errorText);
      }

      return await res.json();
    } catch (err) {
      console.error(`API Error (${endpoint}):`, err);
      throw err;
    }
  }, []);

  // ===== 3. Automation Control =====
  const toggleAutomation = useCallback(async () => {
    try {
      setAutomation(prev => ({
        ...prev,
        status: prev.status === 'running' ? 'stopping' : 'starting',
        error: null
      }));

      const action = automation.status === 'running' ? 'stop' : 'start';
      await apiClient('/affiliate/automation', {
        method: 'POST',
        body: JSON.stringify({ 
          action,
          currency,
          timestamp: new Date().toISOString()
        })
      });

      setAutomation(prev => ({
        status: action === 'start' ? 'running' : 'idle',
        currentTask: action === 'start' 
          ? "Initializing campaigns..." 
          : "System ready",
        error: null
      }));

      logActivity(action === 'start' 
        ? "🚀 Automation started" 
        : "🛑 Automation stopped");

    } catch (err) {
      setAutomation(prev => ({
        ...prev,
        status: 'error',
        error: err.message,
        currentTask: `Error: ${err.message.split('\n')[0]}`
      }));
      logActivity(`❌ ${err.message.split('\n')[0]}`);
    }
  }, [apiClient, currency, automation.status]);

  // ===== 4. Task Engine =====
  useEffect(() => {
    let interval;
    if (automation.status === 'running') {
      let taskIndex = 0;
      
      const updateTask = () => {
        taskIndex = (taskIndex + 1) % automationTasks.current.length;
        setAutomation(prev => ({
          ...prev,
          currentTask: automationTasks.current[taskIndex]
        }));
      };

      interval = setInterval(() => {
        updateTask();
        
        // Simulate organic metric growth
        setStats(prev => ({
          ...prev,
          content: prev.content + 1,
          emails: prev.emails + Math.floor(Math.random() * 5),
          posts: prev.posts + (Math.random() > 0.8 ? 1 : 0),
          leads: prev.leads + Math.floor(Math.random() * 2),
          conversions: prev.conversions + (Math.random() > 0.95 ? 1 : 0),
          lastUpdated: new Date().toISOString()
        }));
      }, 5000); // More natural 5s interval

      // Initial update
      updateTask();
    }

    return () => clearInterval(interval);
  }, [automation.status]);

  // ===== 5. Data Fetching =====
  const fetchRevenue = useCallback(async () => {
    try {
      const data = await apiClient(`/paystack/revenue?currency=${currency}`);
      setStats(prev => ({
        ...prev,
        revenue: data?.total || 0,
        lastUpdated: new Date().toISOString()
      }));
    } catch (err) {
      logActivity("⚠️ Using cached revenue data");
    }
  }, [apiClient, currency]);

  // ===== 6. Payment Processing =====
  const handlePayment = useCallback(async () => {
    try {
      setAutomation(prev => ({ ...prev, status: 'starting' }));
      
      const data = await apiClient('/paystack/checkout', {
        method: 'POST',
        body: JSON.stringify({
          email: "user@example.com",
          amount: 100000, // ₦1000 in kobo
          currency,
          metadata: {
            source: "affiliate_dashboard",
            timestamp: new Date().toISOString()
          }
        })
      });

      if (data.authorization_url) {
        window.open(data.authorization_url, "_blank", "noopener,noreferrer");
        logActivity("🔗 Payment initiated");
      }
    } catch (err) {
      logActivity(`❌ Payment failed: ${err.message.split('\n')[0]}`);
    } finally {
      setAutomation(prev => prev.status === 'starting' 
        ? { ...prev, status: 'idle' } 
        : prev);
    }
  }, [apiClient, currency]);

  // ===== 7. Helper Functions =====
  const logActivity = useCallback((message) => {
    setActivityLog(prev => [
      ...prev.slice(-14), // Keep last 15 entries
      {
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        message,
        icon: message.startsWith("❌") ? AlertCircle : 
              message.startsWith("⚠️") ? AlertCircle : 
              CheckCircle
      }
    ]);
  }, []);

  const formatCurrency = useCallback((value) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency
    }).format(value || 0);
  }, [currency]);

  // ===== 8. Initial Data Load =====
  useEffect(() => {
    fetchRevenue();
  }, [fetchRevenue]);

  // ===== 9. Component Render =====
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6 text-white">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <header className="space-y-2">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FileText className="text-cyan-400" />
            Affiliate Marketing Dashboard
          </h1>
          <p className="text-white/80">Automated campaign management system</p>
        </header>

        {/* Control Panel */}
        <section className="bg-white/10 p-6 rounded-xl border border-white/20 space-y-4">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Clock className="text-yellow-400" /> Control Panel
            </h2>
            
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg hover:bg-white/20 transition"
              >
                {["NGN", "USD", "GBP", "EUR"].map(curr => (
                  <option key={curr} value={curr}>
                    {curr}
                  </option>
                ))}
              </select>

              <button
                onClick={handlePayment}
                disabled={automation.status === 'starting'}
                className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg transition disabled:opacity-50"
              >
                <CreditCard size={18} /> Buy Now
              </button>

              <button
                onClick={toggleAutomation}
                disabled={automation.status === 'starting' || automation.status === 'stopping'}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg transition ${
                  automation.status === 'running' 
                    ? "bg-red-600 hover:bg-red-700" 
                    : "bg-green-600 hover:bg-green-700"
                } disabled:opacity-50`}
              >
                {automation.status === 'starting' || automation.status === 'stopping' ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : automation.status === 'running' ? (
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

          {/* Status Bar */}
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${
              automation.status === 'running' ? 'bg-green-500 animate-pulse' :
              automation.status === 'error' ? 'bg-red-500' : 'bg-gray-500'
            }`} />
            <p className="text-blue-300 flex-1 truncate">
              {automation.currentTask}
            </p>
            {automation.status === 'error' && (
              <button 
                onClick={() => setAutomation(prev => ({ ...prev, error: null }))}
                className="text-red-400 hover:text-red-300"
              >
                <RefreshCw size={16} />
              </button>
            )}
          </div>
        </section>

        {/* Stats Dashboard */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: "Revenue", value: stats.revenue, icon: DollarSign },
            { label: "Content", value: stats.content, icon: FileText },
            { label: "Emails", value: stats.emails, icon: Mail },
            { label: "Posts", value: stats.posts, icon: Share2 },
            { label: "Leads", value: stats.leads, icon: Target },
            { label: "Conversions", value: stats.conversions, icon: TrendingUp }
          ].map((stat) => (
            <div key={stat.label} className="bg-white/10 p-4 rounded-xl hover:bg-white/20 transition">
              <div className="flex items-center gap-2 text-gray-300 mb-1">
                <stat.icon size={16} />
                <span className="text-sm">{stat.label}</span>
              </div>
              <p className="text-xl font-bold">
                {stat.value !== null ? 
                  (stat.label === "Revenue" ? formatCurrency(stat.value) : stat.value) 
                  : "--"}
              </p>
            </div>
          ))}
        </section>

        {/* Activity Log */}
        <section className="bg-white/10 p-6 rounded-xl border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="text-cyan-400" /> Activity Log
            </h3>
            <button 
              onClick={() => setActivityLog([])}
              className="text-sm text-gray-400 hover:text-white"
            >
              Clear
            </button>
          </div>
          
          <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
            {activityLog.length > 0 ? (
              activityLog.map(log => (
                <div key={log.id} className="text-sm flex items-start gap-2">
                  <span className="text-cyan-400 font-mono">{log.time}</span>
                  <span className="flex-1">{log.message}</span>
                  <log.icon size={16} className="flex-shrink-0 mt-0.5" />
                </div>
              ))
            ) : (
              <p className="text-gray-400 italic">No activities recorded</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AffiliateMarketingAI;
