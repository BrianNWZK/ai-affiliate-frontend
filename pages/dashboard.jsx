"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Play, Pause, Settings, TrendingUp, Mail, FileText, Share2, DollarSign, Target,
  Calendar, BarChart3, Bot, Zap, Clock, CreditCard, FilePlus, ShoppingCart, Star, 
  Users, AlertCircle, ExternalLink, Rocket, TrendingDown, Eye, MousePointer, Gift,
  Brain, Globe, Network, Cpu, Activity, Command, Shield, Crown, Layers, Workflow,
  Sparkles, Radar, Atom, Infinity, Hexagon, Satellite, Gamepad2, Gauge
} from "lucide-react";

const AffiliateMarketingAI = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentTask, setCurrentTask] = useState("");
  const [neuralSystemActive, setNeuralSystemActive] = useState(false);
  const [aiAgentsDeployed, setAiAgentsDeployed] = useState(0);
  const [economicPredictions, setEconomicPredictions] = useState([]);
  const [globalMarketData, setGlobalMarketData] = useState({});
  const [autonomousBusinesses, setAutonomousBusinesses] = useState([]);
  const [quantumMatches, setQuantumMatches] = useState(0);
  const [controlMode, setControlMode] = useState("MANUAL"); // MANUAL, SUPERVISED, AUTONOMOUS
  
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

  // Revolutionary AI Control System
  const [aiControlPanel, setAiControlPanel] = useState({
    masterSwitch: false,
    autonomyLevel: 25, // 0-100 scale
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
      
      // Initialize AI Economic Prediction Engine
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

      // Deploy Autonomous Business Entities
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

      // Activate Global Economic Nervous System
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
      
      // Update revenue from quantum matches
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
        
        // Enhanced stats with neural metrics
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

        // Update neural commerce metrics
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

        // Auto-execute quantum matching if neural system is active
        if (neuralSystemActive && Math.random() > 0.7) {
          executeQuantumMatching();
        }

      }, 1500); // Faster updates for revolutionary system
    }
    return () => clearInterval(interval);
  }, [isRunning, neuralSystemActive, aiAgentsDeployed]);

  // Revenue tracking with neural predictions
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
    const interval = setInterval(fetchRevenueData, 20000); // More frequent updates
    return () => clearInterval(interval);
  }, [API]);

  // Urgency timer
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

  const handleBuyNow = async (productPrice = 1000, productName = "Premium Package") => {
    try {
      const res = await fetch(`${API}/paystack/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "buyer@example.com",
          amount: productPrice,
          currency: currency,
          metadata: {
            product_name: productName,
            referrer: window.location.href,
            timestamp: new Date().toISOString(),
            neural_enhanced: neuralSystemActive
          }
        })
      });
      const data = await res.json();
      if (data.authorization_url) {
        trackEvent('neural_checkout_initiated', { 
          amount: productPrice, 
          product: productName,
          ai_agents_active: aiAgentsDeployed 
        });
        window.open(data.authorization_url, "_blank");
      } else {
        alert("Checkout failed. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Error during checkout. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6 text-white relative overflow-hidden">
      {/* Revolutionary Neural Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-3000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Revolutionary Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-4 flex items-center justify-center gap-4 animate-fade-in">
            <Brain className="text-cyan-400 animate-pulse" size={60} /> 
            NEURAL COMMERCE AI
            <Atom className="text-purple-400 animate-spin-slow" size={60} />
          </h1>
          <p className="text-2xl text-cyan-300 font-semibold">
            🚀 World's First Autonomous Economic Ecosystem Controller 🚀
          </p>
        </div>

        {/* EMERGENCY CONTROLS */}
        <div className="bg-red-900/30 border-2 border-red-500 p-4 rounded-xl mb-6 backdrop-blur-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="text-red-400 animate-pulse" size={24} />
              <span className="text-xl font-bold">🛡️ MASTER AI CONTROL SYSTEM</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">Control Mode:</span>
                <select
                  value={controlMode}
                  onChange={(e) => setControlMode(e.target.value)}
                  className="bg-red-900/50 border border-red-400 px-3 py-1 rounded text-white"
                >
                  <option value="MANUAL">🔒 Manual Control</option>
                  <option value="SUPERVISED">👁️ Supervised AI</option>
                  <option value="AUTONOMOUS">🤖 Full Autonomy</option>
                </select>
              </div>
              <button
                onClick={emergencyStop}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-bold flex items-center gap-2 animate-pulse"
              >
                <AlertCircle size={18} /> EMERGENCY STOP
              </button>
            </div>
          </div>
        </div>

        {/* Neural System Status */}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl mb-6 border border-cyan-400/30">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <Cpu className="text-cyan-400" /> Neural Commerce Brain Status
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${neuralSystemActive ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                <span className="font-semibold">{neuralSystemActive ? 'ACTIVE' : 'INACTIVE'}</span>
              </div>
              <button
                onClick={initializeNeuralCommerce}
                disabled={neuralSystemActive}
                className={`px-6 py-3 rounded-lg font-bold text-lg flex items-center gap-2 ${
                  neuralSystemActive 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 animate-pulse'
                }`}
              >
                <Rocket size={20} /> {neuralSystemActive ? 'SYSTEM ACTIVE' : 'ACTIVATE NEURAL SYSTEM'}
              </button>
            </div>
          </div>

          {/* AI Control Panel */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white/5 p-4 rounded-lg">
              <label className="block text-sm font-medium mb-2">AI Autonomy Level</label>
              <input
                type="range"
                min="0"
                max="100"
                value={aiControlPanel.autonomyLevel}
                onChange={(e) => setAiControlPanel(prev => ({ ...prev, autonomyLevel: parseInt(e.target.value) }))}
                className="w-full"
              />
              <span className="text-cyan-300 font-bold">{aiControlPanel.autonomyLevel}%</span>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <label className="block text-sm font-medium mb-2">Market Aggressiveness</label>
              <input
                type="range"
                min="0"
                max="100"
                value={aiControlPanel.marketAggressiveness}
                onChange={(e) => setAiControlPanel(prev => ({ ...prev, marketAggressiveness: parseInt(e.target.value) }))}
                className="w-full"
              />
              <span className="text-orange-300 font-bold">{aiControlPanel.marketAggressiveness}%</span>
            </div>

            <div className="bg-white/5 p-4 rounded-lg">
              <label className="block text-sm font-medium mb-2">Risk Tolerance</label>
              <input
                type="range"
                min="0"
                max="100"
                value={aiControlPanel.riskTolerance}
                onChange={(e) => setAiControlPanel(prev => ({ ...prev, riskTolerance: parseInt(e.target.value) }))}
                className="w-full"
              />
              <span className="text-red-300 font-bold">{aiControlPanel.riskTolerance}%</span>
            </div>

            <div className="bg-white/5 p-4 rounded-lg">
              <label className="block text-sm font-medium mb-2">Prediction Accuracy</label>
              <input
                type="range"
                min="80"
                max="99"
                value={aiControlPanel.predictiveAccuracy}
                onChange={(e) => setAiControlPanel(prev => ({ ...prev, predictiveAccuracy: parseInt(e.target.value) }))}
                className="w-full"
              />
              <span className="text-green-300 font-bold">{aiControlPanel.predictiveAccuracy}%</span>
            </div>
          </div>

          {/* Master Switches */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { key: 'masterSwitch', label: '🔥 Master Switch', color: 'red' },
              { key: 'globalExpansion', label: '🌍 Global Expansion', color: 'blue' },
              { key: 'economicManipulation', label: '💰 Economic Control', color: 'yellow' },
              { key: 'culturalAdaptation', label: '🎭 Cultural AI', color: 'purple' }
            ].map((switch, index) => (
              <div key={index} className="bg-white/5 p-3 rounded-lg">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={aiControlPanel[switch.key]}
                    onChange={(e) => setAiControlPanel(prev => ({ ...prev, [switch.key]: e.target.checked }))}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">{switch.label}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Revolutionary Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Revenue", value: `${currencySymbol}${stats.revenue.toLocaleString()}`, icon: DollarSign, color: "from-green-500 to-emerald-600", change: "+156%" },
            { label: "Predicted Revenue", value: `${currencySymbol}${stats.predictedRevenue.toLocaleString()}`, icon: TrendingUp, color: "from-cyan-500 to-blue-600", change: "+892%" },
            { label: "Market Influence", value: `${stats.marketInfluence.toFixed(1)}%`, icon: Globe, color: "from-purple-500 to-pink-600", change: "+234%" },
            { label: "AI Agents Active", value: aiAgentsDeployed.toLocaleString(), icon: Bot, color: "from-orange-500 to-red-600", change: `+${aiAgentsDeployed * 100}%` },
            { label: "Quantum Matches", value: quantumMatches.toLocaleString(), icon: Atom, color: "from-indigo-500 to-purple-600", change: "+445%" },
            { label: "Economic Impact", value: `${currencySymbol}${stats.economicImpact.toLocaleString()}`, icon: BarChart3, color: "from-teal-500 to-cyan-600", change: "+678%" },
            { label: "Global Reach", value: `${stats.globalReach} Countries`, icon: Satellite, color: "from-pink-500 to-rose-600", change: "+123%" },
            { label: "Neural Efficiency", value: `${((neuralCommerce.demandSynthesis + neuralCommerce.marketPrediction) / 2).toFixed(1)}%`, icon: Brain, color: "from-yellow-500 to-amber-600", change: "+999%" }
          ].map((stat, index) => (
            <div key={index} className={`bg-gradient-to-br ${stat.color} p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 border border-white/20`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-green-200 text-sm flex items-center gap-1">
                    <TrendingUp size={16} /> {stat.change}
                  </p>
                </div>
                <stat.icon size={40} className="text-white/80" />
              </div>
            </div>
          ))}
        </div>

        {/* Neural Commerce Metrics */}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl mb-8 border border-white/20">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Network className="text-cyan-400" /> Neural Commerce Engine Status
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: "Demand Synthesis", value: neuralCommerce.demandSynthesis, color: "cyan", icon: Sparkles },
              { label: "Market Prediction", value: neuralCommerce.marketPrediction, color: "blue", icon: Radar },
              { label: "Sentiment Cascade", value: neuralCommerce.sentimentCascade, color: "purple", icon: Activity },
              { label: "Temporal Alignment", value: neuralCommerce.temporalAlignment, color: "green", icon: Clock },
              { label: "Cultural Adaptation", value: neuralCommerce.crossCulturalAdaptation, color: "orange", icon: Globe },
              { label: "Economic Butterfly", value: neuralCommerce.economicButterfly, color: "pink", icon: Infinity }
            ].map((metric, index) => (
              <div key={index} className="bg-white/5 p-4 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <metric.icon size={20} className={`text-${metric.color}-400`} />
                    <span className="font-semibold text-sm">{metric.label}</span>
                  </div>
                  <span className={`text-${metric.color}-300 font-bold`}>{metric.value.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r from-${metric.color}-400 to-${metric.color}-600 h-2 rounded-full transition-all duration-500`}
                    style={{width: `${metric.value}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Agent Control Center */}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl mb-8 border border-white/20">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <Command className="text
