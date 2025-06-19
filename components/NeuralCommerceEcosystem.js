"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Brain, Rocket, Gauge, Bot, DollarSign, TrendingUp, Network, Radar, Atom } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://ai-affiliate-backend.onrender.com";

const formatCurrency = (value, currency = "NGN") => {
  const symbols = { NGN: "₦", USD: "$", GBP: "£", EUR: "€" };
  return `${symbols[currency] || ""}${Number(value || 0).toLocaleString()}`;
};

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className={`bg-gradient-to-br ${color} p-4 rounded-xl shadow-lg border border-white/20`}>
    <div className="flex items-center justify-between mb-2">
      <Icon size={24} className="text-white/80" />
    </div>
    <p className="text-white/90 text-sm font-medium">{label}</p>
    <p className="text-xl font-bold text-white">{value}</p>
  </div>
);

const NeuralCommerceEcosystem = () => {
  const [isActive, setIsActive] = useState(false);
  const [globalStats, setGlobalStats] = useState({
    economicPulse: 0,
    aiBusinesses: 0,
    globalRevenue: 0,
    predictedGrowth: 0,
    neuralInfluence: 0,
  });
  const [marketSignals, setMarketSignals] = useState([]);
  const [ecosystemLog, setEcosystemLog] = useState([]);
  const [activationLoading, setActivationLoading] = useState(false);
  const [currency, setCurrency] = useState("NGN");

  const fetchRevenue = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/paystack/revenue?currency=${currency}`);
      if (!res.ok) throw new Error("Endpoint failed or missing");
      const data = await res.json();

      if (typeof data.total === "number") {
        setGlobalStats((prev) => ({ ...prev, globalRevenue: data.total }));
        setEcosystemLog((prev) => [
          ...prev,
          { time: new Date().toLocaleTimeString(), msg: `Revenue updated: ${formatCurrency(data.total, currency)}` },
        ]);
      } else {
        throw new Error("No 'total' field in response");
      }
    } catch (error) {
      console.error("Revenue fetch error:", error.message);
      setEcosystemLog((prev) => [
        ...prev,
        { time: new Date().toLocaleTimeString(), msg: "⚠ Failed to fetch revenue data." },
      ]);
    }
  }, [currency]);

  const activateEcosystem = useCallback(async () => {
    setActivationLoading(true);
    try {
      // Simulate initialization delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsActive(true);
      setEcosystemLog((prev) => [
        ...prev,
        { time: new Date().toLocaleTimeString(), msg: "✅ Ecosystem activated." },
      ]);
      setMarketSignals([
        "📈 Surge in Southeast Asian e-commerce",
        "🤖 AI-driven buying patterns in Europe",
        "💱 Crypto payments up 18% globally",
        "📱 Mobile commerce boom in Africa",
      ]);
      fetchRevenue();
    } catch {
      setEcosystemLog((prev) => [
        ...prev,
        { time: new Date().toLocaleTimeString(), msg: "❌ Activation failed." },
      ]);
    }
    setActivationLoading(false);
  }, [fetchRevenue]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setGlobalStats((prev) => ({
        economicPulse: Math.min(100, prev.economicPulse + Math.random() * 1.5),
        aiBusinesses: prev.aiBusinesses + Math.floor(Math.random() * 3),
        predictedGrowth: Math.min(200, prev.predictedGrowth + Math.random() * 1.2),
        neuralInfluence: Math.min(100, prev.neuralInfluence + Math.random() * 0.8),
      }));

      const updates = [
        "📊 Neural pulse updated.",
        "🚀 AI business launched.",
        "🌍 Cross-border optimization active.",
        "💡 Quantum insights expanded.",
        "📡 New market signals scanned.",
        "🔄 Revenue channels optimized.",
      ];

      setEcosystemLog((prev) => [
        ...prev.slice(-12),
        { time: new Date().toLocaleTimeString(), msg: updates[Math.floor(Math.random() * updates.length)] },
      ]);
      fetchRevenue();
    }, 4500);

    return () => clearInterval(interval);
  }, [isActive, fetchRevenue]);

  const stats = [
    { label: "Economic Pulse", value: `${globalStats.economicPulse.toFixed(1)}%`, icon: Gauge, color: "from-green-500 to-emerald-600" },
    { label: "AI Businesses", value: globalStats.aiBusinesses.toLocaleString(), icon: Bot, color: "from-yellow-400 to-orange-500" },
    { label: "Global Revenue", value: formatCurrency(globalStats.globalRevenue, currency), icon: DollarSign, color: "from-cyan-500 to-blue-600" },
    { label: "Predicted Growth", value: `${globalStats.predictedGrowth.toFixed(1)}%`, icon: TrendingUp, color: "from-purple-500 to-pink-600" },
    { label: "Neural Influence", value: `${globalStats.neuralInfluence.toFixed(1)}%`, icon: Network, color: "from-teal-400 to-cyan-500" },
  ];

  return (
    <section className="bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 rounded-xl p-8 shadow-2xl border border-indigo-500/20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <Brain className="text-cyan-400" /> Neural Commerce Ecosystem
          <Atom className="text-purple-400 animate-spin" style={{ animationDuration: "3s" }} />
        </h2>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isActive ? "bg-green-400 animate-pulse" : "bg-red-400"}`} />
          <span className={`font-semibold ${isActive ? "text-green-400" : "text-red-400"}`}>
            {isActive ? "ACTIVE" : "INACTIVE"}
          </span>
        </div>
      </div>

      <button
        onClick={activateEcosystem}
        disabled={isActive || activationLoading}
        className={`px-6 py-3 rounded-lg font-bold text-lg flex items-center gap-3 mb-8 transition-all duration-300 ${
          isActive
            ? "bg-gray-600 opacity-60 cursor-not-allowed"
            : activationLoading
            ? "bg-yellow-600 animate-pulse"
            : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105"
        }`}
      >
        <Rocket size={20} />
        {isActive ? "Ecosystem Running" : activationLoading ? "Activating..." : "Activate Ecosystem"}
      </button>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Radar className="text-blue-400" /> Market Signals
        </h3>
        <div className="space-y-2 max-h-48 overflow-y-auto text-sm">
          {marketSignals.length === 0 ? (
            <p className="text-gray-400">📡 Scanning global signals...</p>
          ) : (
            marketSignals.map((msg, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-cyan-300">•</span>
                <span>{msg}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-white/5 mt-6 p-4 rounded-lg text-sm max-h-48 overflow-y-auto">
        <h4 className="font-bold mb-2">🧠 Ecosystem Activity Log</h4>
        {ecosystemLog.slice(-10).reverse().map((log, i) => (
          <div key={i} className="text-gray-300">
            <span className="text-gray-500">{log.time}</span> — {log.msg}
          </div>
        ))}
      </div>
    </section>
  );
};

export default NeuralCommerceEcosystem;
