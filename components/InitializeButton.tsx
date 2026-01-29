"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";

export function InitializeButton() {
  const initializeServices = useMutation(api.services.initializeDefaults);
  const initializeSettings = useMutation(api.settings.initializeDefaults);
  const [loading, setLoading] = useState(false);

  const handleInitialize = async () => {
    setLoading(true);
    try {
      await initializeServices();
      await initializeSettings();
      window.location.reload();
    } catch (error) {
      console.error("Failed to initialize:", error);
      alert("Failed to initialize dashboard. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleInitialize}
      disabled={loading}
      className="px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white rounded-lg text-lg font-semibold transition-colors duration-200"
    >
      {loading ? "Initializing..." : "Initialize Dashboard"}
    </button>
  );
}
