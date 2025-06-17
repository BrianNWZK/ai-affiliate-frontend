"use client";
import React, { useState, useEffect } from "react";
import {
  Play, Pause, Settings, TrendingUp, Mail,
  FileText, Share2, DollarSign, Target,
  Calendar, BarChart3, Bot, Zap, Clock, CreditCard, FilePlus,
  ShoppingCart, Star, Users, AlertCircle, ExternalLink,
  Rocket, TrendingDown, Eye, MousePointer, Gift
} from "lucide-react";

const AffiliateMarketingAI = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentTask, setCurrentTask] = useState("");
  const [stats, setStats] = useState({
    contentCreated: 0,
    emailsSent: 0,
    socialPosts: 0,
    leads: 0,
    revenue: 0,
    conversions: 0,
    clickThrough: 0,
    activeProducts: 0
  });
  const [automationLog, setAutomationLog] = useState([]);
  const [currency, setCurrency] = useState("NGN");
  const [amazonProducts, setAmazonProducts] = useState([]);
  const [tiktokScript, setTiktokScript] = useState(null);
  const [campaignEmail, setCampaignEmail] = useState("");
  const [blogPost, setBlogPost] = useState(null);
  const [urgencyTimer, setUrgencyTimer] = useState(3600); // 1 hour countdown
  const [showUpsell, setShowUpsell] = useState(false);
  const [leadMagnets, setLeadMagnets] = useState([]);
  const [conversionFunnels, setConversionFunnels] = useState([]);
  
  const API = "https://ai-affiliate-backend.onrender.com";

  // Aggressive revenue tracking
  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const res = await fetch(`${API}/paystack/revenue`);
        const data = await res.json();
        if (data?.total !== undefined) {
          setStats(prev => ({ 
            ...prev, 
            revenue: data.total,
            conversions: data.conversions || prev.conversions,
            clickThrough: data.clickThrough || prev.clickThrough
          }));
        }
      } catch (error) {
        console.error("Revenue fetch failed:", error);
      }
    };

    fetchRevenueData();
    const interval = setInterval(fetchRevenueData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [API]);

  // Urgency countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setUrgencyTimer(prev => prev > 0 ? prev - 1 : 3600);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Enhanced buy now with upsells
  const handleBuyNow = async (productPrice = 1000, productName = "Premium Package") => {
    try {
      setShowUpsell(true);
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
            timestamp: new Date().toISOString()
          }
        })
      });
      const data = await res.json();
      if (data.authorization_url) {
        // Track conversion attempt
        trackEvent('checkout_initiated', { amount: productPrice, product: productName });
        window.open(data.authorization_url, "_blank");
      } else {
        alert("Checkout failed. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Error during checkout. Please try again.");
    }
  };

  // Track user events for optimization
  const trackEvent = async (eventName, data = {}) => {
    try {
      await fetch(`${API}/analytics/track`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: eventName,
          data: { ...data, timestamp: new Date().toISOString() },
          user_agent: navigator.userAgent,
          url: window.location.href
        })
      });
    } catch (error) {
      console.error("Tracking failed:", error);
    }
  };

  // Generate high-converting content
  const generateRevenueContent = async (contentType) => {
    try {
      const res = await fetch(`${API}/api/generate-content`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          type: contentType,
          niche: "affiliate marketing",
          urgency: true,
          currency: currency
        })
      });
      const data = await res.json();
      
      if (contentType === "blog") {
        setBlogPost(data);
      } else if (contentType === "email") {
        setCampaignEmail(data.content);
      } else if (contentType === "social") {
        setTiktokScript(data);
      }
      
      trackEvent('content_generated', { type: contentType });
    } catch (error) {
      console.error("Content generation failed:", error);
    }
  };

  // Fetch trending products
  const fetchTrendingProducts = async () => {
    try {
      const res = await fetch(`${API}/api/trending-products?currency=${currency}`);
      const data = await res.json();
      setAmazonProducts(data.products || []);
      setStats(prev => ({ ...prev, activeProducts: data.products?.length || 0 }));
    } catch (error) {
      console.error("Products fetch failed:", error);
    }
  };

  // Enhanced automation tasks
  const automationTasks = [
    "🎯 Targeting high-intent buyers...",
    "💰 Optimizing conversion funnels...",
    "📧 Sending personalized offers...",
    "🚀 Launching viral campaigns...",
    "⚡ A/B testing sales pages...",
    "📈 Scaling profitable ads...",
    "🔥 Creating urgency content...",
    "💎 Identifying premium prospects..."
  ];

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        const task = automationTasks[Math.floor(Math.random() * automationTasks.length)];
        setCurrentTask(task);
        setStats(prev => ({
          ...prev,
          contentCreated: prev.contentCreated + Math.floor(Math.random() * 3) + 1,
          emailsSent: prev.emailsSent + Math.floor(Math.random() * 50) + 25,
          socialPosts: prev.socialPosts + Math.floor(Math.random() * 5) + 2,
          leads: prev.leads + Math.floor(Math.random() * 8) + 3,
          conversions: prev.conversions + Math.floor(Math.random() * 3) + 1,
          clickThrough: prev.clickThrough + Math.floor(Math.random() * 15) + 5
        }));
        setAutomationLog(prev => [...prev.slice(-4), {
          time: new Date().toLocaleTimeString(),
          task, 
          id: Date.now(),
          priority: Math.random() > 0.7 ? "high" : "normal"
        }]);
      }, 2000); // Faster updates for urgency
    }
    return () => clearInterval(interval);
  }, [isRunning]);

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
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Urgency Banner */}
        <div className="bg-gradient-to-r from-red-600 to-orange-500 p-4 rounded-xl mb-6 text-center animate-pulse">
          <div className="flex items-center justify-center gap-2 mb-2">
            <AlertCircle className="text-white animate-bounce" size={24} />
            <span className="text-xl font-bold">⚡ LIMITED TIME OFFER ⚡</span>
          </div>
          <p className="text-lg">Special discount expires in: <span className="font-mono text-2xl text-yellow-300">{formatTime(urgencyTimer)}</span></p>
        </div>

        <h1 className="text-5xl font-bold mb-6 flex items-center gap-3 animate-fade-in">
          <Bot className="text-cyan-400 animate-spin-slow" size={50} /> 
          AI Revenue Generator 🚀
        </h1>

        {/* Enhanced Control Panel */}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl mb-6 border border-white/20 shadow-2xl">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <h2 className="text-3xl font-semibold flex items-center gap-2">
              <Zap className="text-yellow-400 animate-pulse" /> Revenue Control Center
            </h2>
            <div className="flex items-center gap-3">
              <select
                value={currency}
                onChange={e => {
                  setCurrency(e.target.value);
                  trackEvent('currency_changed', { currency: e.target.value });
                }}
                className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg backdrop-blur-sm"
              >
                <option value="NGN">₦ Naira</option>
                <option value="USD">$ US Dollar</option>
                <option value="GBP">£ British Pound</option>
                <option value="EUR">€ Euro</option>
              </select>
              
              <button
                onClick={() => handleBuyNow(5000, "Premium AI Package")}
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-6 py-3 rounded-lg font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-200 animate-bounce"
              >
                <Gift size={20} /> Get Premium 70% OFF
              </button>

              <button
                onClick={() => {
                  setIsRunning(!isRunning);
                  trackEvent(isRunning ? 'automation_paused' : 'automation_started');
                }}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-200 ${
                  isRunning 
                    ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700" 
                    : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                }`}
              >
                {isRunning ? <Pause size={24} /> : <Play size={24} />} 
                {isRunning ? "Pause Revenue" : "Start Making Money"}
              </button>
            </div>
          </div>
          
          {isRunning && (
            <div className="mt-4 p-4 bg-blue-600/20 rounded-lg border border-blue-400/30">
              <p className="text-blue-300 text-lg flex items-center gap-2">
                <Clock size={20} className="animate-spin" /> {currentTask}
              </p>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div className="bg-gradient-to-r from-blue-400 to-cyan-400 h-2 rounded-full animate-pulse" style={{width: '75%'}}></div>
              </div>
            </div>
          )}
        </div>

        {/* Revenue Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Revenue", value: `${currencySymbol}${stats.revenue.toLocaleString()}`, icon: DollarSign, color: "from-green-500 to-emerald-600", change: "+23%" },
            { label: "Conversions", value: stats.conversions.toLocaleString(), icon: Target, color: "from-blue-500 to-cyan-600", change: "+45%" },
            { label: "Click-Through", value: `${stats.clickThrough.toLocaleString()}`, icon: MousePointer, color: "from-purple-500 to-pink-600", change: "+67%" },
            { label: "Active Leads", value: stats.leads.toLocaleString(), icon: Users, color: "from-orange-500 to-red-600", change: "+12%" }
          ].map((stat, index) => (
            <div key={index} className={`bg-gradient-to-br ${stat.color} p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300`}>
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

        {/* Quick Revenue Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Rocket className="text-orange-400" /> Instant Revenue Boost
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => generateRevenueContent('blog')}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-4 py-3 rounded-lg font-semibold transition-all duration-200"
              >
                Generate High-Converting Blog
              </button>
              <button
                onClick={() => generateRevenueContent('email')}
                className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 px-4 py-3 rounded-lg font-semibold transition-all duration-200"
              >
                Create Sales Email Campaign
              </button>
              <button
                onClick={fetchTrendingProducts}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 px-4 py-3 rounded-lg font-semibold transition-all duration-200"
              >
                Find Hot Products to Promote
              </button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="text-green-400" /> Live Activity Feed
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {automationLog.map((log) => (
                <div key={log.id} className={`p-3 rounded-lg ${log.priority === 'high' ? 'bg-red-500/20 border border-red-400/30' : 'bg-white/5'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{log.task}</span>
                    <span className="text-xs text-gray-400">{log.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Star className="text-yellow-400" /> Premium Offers
            </h3>
            <div className="space-y-3">
              <div className="p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-400/30">
                <h4 className="font-bold text-lg">AI Automation Suite</h4>
                <p className="text-sm text-gray-300 mb-2">Complete affiliate marketing automation</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{currencySymbol}9,999</span>
                  <button
                    onClick={() => handleBuyNow(9999, "AI Automation Suite")}
                    className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg font-bold text-black transition-colors duration-200"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-400/30">
                <h4 className="font-bold text-lg">Done-for-You Campaigns</h4>
                <p className="text-sm text-gray-300 mb-2">Ready-to-launch profit campaigns</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{currencySymbol}4,999</span>
                  <button
                    onClick={() => handleBuyNow(4999, "Done-for-You Campaigns")}
                    className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg font-bold transition-colors duration-200"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Generated Content Display */}
        {blogPost && (
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl mb-6 border border-white/20">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FileText className="text-blue-400" /> AI-Generated Revenue Content
            </h3>
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="font-bold text-xl mb-2 text-yellow-300">{blogPost.title}</h4>
              <p className="text-gray-300 mb-4">{blogPost.intro}</p>
              <div className="text-gray-200" dangerouslySetInnerHTML={{ __html: blogPost.body }} />
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => trackEvent('content_shared', { type: 'blog', title: blogPost.title })}
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-semibold flex items-center gap-2"
                >
                  <Share2 size={16} /> Share Content
                </button>
                <button
                  onClick={() => handleBuyNow(2499, "Content Monetization Package")}
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-semibold flex items-center gap-2"
                >
                  <DollarSign size={16} /> Monetize This
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Hot Products Section */}
        {amazonProducts.length > 0 && (
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl mb-6 border border-white/20">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <ShoppingCart className="text-green-400" /> Hot Products to Promote
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {amazonProducts.slice(0, 6).map((product, index) => (
                <div key={index} className="bg-white/5 p-4 rounded-lg border border-white/10 hover:border-white/30 transition-all duration-200">
                  <h4 className="font-bold text-lg mb-2">{product.name}</h4>
                  <p className="text-gray-300 text-sm mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-400">{currencySymbol}{product.price}</span>
                    <button
                      onClick={() => {
                        trackEvent('affiliate_link_clicked', { product: product.name });
                        window.open(product.affiliateLink, '_blank');
                      }}
                      className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 px-4 py-2 rounded-lg font-bold flex items-center gap-2"
                    >
                      <ExternalLink size={16} /> Promote
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 rounded-xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to 10X Your Revenue? 🚀</h2>
          <p className="text-xl mb-6">Join thousands of successful affiliates making passive income with AI</p>
          <button
            onClick={() => handleBuyNow(19999, "Ultimate Revenue Package")}
            className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-xl shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Start Making Money Now - {currencySymbol}19,999
          </button>
        </div>
      </div>
    </div>
  );
};

export default AffiliateMarketingAI;
