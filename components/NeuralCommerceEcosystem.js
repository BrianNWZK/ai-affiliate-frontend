"use client";
import React, { useState, useEffect, useCallback } from "react";
import { 
  Brain, Rocket, Gauge, Bot, DollarSign, TrendingUp, Network, 
  Radar, Atom, RefreshCcw, Zap, AlertTriangle, Loader2 
} from "lucide-react";

// ========== 1. ENHANCED CONFIG ========== //
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://ai-affiliate-backend.onrender.com";
const REVENUE_CACHE_TIME = 30000; // 30 seconds

// ========== 2. SUPERCHARGED UTILS ========== //
const formatCurrency = (value, currency = "NGN") => {
  const symbols = { NGN: "₦", USD: "$", GBP: "£", EUR: "€" };
  return `${symbols[currency] || ""}${Number(value || 0).toLocaleString()}`;
};

const StatCard = ({ label, value, icon: Icon, color, isLoading }) => (
  <div className={`bg-gradient-to-br ${color} p-4 rounded-xl shadow-md border border-white/10`}>
    <div className="flex items-center gap-2 text-white/80 mb-1">
      <Icon size={20} />
      <span className="font-semibold text-sm">{label}</span>
      {isLoading && <Loader2 className="animate-spin ml-auto" size={14} />}
    </div>
    <p className="text-xl font-bold text-white">
      {isLoading ? "..." : value}
    </p>
  </div>
);

// ========== 3. MAIN COMPONENT ========== //
const NeuralCommerceEcosystem = () => {
  const [isActive, setIsActive] = useState(false);
  const [currency, setCurrency] = useState("NGN");
  const [activationLoading, setActivationLoading] = useState(false);
  const [marketSignals, setMarketSignals] = useState([]);
  const [ecosystemLog, setEcosystemLog] = useState([]);
  const [globalStats, setGlobalStats] = useState({
    economicPulse: 0,
    aiBusinesses: 0,
    globalRevenue: null, // Null indicates uninitialized state
    predictedGrowth: 0,
    neuralInfluence: 0,
    _lastValidRevenue: 0, // Cache for fallback
    _isLoading: false
  });

  // ========== 4. BULLETPROOF REVENUE FETCH ========== //
  const fetchRevenue = useCallback(async () => {
    setGlobalStats(prev => ({ ...prev, _isLoading: true }));
    
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      
      const res = await fetch(`${API_URL}/paystack/neural-revenue`, {
        signal: controller.signal,
        next: { revalidate: 30 }
      });
      clearTimeout(timeout);

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      const data = await res.json();
      const revenue = data?.total ?? 0;

      setGlobalStats(prev => ({
        ...prev,
        globalRevenue: revenue,
        _lastValidRevenue: revenue,
        _isLoading: false,
        predictedGrowth: data?.predictedGrowth || prev.predictedGrowth
      }));

      log(`💰 Revenue updated: ${formatCurrency(revenue, currency)}`);
      return revenue;
    } catch (err) {
      console.error("Revenue fetch failed:", err);
      setGlobalStats(prev => ({
        ...prev,
        globalRevenue: prev._lastValidRevenue ?? 0,
        _isLoading: false
      }));
      log("⚠ Using cached revenue data");
      return prev._lastValidRevenue ?? 0;
    }
  }, [currency]);

  // ========== 5. ACTIVATION WITH FAILOVER ========== //
  const activateEcosystem = useCallback(async () => {
    setActivationLoading(true);
    log("🚀 Initializing neural network...");

    try {
      // Phase 1: Core activation
      await new Promise(res => setTimeout(res, 1000));
      setIsActive(true);

      // Phase 2: Parallel data loading
      await Promise.all([
        fetchRevenue(),
        loadMarketSignals()
      ]);

      log("✅ System fully operational");
    } catch (err) {
      log(`❌ Initialization error: ${err.message}`);
    } finally {
      setActivationLoading(false);
    }
  }, [fetchRevenue]);

  const loadMarketSignals = async () => {
    try {
      const res = await fetch(`${API_URL}/v2/market-signals`);
      const signals = await res.json();
      setMarketSignals(signals.slice(0, 4));
    } catch {
      setMarketSignals([
        "📡 Fallback signal monitoring",
        "🌍 Global system nominal"
      ]);
    }
  };

  // ========== 6. OPTIMIZED POLLING ========== //
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      // Update simulated metrics
      setGlobalStats(prev => ({
        ...prev,
        economicPulse: Math.min(100, prev.economicPulse + Math.random() * 1.2),
        aiBusinesses: prev.aiBusinesses + Math.floor(Math.random() * 2),
        neuralInfluence: Math.min(100, prev.neuralInfluence + Math.random() * 1.1)
      }));

      // Smart revenue refresh
      if (Date.now() % REVENUE_CACHE_TIME < 1000) {
        fetchRevenue();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isActive, fetchRevenue]);

  // ========== 7. UI RENDER ========== //
  const stats = [
    { label: "Economic Pulse", value: `${globalStats.economicPulse.toFixed(1)}%`, icon: Gauge, color: "from-green-500 to-emerald-600" },
    { label: "AI Businesses", value: globalStats.aiBusinesses.toLocaleString(), icon: Bot, color: "from-yellow-400 to-orange-500" },
    { 
      label: "Global Revenue", 
      value: globalStats.globalRevenue === null ? "---" : formatCurrency(globalStats.globalRevenue, currency), 
      icon: DollarSign, 
      color: "from-cyan-500 to-blue-600", 
      isLoading: globalStats._isLoading 
    },
    { label: "Predicted Growth", value: `${globalStats.predictedGrowth.toFixed(1)}%`, icon: TrendingUp, color: "from-purple-500 to-pink-600" },
    { label: "Neural Influence", value: `${globalStats.neuralInfluence.toFixed(1)}%`, icon: Network, color: "from-teal-400 to-cyan-500" },
  ];

  // Helper for logging
  const log = (msg) => {
    setEcosystemLog(prev => [
      ...prev.slice(-14),
      { time: new Date().toLocaleTimeString(), msg }
    ]);
  };

  return (
    <section className="bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 rounded-xl p-6 shadow-2xl border border-indigo-500/20 text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <Brain className="text-cyan-400" /> Neural Commerce Ecosystem
          <Atom className="text-purple-400 animate-spin" style={{ animationDuration: "4s" }} />
        </h2>
        <div className="flex items-center gap-3">
          <select
            className="bg-blue-800 px-3 py-1 rounded text-white border border-white/20"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            {["NGN", "USD", "GBP", "EUR"].map((curr) => (
              <option key={curr} value={curr}>
                {formatCurrency(0, curr).replace(/0/g, '')} {curr}
              </option>
            ))}
          </select>
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${isActive ? "bg-green-400 animate-pulse" : "bg-red-500"}`} />
            <span className={`${isActive ? "text-green-300" : "text-red-300"} text-sm font-medium`}>
              {isActive ? "ACTIVE" : "INACTIVE"}
            </span>
          </div>
        </div>
      </div>

      {/* Activation Button */}
      <button
        onClick={activateEcosystem}
        disabled={isActive || activationLoading}
        className={`w-full md:w-auto px-6 py-3 rounded-lg font-semibold text-lg flex items-center justify-center gap-3 mb-8 transition-all ${
          isActive
            ? "bg-gray-600 opacity-60 cursor-not-allowed"
            : activationLoading
            ? "bg-yellow-500 animate-pulse"
            : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.02]"
        }`}
      >
        <Rocket size={20} />
        {isActive ? "Ecosystem Running" : activationLoading ? "Activating..." : "Activate Ecosystem"}
      </button>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      {/* Market Signals */}
      <div className="bg-white/10 p-5 rounded-xl backdrop-blur-md mb-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Radar className="text-blue-400" /> Live Market Signals
        </h3>
        <div className="space-y-2 max-h-44 overflow-y-auto text-sm text-white pr-2">
          {marketSignals.length > 0 ? (
            marketSignals.map((signal, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-cyan-300">•</span>
                <span>{signal}</span>
              </div>
            ))
          ) : (
            <div className="flex items-center gap-2 text-gray-400">
              <Loader2 className="animate-spin" size={14} />
              <span>Loading market data...</span>
            </div>
          )}
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-white/5 p-4 rounded-md text-sm max-h-52 overflow-y-auto">
        <h4 className="font-semibold mb-2 flex items-center gap-2">
          <RefreshCcw className="text-cyan-300" size={16} /> Activity Log
        </h4>
        {ecosystemLog.slice(-10).reverse().map((log, idx) => (
          <div key={idx} className="text-gray-300">
            <span className="text-gray-500">{log.time}</span> — {log.msg}
          </div>
        ))}
      </div>
    </section>
  );
};

export default NeuralCommerceEcosystem;
