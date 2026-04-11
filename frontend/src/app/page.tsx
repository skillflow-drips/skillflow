import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30">
      <Navbar />
      
      <main className="container mx-auto px-6 pt-32 pb-24 text-center">
        <div className="relative inline-block">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 blur opacity-30 animate-pulse"></div>
          <span className="relative px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium backdrop-blur-xl">
            Powered by Stellar Soroban
          </span>
        </div>
        
        <h1 className="mt-8 text-6xl md:text-8xl font-bold tracking-tight">
          <span className="bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
            Freelancing,
          </span>
          <br />
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Decentralized.
          </span>
        </h1>
        
        <p className="mt-8 max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed">
          SkillFlow uses smart contracts to guarantee payments. No middlemen, no delays, 
          just code-enforced trust for the global workforce.
        </p>
        
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/jobs"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 font-semibold transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
          >
            Explore Jobs
          </Link>
          <Link 
            href="/tokens"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 font-semibold backdrop-blur-xl transition-all active:scale-95"
          >
            Get Tokens
          </Link>
        </div>
        
        {/* Features Preview */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Safe Escrow', desc: 'Secure USDC payments held onchain.' },
            { title: 'Atomic Payouts', desc: 'Immediate release upon approval.' },
            { title: 'Zero Fees', desc: 'Only 5% platform commission on success.' }
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md">
              <h3 className="text-xl font-bold text-white">{feature.title}</h3>
              <p className="mt-2 text-slate-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
