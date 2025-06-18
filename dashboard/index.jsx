"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Play, Pause, Settings, TrendingUp, Mail, FileText, Share2, DollarSign, Target,
  Calendar, BarChart3, Bot, Zap, Clock, CreditCard, FilePlus, ShoppingCart, Star,
  Users, AlertCircle, ExternalLink, Rocket, TrendingDown, Eye, MousePointer, Gift,
  Brain, Globe, Network, Cpu, Activity, Command, Shield, Crown, Layers, Workflow,
  Sparkles, Radar, Atom, Infinity, Hexagon, Satellite, Gamepad2, Gauge
} from "lucide-react";

// ======================= AffiliateMarketingAI Component =======================
const AffiliateMarketingAI = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentTask, setCurrentTask] = useState("");
  const [neuralSystemActive, setNeuralSystemActive] = useState(false);
  const [aiAgentsDeployed, setAiAgentsDeployed] = useState(0);
  const [economicPredictions, setEconomicPredictions] = useState([]);
  const [globalMarketData, setGlobalMarketData] = useState({});
  const [autonomousBusinesses, setAutonomousBusinesses] = useState([]);
  const [quantumMatches, setQuantumMatches] = useState(0);
  const [controlMode, setControlMode] = useState("MANUAL");
  const [stats, setStats] = useState({
    contentCreated: 0,
    emailsSent: 0,
    socialPosts: 0,
    leads: 0,
    revenue: 0,
    conversions: 0,
    clickThrough: 0,
    activeProducts: 0,
    predictedRevenue: 0,
    marketInfluence: 0,
    economicImpact: 0,
    globalReach: 0
  });
  const [neuralCommerce, setNeuralCommerce] = useState({
    demandSynthesis: 0,
    marketPrediction: 0,
    sentimentCascade: 0,
    temporalAlignment: 0,
    crossCulturalAdaptation: 0,
    economicButterfly: 0
  });
  const [automationLog, setAutomationLog] = useState([]);
  const [currency, setCurrency] = useState("NGN");
  const [amazonProducts, setAmazonProducts] = useState([]);
  const [tiktokScript, setTiktokScript] = useState(null);
  const [campaignEmail, setCampaignEmail] = useState("");
  const [blogPost, setBlogPost] = useState(null);
  const [urgencyTimer, setUrgencyTimer] = useState(3600);
  const neuralNetworkRef = useRef(null);
  const API = "https://ai-affiliate-backend.onrender.com";
  const [aiControlPanel, setAiControlPanel] = useState({
    masterSwitch: false,
    autonomyLevel: 25,
    marketAggressiveness: 50,
    riskTolerance: 30,
    globalExpansion: false,
    economicManipulation: false,
    culturalAdaptation: true,
    predictiveAccuracy: 95
  });

  // Neural Commerce Brain - The Revolutionary Core
  const initializeNeuralCommerce = async () => {
    try {
      setNeuralSystemActive(true);
      const economicData = await fetch(`${API}/neural/economic-predictions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          markets: ["global", "crypto", "ecommerce", "social", "ai"],
          timeframe: "3-6-months",
          accuracy_target: aiControlPanel.predictiveAccuracy,
          control_level: controlMode
        })
      });
      const predictions = await economicData.json();
      setEconomicPredictions(predictions.predictions || []);
      const agentDeployment = await fetch(`${API}/neural/deploy-agents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agent_count: Math.floor(aiControlPanel.autonomyLevel / 10),
          control_mode: controlMode,
          market_targets: predictions.optimal_markets,
          risk_level: aiControlPanel.riskTolerance
        })
      });
      const agents = await agentDeployment.json();
      setAiAgentsDeployed(agents.deployed_count || 0);
      setAutonomousBusinesses(agents.businesses || []);
      await fetch(`${API}/neural/activate-economic-system`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          global_monitoring: aiControlPanel.globalExpansion,
          cultural_adaptation: aiControlPanel.culturalAdaptation,
          market_manipulation: aiControlPanel.economicManipulation,
          master_control: aiControlPanel.masterSwitch
        })
      });
      trackEvent('neural_commerce_activated', {
        control_mode: controlMode,
        autonomy_level: aiControlPanel.autonomyLevel
      });
    } catch (error) {
      console.error("Neural Commerce initialization failed:", error);
    }
  };

  // Quantum Commerce Matching System
  const executeQuantumMatching = async () => {
    try {
      const response = await fetch(`${API}/neural/quantum-matching`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_behavior_data: "real-time-stream",
          emotion_analysis: true,
          purchase_intent_prediction: true,
          temporal_optimization: true,
          control_override: controlMode !== "AUTONOMOUS"
        })
      });
      const matches = await response.json();
      setQuantumMatches(prev => prev + (matches.successful_matches || 0));
      setStats(prev => ({
        ...prev,
        predictedRevenue: prev.predictedRevenue + (matches.predicted_revenue || 0),
        marketInfluence: Math.min(100, prev.marketInfluence + 2)
      }));
    } catch (error) {
      console.error("Quantum matching failed:", error);
    }
  };

  // Economic Butterfly Effect System
  const triggerButterflyEffect = async (seedAction) => {
    try {
      await fetch(`${API}/neural/butterfly-effect`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          seed_action: seedAction,
          amplification_factor: aiControlPanel.marketAggressiveness,
          cascade_targets: ["social", "email", "blog", "video", "ads"],
          control_checkpoints: controlMode === "MANUAL" ? 5 : 1,
          master_override: aiControlPanel.masterSwitch
        })
      });
      setNeuralCommerce(prev => ({
        ...prev,
        economicButterfly: prev.economicButterfly + 1
      }));
    } catch (error) {
      console.error("Butterfly effect trigger failed:", error);
    }
  };

  // AI Agent Control Functions
  const deployNewAgent = async (specialty) => {
    if (controlMode === "MANUAL" && !aiControlPanel.masterSwitch) {
      alert("Manual approval required for new agent deployment");
      return;
    }
    try {
      const response = await fetch(`${API}/neural/deploy-single-agent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          specialty: specialty,
          autonomy_level: aiControlPanel.autonomyLevel,
          reporting_frequency: controlMode === "SUPERVISED" ? "hourly" : "daily"
        })
      });
      const newAgent = await response.json();
      setAutonomousBusinesses(prev => [...prev, newAgent]);
      setAiAgentsDeployed(prev => prev + 1);
    } catch (error) {
      console.error("Agent deployment failed:", error);
    }
  };

  // Emergency AI Control System
  const emergencyStop = async () => {
    try {
      await fetch(`${API}/neural/emergency-stop`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stop_all: true,
          preserve_data: true,
          user_override: true
        })
      });
      setNeuralSystemActive(false);
      setAiAgentsDeployed(0);
      setControlMode("MANUAL");
      setAiControlPanel(prev => ({ ...prev, masterSwitch: false }));
      alert("🛑 EMERGENCY STOP ACTIVATED - All AI systems halted");
    } catch (error) {
      console.error("Emergency stop failed:", error);
    }
  };

  // Enhanced tracking with neural data
  const trackEvent = async (eventName, data = {}) => {
    try {
      await fetch(`${API}/analytics/neural-track`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: eventName,
          data: {
            ...data,
            timestamp: new Date().toISOString(),
            neural_active: neuralSystemActive,
            control_mode: controlMode,
            ai_agents: aiAgentsDeployed
          },
          user_agent: navigator.userAgent,
          url: window.location.href,
          neural_context: {
            market_influence: stats.marketInfluence,
            quantum_matches: quantumMatches,
            economic_impact: stats.economicImpact
          }
        })
      });
    } catch (error) {
      console.error("Neural tracking failed:", error);
    }
  };

  // Revolutionary automation tasks
  const revolutionaryTasks = [
    "🧠 Analyzing global economic patterns...",
    "🚀 Deploying autonomous AI entrepreneurs...",
    "⚡ Creating market demand synthesis...",
    "🌍 Orchestrating cross-cultural campaigns...",
    "🔮 Predicting consumer behavior 6 months ahead...",
    "💎 Manufacturing cultural trend movements...",
    "🎯 Executing quantum commerce matching...",
    "🌊 Triggering economic butterfly effects...",
    "🛡️ Optimizing sentiment cascade engineering...",
    "🎪 Controlling invisible customer journeys...",
    "🎭 Synthesizing emotional product demand...",
    "🏆 Dominating temporal commerce windows..."
  ];

  // Enhanced automation with neural features
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        const task = revolutionaryTasks[Math.floor(Math.random() * revolutionaryTasks.length)];
        setCurrentTask(task);
        setStats(prev => ({
          ...prev,
          contentCreated: prev.contentCreated + Math.floor(Math.random() * 5) + 1,
          emailsSent: prev.emailsSent + Math.floor(Math.random() * 100) + 50,
          socialPosts: prev.socialPosts + Math.floor(Math.random() * 8) + 3,
          leads: prev.leads + Math.floor(Math.random() * 15) + 5,
          conversions: prev.conversions + Math.floor(Math.random() * 6) + 2,
          clickThrough: prev.clickThrough + Math.floor(Math.random() * 25) + 10,
          predictedRevenue: prev.predictedRevenue + Math.floor(Math.random() * 50000) + 10000,
          marketInfluence: Math.min(100, prev.marketInfluence + Math.random() * 2),
          economicImpact: prev.economicImpact + Math.floor(Math.random() * 1000) + 500,
          globalReach: Math.min(195, prev.globalReach + Math.floor(Math.random() * 3))
        }));
        setNeuralCommerce(prev => ({
          demandSynthesis: Math.min(100, prev.demandSynthesis + Math.random() * 3),
          marketPrediction: Math.min(100, prev.marketPrediction + Math.random() * 2),
          sentimentCascade: Math.min(100, prev.sentimentCascade + Math.random() * 4),
          temporalAlignment: Math.min(100, prev.temporalAlignment + Math.random() * 2.5),
          crossCulturalAdaptation: Math.min(100, prev.crossCulturalAdaptation + Math.random() * 1.5),
          economicButterfly: Math.min(100, prev.economicButterfly + Math.random() * 3.5)
        }));
        setAutomationLog(prev => [...prev.slice(-5), {
          time: new Date().toLocaleTimeString(),
          task,
          id: Date.now(),
          priority: Math.random() > 0.6 ? "neural" : Math.random() > 0.7 ? "high" : "normal",
          agentId: neuralSystemActive ? `AI-${Math.floor(Math.random() * aiAgentsDeployed) + 1}` : null
        }]);
        if (neuralSystemActive && Math.random() > 0.7) {
          executeQuantumMatching();
        }
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isRunning, neuralSystemActive, aiAgentsDeployed]);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const res = await fetch(`${API}/paystack/neural-revenue`);
        const data = await res.json();
        if (data?.total !== undefined) {
          setStats(prev => ({
            ...prev,
            revenue: data.total,
            conversions: data.conversions || prev.conversions,
            clickThrough: data.clickThrough || prev.clickThrough,
            predictedRevenue: data.predicted_revenue || prev.predictedRevenue
          }));
        }
      } catch (error) {
        console.error("Neural revenue fetch failed:", error);
      }
    };

    fetchRevenueData();
    const interval = setInterval(fetchRevenueData, 20000);
    return () => clearInterval(interval);
  }, [API]);

  useEffect(() => {
    const timer = setInterval(() => {
      setUrgencyTimer(prev => prev > 0 ? prev - 1 : 3600);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currencySymbol = {
    NGN: "₦",
    USD: "$",
    GBP: "£",
    EUR: "€"
  }[currency];

  // UI
  return (
    <div className="mb-16">
      <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
          <Star className="text-yellow-400" /> Affiliate Marketing AI
        </h2>
        <div className="flex items-center gap-6 mb-6">
          <button
            onClick={() => setIsRunning(r => !r)}
            className={`px-6 py-3 rounded-lg font-bold text-lg flex items-center gap-2 ${
              isRunning
                ? "bg-red-700 hover:bg-red-900"
                : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 animate-pulse"
            }`}
          >
            {isRunning ? <Pause size={20} /> : <Play size={20} />}
            {isRunning ? "Pause AI Revolution" : "Start AI Revolution"}
          </button>
          <span className="font-semibold text-lg text-cyan-200">
            {isRunning ? currentTask : "AI Revolution Idle"}
          </span>
          <span className="ml-auto text-sm text-cyan-400">
            Urgency Timer: <span className="font-mono">{formatTime(urgencyTimer)}</span>
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-xl font-bold">{stats.contentCreated}</div>
            <div className="text-xs text-gray-300">Content Created</div>
          </div>
          <div>
            <div className="text-xl font-bold">{stats.emailsSent}</div>
            <div className="text-xs text-gray-300">Emails Sent</div>
          </div>
          <div>
            <div className="text-xl font-bold">{stats.socialPosts}</div>
            <div className="text-xs text-gray-300">Social Posts</div>
          </div>
          <div>
            <div className="text-xl font-bold">{stats.leads}</div>
            <div className="text-xs text-gray-300">Leads Generated</div>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Automation Log</h3>
          <div className="bg-black/30 rounded p-2 text-xs max-h-32 overflow-y-auto">
            {automationLog.length === 0 ? (
              <div className="text-gray-500">No automation yet.</div>
            ) : (
              automationLog.map(log => (
                <div key={log.id}>
                  <span className="text-gray-400">{log.time}</span> — <span>{log.task}</span>
                  {log.agentId && (
                    <span className="ml-2 text-cyan-300">[{log.agentId}]</span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// =================== NeuralCommerceEcosystem Component ========================
const NeuralCommerceEcosystem = () => {
  const [isActive, setIsActive] = useState(false);
  const [globalStats, setGlobalStats] = useState({
    economicPulse: 0,
    aiBusinesses: 0,
    globalRevenue: 0,
    predictedGrowth: 0,
    neuralInfluence: 0
  });
  const [marketSignals, setMarketSignals] = useState([]);
  const [ecosystemLog, setEcosystemLog] = useState([]);
  const [activationLoading, setActivationLoading] = useState(false);

  const API = "https://ai-affiliate-backend.onrender.com";

  const activateEcosystem = async () => {
    setActivationLoading(true);
    try {
      const res = await fetch(`${API}/neural/commerce/activate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();
      setIsActive(true);
      setEcosystemLog((prev) => [
        ...prev,
        { time: new Date().toLocaleTimeString(), msg: "Ecosystem activated." }
      ]);
      if (data.stats) setGlobalStats(data.stats);
    } catch (e) {
      setEcosystemLog((prev) => [
        ...prev,
        { time: new Date().toLocaleTimeString(), msg: "Activation failed." }
      ]);
    }
    setActivationLoading(false);
  };

  const fetchMarketSignals = async () => {
    try {
      const res = await fetch(`${API}/neural/commerce/signals`);
      const data = await res.json();
      setMarketSignals(data.signals || []);
    } catch (e) {
      setMarketSignals([]);
    }
  };

  useEffect(() => {
    if (isActive) {
      fetchMarketSignals();
      const interval = setInterval(fetchMarketSignals, 20000);
      return () => clearInterval(interval);
    }
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setGlobalStats((prev) => ({
        economicPulse: Math.min(100, prev.economicPulse + Math.random() * 2),
        aiBusinesses: prev.aiBusinesses + Math.floor(Math.random() * 3),
        globalRevenue: prev.globalRevenue + Math.floor(Math.random() * 10000),
        predictedGrowth: Math.min(200, prev.predictedGrowth + Math.random() * 1.5),
        neuralInfluence: Math.min(100, prev.neuralInfluence + Math.random() * 1.3)
      }));
      setEcosystemLog((prev) => [
        ...prev.slice(-8),
        {
          time: new Date().toLocaleTimeString(),
          msg: [
            "AI business deployed globally.",
            "Economic pulse analyzed.",
            "Market signal processed.",
            "Neural influence expanded.",
            "Cross-border commerce optimized.",
            "Revenue channel synthesized."
          ][Math.floor(Math.random() * 6)]
        }
      ]);
    }, 3500);
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <section className="p-6 bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 rounded-xl shadow-xl mt-12">
      <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
        <Brain className="text-cyan-400" /> Neural Commerce Ecosystem
        <Atom className="text-purple-400" />
      </h2>
      <div className="mb-8 flex items-center gap-5">
        <button
          onClick={activateEcosystem}
          disabled={isActive || activationLoading}
          className={`px-6 py-3 rounded-lg font-bold text-lg flex items-center gap-2 ${
            isActive
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 animate-pulse"
          }`}
        >
          <Rocket size={20} />
          {isActive ? "Ecosystem Active" : activationLoading ? "Activating..." : "Activate Ecosystem"}
        </button>
        <span className={`ml-3 font-semibold ${isActive ? 'text-green-400' : 'text-red-400'}`}>
          {isActive ? "Active" : "Inactive"}
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
        {[
          {
            label: "Economic Pulse",
            value: `${globalStats.economicPulse.toFixed(1)}%`,
            icon: Gauge,
            color: "from-green-500 to-emerald-600"
          },
          {
            label: "AI Businesses",
            value: globalStats.aiBusinesses.toLocaleString(),
            icon: Bot,
            color: "from-yellow-400 to-orange-500"
          },
          {
            label: "Global Revenue",
            value: `₦${globalStats.globalRevenue.toLocaleString()}`,
            icon: DollarSign,
            color: "from-cyan-500 to-blue-600"
          },
          {
            label: "Predicted Growth",
            value: `${globalStats.predictedGrowth.toFixed(1)}%`,
            icon: TrendingUp,
            color: "from-purple-500 to-pink-600"
          },
          {
            label: "Neural Influence",
            value: `${globalStats.neuralInfluence.toFixed(1)}%`,
            icon: Network,
            color: "from-teal-400 to-cyan-500"
          }
        ].map((stat, i) => (
          <div
            key={i}
            className={`bg-gradient-to-br ${stat.color} p-6 rounded-xl shadow-lg border border-white/20 flex flex-col items-center`}
          >
            <stat.icon size={36} className="mb-2 text-white/80" />
            <p className="text-white text-lg font-semibold">{stat.label}</p>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="mb-10">
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
          <Radar className="text-blue-400" /> Market Signals
        </h3>
        <div className="bg-white/10 rounded-lg p-4 max-h-40 overflow-y-auto text-sm">
          {marketSignals.length === 0 ? (
            <p className="text-gray-300">No signals yet.</p>
          ) : (
            <ul className="list-disc ml-5">
              {marketSignals.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
          <Activity className="text-green-400" /> Ecosystem Activity Log
        </h3>
        <div className="bg-white/10 rounded-lg p-4 max-h-48 overflow-y-auto text-sm">
          {ecosystemLog.length === 0 ? (
            <p className="text-gray-300">No activity yet.</p>
          ) : (
            <ul className="ml-1">
              {ecosystemLog.slice(-10).reverse().map((log, i) => (
                <li key={i}>
                  <span className="text-gray-400 mr-2">{log.time}</span>
                  {log.msg}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

// ============================ Dashboard Page ==================================
export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">
        Welcome to AI Affiliate Marketing System Dashboard
      </h1>
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <AffiliateMarketingAI />
        <NeuralCommerceEcosystem />
      </div>
    </div>
  );
}
