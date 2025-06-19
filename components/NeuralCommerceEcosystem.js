"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Brain, Rocket, Gauge, Bot, DollarSign, TrendingUp, Network, Radar, Atom } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const formatCurrency = (value, currency = "NGN") => {
  const symbols = { NGN: "₦", USD: "$", GBP: "£", EUR: "€" };
  return `${symbols[currency] || ""}${value.toLocaleString()}`;
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
      const data = await res.json();
      if (data?.total !== undefined) {
        setGlobalStats((prev) => ({
          ...prev,
          globalRevenue: data.total,
        }));
        setEcosystemLog((prev) => [
          ...prev,
          { time: new Date().toLocaleTimeString(), msg: `Revenue updated: ${formatCurrency(data.total, currency)}` },
        ]);
      }
    } catch (error) {
      console.error("Failed to fetch revenue:", error);
      setEcosystemLog((prev) => [
        ...prev,
        { time: new Date().toLocaleTimeString(), msg: "Failed to fetch revenue." },
      ]);
    }
  }, [currency]);

  const activateEcosystem = useCallback(async () => {
    setActivationLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsActive(true);
      setEcosystemLog((prev) => [
        ...prev,
        { time: new Date().toLocaleTimeString(), msg: "Neural Commerce Ecosystem activated successfully." },
      ]);
      setMarketSignals([
        "Global e-commerce surge detected in Southeast Asia",
        "AI-driven purchasing patterns emerging in Europe",
        "Cryptocurrency payment adoption accelerating",
        "Mobile commerce dominance in Africa confirmed",
      ]);
      fetchRevenue();
    } catch (error) {
      setEcosystemLog((prev) => [
        ...prev,
        { time: new Date().toLocaleTimeString(), msg: "Ecosystem activation failed - retrying..." },
      ]);
    }
    setActivationLoading(false);
  }, [fetchRevenue]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setGlobalStats((prev) => ({
        economicPulse: Math.min(100, prev.economicPulse + Math.random() * 2),
        aiBusinesses: prev.aiBusinesses + Math.floor(Math.random() * 3),
        predictedGrowth: Math.min(300, prev.predictedGrowth + Math.random() * 2),
        neuralInfluence: Math.min(100, prev.neuralInfluence + Math.random() * 1.5),
      }));

      const activities = [
        "AI business network expanded globally",
        "Economic pulse synchronized across markets",
        "Market signal processing optimized",
        "Neural influence propagated successfully",
        "Cross-border commerce pipeline activated",
        "Revenue synthesis algorithm improved",
        "Cultural adaptation module updated",
        "Quantum commerce matching enhanced",
      ];

      setEcosystemLog((prev) => [
        ...prev.slice(-12),
        { time: new Date().toLocaleTimeString(), msg: activities[Math.floor(Math.random() * activities.length)] },
      ]);
      fetchRevenue();
    }, 4000);

    return () => clearInterval(interval);
  }, [isActive, fetchRevenue]);

  const ecosystemStats = [
    { label: "Economic Pulse", value: `${globalStats.economicPulse.toFixed(1)}%`, icon: Gauge, color: "from-green-500 to-emerald-600" },
    { label: "AI Businesses", value: globalStats.aiBusinesses.toLocaleString(), icon: Bot, color: "from-yellow-400 to-orange-500" },
    { label: "Global Revenue", value: formatCurrency(globalStats.globalRevenue, currency), icon: DollarSign, color: "from-cyan-500 to-blue-600" },
    { label: "Predicted Growth", value: `${globalStats.predictedGrowth.toFixed(1)}%`, icon: TrendingUp, color: "from-purple-500 to-pink-600" },
    { label: "Neural Influence", value: `${globalStats.neuralInfluence.toFixed(1)}%`, icon: Network, color: "from-teal-400 to-cyan-500" },
  ];

  return (
    <section className="bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 rounded-xl p-8 shadow-2xl border border-indigo-500/20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-bold flex items-center gap-3">
          <Brain className="text-cyan-400" />
          Neural Commerce Ecosystem
          <Atom className="text-purple-400 animate-spin" style={{ animationDuration: "3s" }} />
        </h2>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isActive ? "bg-green-400 animate-pulse" : "bg-red-400"}`} />
          <span className={`font-semibold ${isActive ? "text-green-400" : "text-red-400"}`}>
            {isActive ? "ACTIVE" : "INACTIVE"}
          </span>
        </div>
      </div>

      <div className="mb-8">
        <button
          onClick={activateEcosystem}
          disabled={isActive || activationLoading}
          className={`px-8 py-4 rounded-lg font-bold text-lg flex items-center gap-3 transition-all duration-300 ${
            isActive
              ? "bg-gray-600 cursor-not-allowed opacity-50"
              : activationLoading
              ? "bg-yellow-600 animate-pulse"
              : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transform hover:scale-105"
          }`}
        >
          <Rocket size={24} />
          {isActive
            ? "Ecosystem Running"
            : activationLoading
            ? "Initializing Neural Network..."
            : "Activate Global Ecosystem"}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
        {ecosystemStats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Radar className="text-blue-400" />
          Global Market Signals
        </h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {marketSignals.length === 0 ? (
            <p className="text-gray-400">Scanning global markets...</p>
          ) : (
            marketSignals.map((signal, i) => (
              <div key={i} className="flex items-start gap-2 p-2 bg-black/20 rounded">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm">{signal}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default NeuralCommerceEcosystem;
