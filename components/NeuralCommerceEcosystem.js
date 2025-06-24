// NeuralCommerceEcosystem.js (Full Implementation)
"use client";
import React, { useState, useEffect } from "react";
import { Rocket, Brain, Gauge, RefreshCw } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function NeuralCommerceEcosystem() {
  const [isActive, setIsActive] = useState(false);
  const [strategies, setStrategies] = useState([
    { name: "Predictive Arbitrage", active: false, roi: "37%" },
    { name: "AI Audience Cloning", active: false, roi: "42%" }
  ]);
  
  const [marketData, setMarketData] = useState({
    economicPulse: 0,
    neuralInfluence: 0
  });

  // Activate Strategy
  const activateStrategy = async (strategyName) => {
    try {
      const response = await fetch(`${API_URL}/neural/activate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ strategy: strategyName })
      });
      
      const updatedStrategies = strategies.map(strategy => ({
        ...strategy,
        active: strategy.name === strategyName
      }));
      
      setStrategies(updatedStrategies);
      setIsActive(true);
      
      // Start data updates
      const interval = setInterval(() => {
        setMarketData(prev => ({
          economicPulse: Math.min(100, prev.economicPulse + Math.random() * 2),
          neuralInfluence: Math.min(100, prev.neuralInfluence + Math.random() * 1.5)
        }));
      }, 5000);
      
      return () => clearInterval(interval);
    } catch (error) {
      console.error("Strategy activation failed:", error);
    }
  };

  return (
    <div className="neural-dashboard">
      <div className="header">
        <h2><Brain /> Neural Commerce Ecosystem</h2>
        <div className="status-indicator">
          <span className={`status-dot ${isActive ? 'active' : ''}`}></span>
          {isActive ? 'ACTIVE' : 'INACTIVE'}
        </div>
      </div>
      
      {/* Strategy Selection */}
      <div className="strategy-selector">
        <h3><Rocket /> Select AI Strategy</h3>
        <div className="strategies">
          {strategies.map(strategy => (
            <div 
              key={strategy.name}
              className={`strategy-card ${strategy.active ? 'active' : ''}`}
              onClick={() => !strategy.active && activateStrategy(strategy.name)}
            >
              <h4>{strategy.name}</h4>
              <p>ROI: {strategy.roi}</p>
              {strategy.active && <div className="active-badge">ACTIVE</div>}
            </div>
          ))}
        </div>
      </div>
      
      {/* Market Data */}
      <div className="market-data">
        <div className="metric">
          <Gauge />
          <h4>Economic Pulse</h4>
          <p>{marketData.economicPulse.toFixed(1)}%</p>
        </div>
        <div className="metric">
          <RefreshCw />
          <h4>Neural Influence</h4>
          <p>{marketData.neuralInfluence.toFixed(1)}%</p>
        </div>
      </div>
    </div>
  );
}
