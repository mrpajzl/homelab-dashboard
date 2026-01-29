"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";

export default function SettingsPage() {
  const services = useQuery(api.services.list);
  const settings = useQuery(api.settings.list);
  
  const addService = useMutation(api.services.add);
  const updateService = useMutation(api.services.update);
  const removeService = useMutation(api.services.remove);
  const setSetting = useMutation(api.settings.set);

  const [newService, setNewService] = useState({
    name: "",
    category: "quick",
    url: "",
    icon: "🔗",
  });

  const [editingService, setEditingService] = useState<string | null>(null);

  const handleAddService = async () => {
    if (!newService.name || !newService.url) return;

    await addService({
      name: newService.name,
      category: newService.category,
      url: newService.url,
      icon: newService.icon,
      order: (services?.length || 0) + 1,
    });

    setNewService({ name: "", category: "quick", url: "", icon: "🔗" });
  };

  const handleUpdateService = async (
    id: Id<"services">,
    updates: { name?: string; url?: string; icon?: string; enabled?: boolean }
  ) => {
    await updateService({ id, ...updates });
  };

  const handleRemoveService = async (id: Id<"services">) => {
    if (confirm("Are you sure you want to delete this service?")) {
      await removeService({ id });
    }
  };

  const handleUpdateSetting = async (key: string, value: string) => {
    await setSetting({ key, value });
  };

  if (!services || !settings) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-white">⚙️ Settings</h1>
          <Link
            href="/"
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* General Settings */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">General Settings</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 mb-2">Dashboard Title</label>
              <input
                type="text"
                value={settings.dashboardTitle || ""}
                onChange={(e) => handleUpdateSetting("dashboardTitle", e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2">Update Interval (ms)</label>
              <input
                type="number"
                value={settings.updateInterval || "60000"}
                onChange={(e) => handleUpdateSetting("updateInterval", e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="showSystemStats"
                checked={settings.showSystemStats === "true"}
                onChange={(e) => handleUpdateSetting("showSystemStats", e.target.checked.toString())}
                className="w-5 h-5 rounded bg-slate-700 border-slate-600"
              />
              <label htmlFor="showSystemStats" className="text-slate-300">
                Show System Stats
              </label>
            </div>
          </div>
        </div>

        {/* Services Management */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">Services</h2>

          {/* Add New Service */}
          <div className="mb-6 p-4 bg-slate-700/50 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-3">Add New Service</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
              <input
                type="text"
                placeholder="Service Name"
                value={newService.name}
                onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                className="px-4 py-2 bg-slate-600 text-white rounded-lg border border-slate-500 focus:border-blue-500 focus:outline-none"
              />
              <select
                value={newService.category}
                onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                className="px-4 py-2 bg-slate-600 text-white rounded-lg border border-slate-500 focus:border-blue-500 focus:outline-none"
              >
                <option value="arr">Arr Stack</option>
                <option value="storage">Storage</option>
                <option value="downloads">Downloads</option>
                <option value="projects">Projects</option>
                <option value="quick">Quick Access</option>
              </select>
              <input
                type="text"
                placeholder="URL"
                value={newService.url}
                onChange={(e) => setNewService({ ...newService, url: e.target.value })}
                className="px-4 py-2 bg-slate-600 text-white rounded-lg border border-slate-500 focus:border-blue-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Icon (emoji)"
                value={newService.icon}
                onChange={(e) => setNewService({ ...newService, icon: e.target.value })}
                className="px-4 py-2 bg-slate-600 text-white rounded-lg border border-slate-500 focus:border-blue-500 focus:outline-none"
              />
              <button
                onClick={handleAddService}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Add Service
              </button>
            </div>
          </div>

          {/* Existing Services */}
          <div className="space-y-3">
            {services.map((service) => (
              <div
                key={service._id}
                className="flex items-center gap-3 p-4 bg-slate-700/50 rounded-lg"
              >
                <input
                  type="checkbox"
                  checked={service.enabled}
                  onChange={(e) =>
                    handleUpdateService(service._id, { enabled: e.target.checked })
                  }
                  className="w-5 h-5 rounded bg-slate-600 border-slate-500"
                />
                
                {editingService === service._id ? (
                  <>
                    <input
                      type="text"
                      value={service.icon}
                      onChange={(e) =>
                        handleUpdateService(service._id, { icon: e.target.value })
                      }
                      className="w-16 px-2 py-1 bg-slate-600 text-white rounded border border-slate-500 text-center"
                    />
                    <input
                      type="text"
                      value={service.name}
                      onChange={(e) =>
                        handleUpdateService(service._id, { name: e.target.value })
                      }
                      className="flex-1 px-3 py-1 bg-slate-600 text-white rounded border border-slate-500"
                    />
                    <input
                      type="text"
                      value={service.url}
                      onChange={(e) =>
                        handleUpdateService(service._id, { url: e.target.value })
                      }
                      className="flex-1 px-3 py-1 bg-slate-600 text-white rounded border border-slate-500"
                    />
                    <button
                      onClick={() => setEditingService(null)}
                      className="px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
                    >
                      Done
                    </button>
                  </>
                ) : (
                  <>
                    <span className="text-2xl">{service.icon}</span>
                    <span className="flex-1 text-white font-medium">{service.name}</span>
                    <span className="text-slate-400 text-sm">{service.category}</span>
                    <a
                      href={service.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-sm truncate max-w-xs"
                    >
                      {service.url}
                    </a>
                    <button
                      onClick={() => setEditingService(service._id)}
                      className="px-3 py-1 bg-slate-600 hover:bg-slate-500 text-white rounded transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleRemoveService(service._id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* API Keys Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-4">API Keys</h2>
          <p className="text-slate-400 mb-4">
            Configure API keys for integrations (Vercel, GitHub, TrueNAS, etc.)
          </p>
          <div className="text-slate-500">
            <p>API key management coming soon...</p>
            <p className="text-sm mt-2">
              For now, configure API integrations in your backend or environment variables.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
