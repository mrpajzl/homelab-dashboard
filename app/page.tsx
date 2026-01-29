"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { ServiceTile } from "@/components/ServiceTile";
import { Header } from "@/components/Header";
import { SystemStats } from "@/components/SystemStats";
import { InitializeButton } from "@/components/InitializeButton";

export default function Home() {
  const services = useQuery(api.services.list);
  const settings = useQuery(api.settings.list);

  if (!services || !settings) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading dashboard...</div>
      </div>
    );
  }

  // Check if dashboard is initialized
  if (services.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to Your Homelab Dashboard
          </h1>
          <p className="text-slate-300 mb-8">
            Initialize your dashboard with default services to get started
          </p>
          <InitializeButton />
        </div>
      </div>
    );
  }

  const groupedServices = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, typeof services>);

  const categoryConfig: Record<string, { title: string; icon: string }> = {
    arr: { title: "Arr Stack", icon: "📚" },
    storage: { title: "Storage", icon: "💾" },
    downloads: { title: "Downloads", icon: "⬇️" },
    projects: { title: "Projects", icon: "🚀" },
    quick: { title: "Quick Access", icon: "⚡" },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Header title={settings.dashboardTitle || "🏠 Homelab Dashboard"} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Object.entries(groupedServices).map(([category, categoryServices]) => {
            const config = categoryConfig[category] || { title: category, icon: "📦" };
            const isProjectsCategory = category === "projects";

            return (
              <div
                key={category}
                className={`bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${
                  isProjectsCategory ? "md:col-span-2 lg:col-span-3" : ""
                }`}
              >
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span>{config.icon}</span>
                  <span>{config.title}</span>
                </h2>
                <div className={`grid gap-3 ${isProjectsCategory ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
                  {categoryServices
                    .filter((s) => s.enabled)
                    .map((service) => (
                      <ServiceTile key={service._id} service={service} />
                    ))}
                </div>
              </div>
            );
          })}
        </div>

        {settings.showSystemStats === "true" && <SystemStats />}

        <div className="text-center mt-8">
          <Link
            href="/settings"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            ⚙️ Settings
          </Link>
        </div>

        <footer className="text-center mt-12 text-slate-400 text-sm">
          Last updated: {new Date().toLocaleTimeString()}
        </footer>
      </div>
    </div>
  );
}
