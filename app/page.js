import AffiliateMarketingAI from '../components/AffiliateMarketingAI';
import NeuralCommerceEcosystem from '../components/NeuralCommerceEcosystem';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">
        Welcome to AI Affiliate Marketing System Dashboard
      </h1>
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <AffiliateMarketingAI />
        <NeuralCommerceEcosystem />
      </div>
    </main>
  );
}
