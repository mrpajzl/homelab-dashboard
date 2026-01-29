"use client";

import { useEffect, useState } from "react";

export function SystemStats() {
  const [cpu, setCpu] = useState(0);
  const [ram, setRam] = useState(0);

  useEffect(() => {
    // Simulate stats - in production, fetch from your monitoring API
    const interval = setInterval(() => {
      setCpu(Math.floor(Math.random() * 40) + 20);
      setRam(Math.floor(Math.random() * 30) + 40);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <span>💻</span>
        <span>System</span>
      </h2>
      <div className="space-y-4">
        <StatBar label="CPU" value={cpu} />
        <StatBar label="RAM" value={ram} />
      </div>
    </div>
  );
}

function StatBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-slate-300 w-12 text-sm">{label}</span>
      <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-slate-400 w-12 text-right text-sm">{value}%</span>
    </div>
  );
}
