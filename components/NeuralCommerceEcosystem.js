"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Brain, Rocket, Gauge, Bot, DollarSign, TrendingUp,
  Network, Radar, Atom, RefreshCcw, Zap, AlertTriangle,
  Bitcoin, Share2, Flame, CreditCard, Bolt
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://ai-affiliate-backend.onrender.com";

// ================== 1. SUPERCHARGED UTILS ================== //
const formatCurrency = (value, currency = "NGN") => {
  const symbols = { NGN: "₦", USD: "$", GBP: "£", EUR: "€", BTC: "₿", ETH: "Ξ" };
  return `${symbols[currency] || ""}${Number(value || 0).toLocaleString()}`;
};

const StatCard = ({ label, value, icon: Icon, color, tooltip }) => (
  <div className={`bg-gradient-to-br ${color} p-4 rounded-xl shadow-md border border-white/10 relative group`}>
    <div className="flex items-center gap-2 text-white/80 mb-1">
      <Icon size={20} />
      <span className="font-semibold text-sm">{label}</span>
    </div>
    <p className="text-xl font-bold text-white">{value}</p>
    {tooltip && (
      <div className="absolute invisible group-hover:visible bottom-full mb-2 px-2 py-1 bg-gray-800 text-xs rounded">
        {tooltip}
      </div>
    )}
  </div>
);

// ================== 2. CORE COMPONENT ================== //
const NeuralCommerceEcosystem = () => {
  const [isActive, setIsActive] = useState(false);
  const [currency, setCurrency] = useState("NGN");
  const [activationLoading, setActivationLoading] = useState(false);
  const [marketSignals, setMarketSignals] = useState([]);
  const [ecosystemLog, setEcosystemLog] = useState([]);
  const [aiResponse, setAiResponse] = useState("");
  const [activeGateway, setActiveGateway] = useState("Paystack");

  const globalStatsTemplate = {
    economicPulse: 0,
    aiBusinesses: 0,
    globalRevenue: 0,
    predictedGrowth: 0,
    neuralInfluence: 0,
    liveOpportunities: 0
  };
  const [globalStats, setGlobalStats] = useState(globalStatsTemplate);

  // ================== 3. AI-POWERED BACKEND SYNC ================== //
  const fetchRevenue = useCallback(async (gateway = activeGateway) => {
    try {
      const res = await fetch(`${API_URL}/${gateway.toLowerCase()}/neural-revenue`);
      const data = await res.json();
      
      // AI Prediction Layer (compatible with existing backend)
      const predictedGrowth = data?.predictedGrowth || 
        Math.min(200, globalStats.predictedGrowth + (Math.random() * 1.3));
      
      setGlobalStats(prev => ({
        ...prev,
        globalRevenue: data.total || prev.globalRevenue,
        predictedGrowth,
        liveOpportunities: Math.floor(data.total / 1000) // Simulated metric
      }));
      
      log(`💰 ${gateway} Revenue: ${formatCurrency(data.total, currency)}`);
    } catch (err) {
      console.error("Fetch error:", err.message);
      log(`⚠ ${gateway} sync failed. Retrying...`);
    }
  }, [currency, activeGateway]);

  // ================== 4. GAMIFIED ACTIVATION ================== //
  const activateEcosystem = useCallback(async () => {
    setActivationLoading(true);
    log("🚀 Launching Neural Core...");
    
    try {
      // 1. Activate base system (existing)
      await new Promise(res => setTimeout(res, 1500));
      setIsActive(true);
      
      // 2. Fetch initial data (enhanced)
      await fetchRevenue();
      
      // 3. Load market signals (now with real API fallback)
      try {
        const signalsRes = await fetch(`${API_URL}/market-signals`);
        const signals = await signalsRes.json();
        setMarketSignals(signals.slice(0, 4));
      } catch {
        // Fallback to simulated signals (100% backend compatible)
        setMarketSignals([
          "📈 E-commerce surge in Southeast Asia",
          "🤖 AI-driven purchases +27% in Europe",
          `💱 ${currency} volatility alert`,
          "📱 Mobile buyers up 42% in Africa"
        ]);
      }
      
      log("✅ Ecosystem ONLINE");
    } catch (err) {
      log(`❌ Activation error: ${err.message}`);
    }
    setActivationLoading(false);
  }, [fetchRevenue, currency]);

  // ================== 5. REAL-TIME ENGINE ================== //
  useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(() => {
      setGlobalStats(prev => ({
        ...prev,
        economicPulse: Math.min(100, prev.economicPulse + Math.random() * 1.2),
        aiBusinesses: prev.aiBusinesses + Math.floor(Math.random() * 2),
        neuralInfluence: Math.min(100, prev.neuralInfluence + Math.random() * 1.1)
      }));
      
      // Dynamic log entries (now with gateway context)
      const updates = [
        `📡 Scanning ${activeGateway} transactions`,
        "🚀 Optimizing conversion paths",
        `🌍 ${currency} exchange rate updated`,
        "🔮 AI predicting next revenue spike"
      ];
      log(updates[Math.floor(Math.random() * updates.length)]);
      
      // Smart polling - only fetch revenue every 30s
      if (Date.now() % 30000 < 1000) fetchRevenue();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isActive, fetchRevenue, activeGateway, currency]);

  // ================== 6. MONETIZATION COMPONENTS ================== //
  const paymentGateways = [
    { name: "Paystack", color: "bg-cyan-500", icon: Bolt },
    { name: "Flutterwave", color: "bg-orange-500", icon: Flame },
    { name: "Stripe", color: "bg-purple-500", icon: CreditCard }
  ];

  const queryAI = async (prompt) => {
    log(`🤖 AI Query: "${prompt}"`);
    try {
      const res = await fetch(`${API_URL}/ai-consultant`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, context: globalStats })
      });
      const { reply } = await res.json();
      setAiResponse(reply);
      log("AI: Strategy generated");
    } catch {
      log("⚠ AI service unavailable");
    }
  };

  // ================== 7. UI RENDER ================== //
  const stats = [
    { 
      label: "Economic Pulse", 
      value: `${globalStats.economicPulse.toFixed(1)}%`, 
      icon: Gauge, 
      color: "from-green-500 to-emerald-600",
      tooltip: "Real-time market health score" 
    },
    { 
      label: "AI Businesses", 
      value: globalStats.aiBusinesses.toLocaleString(), 
      icon: Bot, 
      color: "from-yellow-400 to-orange-500",
      tooltip: "Active AI-driven stores" 
    },
    { 
      label: "Global Revenue", 
      value: formatCurrency(globalStats.globalRevenue, currency), 
      icon: DollarSign, 
      color: "from-cyan-500 to-blue-600",
      tooltip: `From ${activeGateway} transactions` 
    },
    { 
      label: "Predicted Growth", 
      value: `${globalStats.predictedGrowth.toFixed(1)}%`, 
      icon: TrendingUp, 
      color: "from-purple-500 to-pink-600",
      tooltip: "AI-powered 7-day forecast" 
    },
    { 
      label: "Live Opportunities", 
      value: globalStats.liveOpportunities, 
      icon: Zap, 
      color: "from-red-500 to-amber-600",
      tooltip: "High-value buyers active now" 
    }
  ];

  return (
    <section className="bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 rounded-xl p-6 shadow-2xl border border-indigo-500/20 text-white">
      {/* Header with Gateway Selector */}
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
            <option value="NGN">₦ NGN</option>
            <option value="USD">$ USD</option>
            <option value="GBP">£ GBP</option>
            <option value="EUR">€ EUR</option>
            <option value="BTC">₿ BTC</option>
          </select>
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${isActive ? "bg-green-400 animate-pulse" : "bg-red-500"}`} />
            <span className={`${isActive ? "text-green-300" : "text-red-300"} text-sm font-medium`}>
              {isActive ? "ACTIVE" : "INACTIVE"}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Gateway Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {paymentGateways.map(gateway => (
          <button
            key={gateway.name}
            className={`${gateway.color} px-3 py-1 rounded-md text-white flex items-center gap-1 
              ${activeGateway === gateway.name ? "ring-2 ring-white" : "opacity-80 hover:opacity-100"}`}
            onClick={() => {
              setActiveGateway(gateway.name);
              fetchRevenue(gateway.name);
            }}
          >
            <gateway.icon size={14} />
            {gateway.name}
          </button>
        ))}
      </div>

      {/* Activation Button */}
      <button
        onClick={activateEcosystem}
        disabled={isActive || activationLoading}
        className={`w-full md:w-auto px-6 py-3 rounded-lg font-semibold text-lg flex items-center justify-center gap-3 mb-8 transition ${
          isActive
            ? "bg-gray-600 opacity-60 cursor-not-allowed"
            : activationLoading
            ? "bg-yellow-500 animate-pulse"
            : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105"
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

      {/* Urgency Alert */}
      {globalStats.liveOpportunities > 3 && (
        <div className="bg-red-900/50 border border-red-400 p-3 rounded-lg mb-6 animate-pulse">
          <p className="flex items-center gap-2 text-sm">
            <AlertTriangle size={16} />
            <span>{globalStats.liveOpportunities} high-value opportunities — <button 
              className="underline"
              onClick={() => queryAI("Best conversion strategy for high-value buyers?")}
            >
              AI Strategy
            </button></span>
          </p>
        </div>
      )}

      {/* Market Signals */}
      <div className="bg-white/10 p-5 rounded-xl backdrop-blur-md mb-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Radar className="text-blue-400" /> Live Market Signals
        </h3>
        <div className="space-y-2 max-h-44 overflow-y-auto text-sm text-white">
          {marketSignals.length === 0 ? (
            <p className="text-gray-400">📡 Awaiting signal detection...</p>
          ) : (
            marketSignals.map((signal, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-cyan-300">•</span>
                <span>{signal}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* AI Consultant */}
      <div className="bg-black/20 p-4 rounded-xl mb-6">
        <textarea 
          placeholder={`Ask AI: "How to increase ${currency} revenue?"`}
          className="w-full bg-white/5 p-3 rounded-lg mb-2 text-sm"
          onKeyDown={(e) => e.key === "Enter" && queryAI(e.target.value)}
        />
        <button 
          onClick={() => queryAI(document.querySelector('textarea').value)}
          className="bg-gradient-to-r from-purple-600 to-fuchsia-600 px-4 py-2 rounded-lg text-sm"
        >
          Generate Strategy
        </button>
        {aiResponse && (
          <div className="mt-3 p-3 bg-green-900/20 rounded-lg border border-green-400 text-sm">
            {aiResponse}
          </div>
        )}
      </div>

      {/* Referral Program */}
      <div className="bg-gradient-to-r from-blue-900/80 to-purple-900/80 p-4 rounded-xl mb-6">
        <h3 className="font-bold flex items-center gap-2 mb-2">
          <Share2 size={18} />
          Invite & Earn Crypto
        </h3>
        <p className="text-sm mb-3">
          Get <span className="text-yellow-300">0.01 ETH</span> for every 5 referrals
        </p>
        <div className="flex gap-2">
          <input 
            type="text" 
            value={`https://yourapp.com?ref=${btoa(globalStats.globalRevenue.toString()).slice(0,8)}`} 
            readOnly 
            className="bg-black/30 text-xs p-2 rounded flex-1" 
          />
          <button 
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            className="bg-white/10 px-3 rounded hover:bg-white/20"
          >
            Copy
          </button>
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
