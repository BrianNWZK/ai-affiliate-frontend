"use client";
import React from "react";
import AffiliateMarketingAI from "../../components/AffiliateMarketingAI";
import NeuralCommerceEcosystem from "../../components/NeuralCommerceEcosystem";

export default function Dashboard() {
  return (
    <div>
      {/* You can add a section header or navigation if you like */}
      {/* <h1 className="text-3xl font-bold mb-8">Dashboard</h1> */}

      {/* Render Affiliate Marketing AI */}
      <div className="mb-12">
        <AffiliateMarketingAI />
      </div>

      {/* Render Neural Commerce Ecosystem */}
      <div>
        <NeuralCommerceEcosystem />
      </div>
    </div>
  );
}
