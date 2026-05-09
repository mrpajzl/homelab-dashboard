"use client";

import { useEffect } from "react";
import { useReportWebVitals } from "next/web-vitals";

const appName = process.env.NEXT_PUBLIC_OBSERVABILITY_APP || "homeassistant";

function send(event: Record<string, unknown>) {
  const body = JSON.stringify({ ...event, app: appName, url: window.location.href, ts: new Date().toISOString() });
  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    if (navigator.sendBeacon("/api/observability", blob)) return;
  }
  fetch("/api/observability", { method: "POST", headers: { "content-type": "application/json" }, body, keepalive: true }).catch(() => {});
}

export default function ObservabilityClient() {
  useReportWebVitals((metric) => {
    send({ kind: "web_vital", level: "info", name: metric.name, value: metric.value, rating: metric.rating, id: metric.id, navigationType: metric.navigationType });
  });

  useEffect(() => {
    const onError = (event: ErrorEvent) => {
      send({ kind: "client_error", level: "error", message: event.message, filename: event.filename, lineno: event.lineno, colno: event.colno, stack: event.error?.stack });
    };
    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      send({ kind: "unhandled_rejection", level: "error", message: reason?.message || String(reason), stack: reason?.stack });
    };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onUnhandledRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
    };
  }, []);

  return null;
}
