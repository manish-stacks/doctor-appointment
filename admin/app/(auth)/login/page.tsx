'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  const { login, isAuthenticated, currentUser, isLoading, error } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      if (currentUser.role === 'SUPER_ADMIN') {
        router.replace('/super-admin/dashboard');
      } else if (currentUser.role === 'STAFF') {
        router.replace('/staff/dashboard');
      } 
    }
  }, [isAuthenticated, currentUser, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0f172a] overflow-hidden">

      {/* Background Glow Effects */}
      <div className="absolute w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl top-[-100px] left-[-100px]" />
      <div className="absolute w-96 h-96 bg-purple-600/30 rounded-full blur-3xl bottom-[-100px] right-[-100px]" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
            H
          </div>
          <h2 className="text-2xl font-semibold text-white">
            Welcome to DMS
          </h2>
          <p className="text-sm text-gray-300 mt-2">
            Secure access to your dashboard
          </p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-400 text-red-300 p-3 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="text-sm text-gray-300">Email</label>
            <Input
              type="email"
              placeholder="admin@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 bg-white/20 border-white/20 text-white placeholder:text-gray-400"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 bg-white/20 border-white/20 text-white placeholder:text-gray-400"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-6 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition-all duration-300 text-white font-semibold"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
        
        <div className="text-center text-xs text-gray-400 mt-6">
          © 2026 gmail System
        </div>

      </div>
    </div>
  );
}
