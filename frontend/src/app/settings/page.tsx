import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function SettingsPage() {
  return (
    <div className="flex bg-[#030712] min-h-screen">
      <Sidebar />
      <main className="flex-1 p-12">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-white mb-2">Account Settings</h1>
          <p className="text-gray-400">Manage your profile visibility and wallet security.</p>
        </header>

        <section className="max-w-2xl space-y-8">
          <div className="glass p-8 rounded-3xl space-y-6">
            <h2 className="text-xl font-semibold text-white">Public Profile</h2>
            <Input label="Display Name" defaultValue="Ana R." />
            <Input label="Professional Bio" defaultValue="Soroban Specialist & Full-Stack Architect." />
            <Button variant="primary">Update Profile</Button>
          </div>

          <div className="glass p-8 rounded-3xl space-y-4">
            <h2 className="text-xl font-semibold text-white">Security</h2>
            <p className="text-sm text-gray-500">Authorized Stellar Wallet: GD...1234</p>
            <Button variant="secondary">Rotate Wallet Address</Button>
          </div>
        </section>
      </main>
    </div>
  );
}
