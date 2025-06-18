"use client";
import React, { Suspense } from "react";
import AffiliateMarketingAI from "./AffiliateMarketingAI"; // adjust if not in the same folder
import NeuralCommerceEcosystem from "./NeuralCommerceEcosystem"; // adjust if not in the same folder

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-12 p-8 max-w-7xl mx-auto">
      <Suspense fallback={<div>Loading Affiliate Marketing AI...</div>}>
        <AffiliateMarketingAI />
      </Suspense>
      <Suspense fallback={<div>Loading Neural Commerce Ecosystem...</div>}>
        <NeuralCommerceEcosystem />
      </Suspense>
    </div>
  );
}
