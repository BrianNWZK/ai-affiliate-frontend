"use client";
import React, { useState, useEffect } from "react";
import {
  Play, Pause, Settings, TrendingUp, DollarSign, Users, Shield, PowerOff, Power,
  Radar, Bot, ShoppingCart, Gauge, Activity, Plus, Zap, Brain, Atom
} from "lucide-react";

const NeuralCommerceEcosystem = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentTask, setCurrentTask] = useState("🧠 Neural Commerce System Ready...");
  const [neuralSystemActive, setNeuralSystemActive] = useState(false);
  const [aiAgentsDeployed, setAiAgentsDeployed] = useState(0);
  const [economicPredictions, setEconomicPredictions] = useState([]);
  const [autonomousBusinesses, setAutonomousBusinesses] = useState([]);
  const [quantumMatches, setQuantumMatches] = useState(0);
  const [controlMode, setControlMode] = useState("MANUAL");
  const [economicEcosystemOwnership, setEconomicEcosystemOwnership] = useState(0);

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
    globalReach: 0,
    ecosystemValue: 0,
    marketControlPercentage: 0,
    culturalTrends: 0,
    economicWeatherAccuracy: 95.7
  });

  const [neuralCommerce, setNeuralCommerce] = useState({
    demandSynthesis: 0,
    marketPrediction: 0,
    sentimentCascade: 0,
    temporalAlignment: 0,
    crossCulturalAdaptation: 0,
    economicButterfly: 0,
    preMarketCreation: 0,
    invisibleJourneyMapping: 0,
    emotionBasedCreation: 0,
    quantumCommerce: 0,
    ecosystemOwnership: 0,
    economicNervousSystem: 0
  });

  const [globalEconomicNervousSystem, setGlobalEconomicNervousSystem] = useState({
    marketSensors: 0,
    predictiveDeployment: 0,
    crossCulturalTranslation: 0,
    economicWeatherForecasting: 0,
    emergingMarketPenetration: 0,
    competitorPreemption: 0
  });

  const [automationLog, setAutomationLog] = useState([]);
  const [currency, setCurrency] = useState("NGN");
  const [urgencyTimer, setUrgencyTimer] = useState(3600);
  const [economicPhase, setEconomicPhase] = useState(1);
  const [activeTab, setActiveTab] = useState("dashboard");

  const [aiControlPanel, setAiControlPanel] = useState({
    masterSwitch: false,
    autonomyLevel: 25,
    marketAggressiveness: 50,
    riskTolerance: 30,
    globalExpansion: false,
    economicManipulation: false,
    culturalAdaptation: true,
    predictiveAccuracy: 95,
    ecosystemControl: 0,
    quantumCommerceActive: false,
    economicWeatherEnabled: false,
    butterflyEffectAmplification: 50,
    invisibleInfluenceLevel: 30,
    marketCreationRate: 10
  });

  // --- Effects for timer and automation ---
  useEffect(() => {
    let interval;
    const tasks = [
      "🧬 Creating pre-market demand for Q3 2025 products...",
      "🌍 Deploying autonomous micro-entrepreneurs across 47 countries...",
      "⚡ Synthesizing artificial demand through cultural trend manipulation...",
      "🎭 Engineering sentiment cascades across 12 social platforms...",
      "🔮 Predicting consumer desires 6 months before they know them...",
      "💎 Manufacturing viral cultural movements for product adoption...",
      "🎯 Executing quantum commerce matches at microsecond precision...",
      "🌊 Triggering economic butterfly effects in emerging markets...",
      "🛡️ Orchestrating invisible customer journey optimization...",
      "🎪 Controlling cross-platform business entity coordination...",
      "🎭 Synthesizing emotion-based product creation algorithms...",
      "🏆 Dominating temporal commerce windows across time zones...",
      "🚀 Preempting competitor strategies through market prediction...",
      "💰 Optimizing price points via real-time economic weather data...",
      "🔥 Amplifying micro-influences into macro market movements...",
      "🌟 Creating autonomous revenue streams through AI entrepreneurs..."
    ];

    if (isRunning) {
      interval = setInterval(() => {
        const task = tasks[Math.floor(Math.random() * tasks.length)];
        setCurrentTask(task);

        setStats(prev => ({
          ...prev,
          contentCreated: prev.contentCreated + Math.floor(Math.random() * 8) + 3,
          emailsSent: prev.emailsSent + Math.floor(Math.random() * 150) + 75,
          socialPosts: prev.socialPosts + Math.floor(Math.random() * 12) + 6,
          leads: prev.leads + Math.floor(Math.random() * 25) + 10,
          conversions: prev.conversions + Math.floor(Math.random() * 10) + 5,
          clickThrough: prev.clickThrough + Math.floor(Math.random() * 35) + 15,
          predictedRevenue: prev.predictedRevenue + Math.floor(Math.random() * 100000) + 25000,
          marketInfluence: Math.min(100, prev.marketInfluence + Math.random() * 3),
          economicImpact: prev.economicImpact + Math.floor(Math.random() * 2000) + 1000,
          globalReach: Math.min(195, prev.globalReach + Math.floor(Math.random() * 4)),
          ecosystemValue: prev.ecosystemValue + Math.floor(Math.random() * 50000) + 15000,
          marketControlPercentage: Math.min(100, prev.marketControlPercentage + Math.random() * 1.5),
          culturalTrends: prev.culturalTrends + Math.floor(Math.random() * 3) + 1
        }));

        setNeuralCommerce(prev => ({
          demandSynthesis: Math.min(100, prev.demandSynthesis + Math.random() * 4),
          marketPrediction: Math.min(100, prev.marketPrediction + Math.random() * 3),
          sentimentCascade: Math.min(100, prev.sentimentCascade + Math.random() * 5),
          temporalAlignment: Math.min(100, prev.temporalAlignment + Math.random() * 3.5),
          crossCulturalAdaptation: Math.min(100, prev.crossCulturalAdaptation + Math.random() * 2.5),
          economicButterfly: Math.min(100, prev.economicButterfly + Math.random() * 4.5),
          preMarketCreation: Math.min(100, prev.preMarketCreation + Math.random() * 3),
          invisibleJourneyMapping: Math.min(100, prev.invisibleJourneyMapping + Math.random() * 2.8),
          emotionBasedCreation: Math.min(100, prev.emotionBasedCreation + Math.random() * 3.2),
          quantumCommerce: Math.min(100, prev.quantumCommerce + Math.random() * 4.2),
          ecosystemOwnership: Math.min(100, prev.ecosystemOwnership + Math.random() * 2.5),
          economicNervousSystem: Math.min(100, prev.economicNervousSystem + Math.random() * 3.8)
        }));

        setAutomationLog(prev => [...prev.slice(-7), {
          time: new Date().toLocaleTimeString(),
          task,
          id: Date.now(),
          priority: Math.random() > 0.5 ? "neural" : Math.random() > 0.6 ? "quantum" : Math.random() > 0.7 ? "ecosystem" : "high",
          agentId: neuralSystemActive ? `AI-${Math.floor(Math.random() * aiAgentsDeployed) + 1}` : null,
          phase: economicPhase
        }]);
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [isRunning, neuralSystemActive, aiAgentsDeployed, economicPhase]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6 text-white relative overflow-hidden">
      {/* Neural Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-3000"></div>
        <div className="absolute top-10 right-1/3 w-64 h-64 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-4 flex items-center justify-center gap-4 animate-fade-in">
            <Brain className="text-cyan-400 animate-pulse" size={60} />
            NEURAL COMMERCE ECOSYSTEM
            <Atom className="text-purple-400 animate-spin-slow" size={60} />
          </h1>
          <p className="text-2xl text-cyan-300 font-semibold mb-2">
            🚀 World's First Autonomous Economic Ecosystem Controller 🚀
          </p>
          <p className="text-lg text-yellow-300">
            💎 Phase {economicPhase}/5: {economicPhase === 5 ? "Full Economic Ecosystem Ownership Active" : "Initializing Revolutionary Systems"} 💎
          </p>
        </div>

        {/* Emergency Controls */}
        <div className="bg-red-900/30 border-2 border-red-500 p-4 rounded-xl mb-6 backdrop-blur-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="text-red-400 animate-pulse" size={24} />
              <span className="text-xl font-bold">🛡️ MASTER ECOSYSTEM CONTROL SYSTEM</span>
              <div className="flex items-center gap-2 ml-4">
                <div className={`w-3 h-3 rounded-full ${neuralSystemActive ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                <span className="text-sm">Economic Phase: {economicPhase}/5</span>
              </div>
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
                  <option value="AUTONOMOUS">🤖 Autonomous</option>
                </select>
              </div>
              <button
                className={`px-4 py-2 rounded font-bold text-white ${neuralSystemActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} transition`}
                onClick={() => setNeuralSystemActive(!neuralSystemActive)}
              >
                {neuralSystemActive ? <PowerOff className="inline-block mr-2" size={18} /> : <Power className="inline-block mr-2" size={18} />}
                {neuralSystemActive ? "EMERGENCY STOP" : "ACTIVATE NEURAL COMMERCE"}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 mb-6">
          <button onClick={() => setActiveTab("dashboard")} className={`px-4 py-2 rounded-t ${activeTab === "dashboard" ? "bg-blue-900 font-bold" : "bg-blue-800"}`}>Dashboard</button>
          <button onClick={() => setActiveTab("agents")} className={`px-4 py-2 rounded-t ${activeTab === "agents" ? "bg-blue-900 font-bold" : "bg-blue-800"}`}>AI Agents</button>
          <button onClick={() => setActiveTab("markets")} className={`px-4 py-2 rounded-t ${activeTab === "markets" ? "bg-blue-900 font-bold" : "bg-blue-800"}`}>Markets</button>
          <button onClick={() => setActiveTab("nervous")} className={`px-4 py-2 rounded-t ${activeTab === "nervous" ? "bg-blue-900 font-bold" : "bg-blue-800"}`}>Economic Nervous System</button>
          <button onClick={() => setActiveTab("automation")} className={`px-4 py-2 rounded-t ${activeTab === "automation" ? "bg-blue-900 font-bold" : "bg-blue-800"}`}>Automation Log</button>
          <button onClick={() => setActiveTab("settings")} className={`px-4 py-2 rounded-t ${activeTab === "settings" ? "bg-blue-900 font-bold" : "bg-blue-800"}`}>Settings</button>
        </div>

        {/* Tab Content */}
        <div className="bg-blue-900/40 rounded-xl p-6 shadow-lg min-h-[420px] mb-12">
          {activeTab === "dashboard" && (
            <div>
              <h2 className="text-3xl font-bold flex items-center gap-2 mb-4">
                <Gauge className="text-cyan-300" size={32}/> Neural Dashboard
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-800/80 rounded-lg p-4 flex flex-col gap-2">
                  <span className="font-bold text-lg flex items-center gap-2"><Activity className="text-green-400" /> System Status</span>
                  <span>{neuralSystemActive ? "🟢 Neural System Active" : "🔴 System Idle"}</span>
                  <span>Current Task: <span className="font-mono">{currentTask}</span></span>
                </div>
                <div className="bg-blue-800/80 rounded-lg p-4 flex flex-col gap-2">
                  <span className="font-bold text-lg flex items-center gap-2"><DollarSign className="text-yellow-400" /> Revenue</span>
                  <span className="text-2xl font-mono">{currencySymbol}{stats.revenue.toLocaleString()}</span>
                  <span>Predicted: {currencySymbol}{stats.predictedRevenue.toLocaleString()}</span>
                </div>
                <div className="bg-blue-800/80 rounded-lg p-4 flex flex-col gap-2">
                  <span className="font-bold text-lg flex items-center gap-2"><Users className="text-cyan-300" /> AI Agents Deployed</span>
                  <span className="text-2xl font-mono">{aiAgentsDeployed}</span>
                  <span>Businesses: {autonomousBusinesses.length}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 mb-8">
                <button
                  className="bg-cyan-700 hover:bg-cyan-800 px-6 py-2 rounded text-lg font-bold shadow transition"
                  onClick={() => setIsRunning(r => !r)}
                >{isRunning ? <Pause className="inline-block mr-2" /> : <Play className="inline-block mr-2" />} {isRunning ? "Pause Automation" : "Start Automation"}</button>
                <button
                  className="bg-yellow-700 hover:bg-yellow-800 px-6 py-2 rounded text-lg font-bold shadow transition"
                  onClick={() => null}
                ><ShoppingCart className="inline-block mr-2" /> Buy Now</button>
              </div>
              <div className="text-center mt-4">
                <span className="text-sm text-cyan-200">⏰ Urgency Timer: <span className="font-mono">{formatTime(urgencyTimer)}</span></span>
              </div>
            </div>
          )}

          {activeTab === "agents" && (
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Bot className="text-cyan-400" /> Autonomous AI Agents</h2>
              <div className="mb-4">
                <button
                  className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded font-bold shadow"
                  onClick={() => null}
                ><Plus className="inline-block mr-2" /> Deploy New AI Agent</button>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {autonomousBusinesses.map((biz, idx) => (
                  <li key={biz.id || idx} className="bg-blue-800/70 rounded p-4 flex flex-col gap-2">
                    <span className="font-bold">{biz.name || `AI Business #${idx + 1}`}</span>
                    <span>Specialty: {biz.specialty || "General"}</span>
                    <span>Status: {biz.status || "Active"}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "markets" && (
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><TrendingUp className="text-cyan-400" /> Market Predictions</h2>
              <ul className="space-y-2">
                {economicPredictions.map((pred, idx) => (
                  <li key={idx} className="bg-blue-800/70 rounded p-3">
                    <span className="font-mono">{pred.summary || JSON.stringify(pred)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "nervous" && (
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Radar className="text-cyan-400" /> Global Economic Nervous System</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-blue-800/60 p-3 rounded">Market Sensors: {globalEconomicNervousSystem.marketSensors}%</div>
                <div className="bg-blue-800/60 p-3 rounded">Predictive Deployment: {globalEconomicNervousSystem.predictiveDeployment}%</div>
                <div className="bg-blue-800/60 p-3 rounded">Translation: {globalEconomicNervousSystem.crossCulturalTranslation}%</div>
                <div className="bg-blue-800/60 p-3 rounded">Forecasting: {globalEconomicNervousSystem.economicWeatherForecasting}%</div>
                <div className="bg-blue-800/60 p-3 rounded">Emerging Penetration: {globalEconomicNervousSystem.emergingMarketPenetration}%</div>
                <div className="bg-blue-800/60 p-3 rounded">Competitor Preemption: {globalEconomicNervousSystem.competitorPreemption}%</div>
              </div>
            </div>
          )}

          {activeTab === "automation" && (
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Zap className="text-yellow-400" /> Automation Log</h2>
              <ul className="space-y-2">
                {automationLog.slice().reverse().map(log => (
                  <li key={log.id} className="bg-blue-800/60 rounded p-2 flex justify-between">
                    <span className="font-mono">{log.time} | {log.task}</span>
                    <span className="text-xs">{log.priority} | {log.agentId}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Settings className="text-cyan-400" /> Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block font-bold mb-1">Currency</label>
                  <select value={currency} onChange={e => setCurrency(e.target.value)} className="bg-blue-800 border border-blue-500 px-3 py-1 rounded text-white">
                    <option value="NGN">₦ NGN</option>
                    <option value="USD">$ USD</option>
                    <option value="GBP">£ GBP</option>
                    <option value="EUR">€ EUR</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">AI Autonomy Level</label>
                  <input type="range" min={0} max={100} value={aiControlPanel.autonomyLevel}
                    onChange={e => setAiControlPanel(p => ({ ...p, autonomyLevel: Number(e.target.value) }))}
                  />
                  <span className="ml-2">{aiControlPanel.autonomyLevel}%</span>
                </div>
                <div>
                  <label className="block font-bold mb-1">Market Aggressiveness</label>
                  <input type="range" min={0} max={100} value={aiControlPanel.marketAggressiveness}
                    onChange={e => setAiControlPanel(p => ({ ...p, marketAggressiveness: Number(e.target.value) }))}
                  />
                  <span className="ml-2">{aiControlPanel.marketAggressiveness}%</span>
                </div>
                <div>
                  <label className="block font-bold mb-1">Risk Tolerance</label>
                  <input type="range" min={0} max={100} value={aiControlPanel.riskTolerance}
                    onChange={e => setAiControlPanel(p => ({ ...p, riskTolerance: Number(e.target.value) }))}
                  />
                  <span className="ml-2">{aiControlPanel.riskTolerance}%</span>
                </div>
                <div className="flex gap-3">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={aiControlPanel.globalExpansion}
                      onChange={e => setAiControlPanel(p => ({ ...p, globalExpansion: e.target.checked }))}
                    /> Global Expansion
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={aiControlPanel.economicManipulation}
                      onChange={e => setAiControlPanel(p => ({ ...p, economicManipulation: e.target.checked }))}
                    /> Economic Manipulation
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={aiControlPanel.culturalAdaptation}
                      onChange={e => setAiControlPanel(p => ({ ...p, culturalAdaptation: e.target.checked }))}
                    /> Cultural Adaptation
                  </label>
                </div>
                <div className="flex gap-3">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={aiControlPanel.quantumCommerceActive}
                      onChange={e => setAiControlPanel(p => ({ ...p, quantumCommerceActive: e.target.checked }))}
                    /> Quantum Commerce
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={aiControlPanel.economicWeatherEnabled}
                      onChange={e => setAiControlPanel(p => ({ ...p, economicWeatherEnabled: e.target.checked }))}
                    /> Economic Weather
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NeuralCommerceEcosystem;
