import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen bg-[#0B0F1A]">
      <Sidebar />
      <main className="flex-1 p-12">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-[#F9FAFB] mb-2">Account Settings</h1>
          <p className="text-[#64748B]">Manage your profile visibility and wallet security.</p>
        </header>

        <section className="max-w-2xl space-y-8">
          <div className="glass p-8 rounded-3xl space-y-6">
            <h2 className="text-xl font-semibold text-[#F9FAFB]">Public Profile</h2>
            <Input label="Display Name" defaultValue="Ana R." />
            <Input label="Professional Bio" defaultValue="Soroban Specialist & Full-Stack Architect." />
            <Button variant="primary">Update Profile</Button>
          </div>

          <div className="glass p-8 rounded-3xl space-y-4">
            <h2 className="text-xl font-semibold text-[#F9FAFB]">Security</h2>
            <p className="text-sm text-[#64748B]">Connect a wallet to authorize this workspace.</p>
            <Button variant="secondary">Rotate Wallet Address</Button>
          </div>
        </section>
      </main>
    </div>
  );
}
