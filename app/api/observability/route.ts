import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const endpoint = process.env.OBSERVABILITY_INGEST_URL || "https://observability.ondrejzraly.cz/v1/events";
const token = process.env.OBSERVABILITY_TOKEN;
const defaultApp = process.env.NEXT_PUBLIC_OBSERVABILITY_APP || process.env.OBSERVABILITY_APP || "homeassistant";

export async function POST(request: NextRequest) {
  if (!token) return NextResponse.json({ ok: false }, { status: 204 });

  try {
    const payload = await request.json();
    const event = {
      ...payload,
      app: payload.app || defaultApp,
      source: payload.source || "browser",
      userAgent: request.headers.get("user-agent"),
      referer: request.headers.get("referer"),
    };

    await fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(event),
      cache: "no-store",
    });
  } catch {
    // Telemetry must never affect the app.
  }

  return NextResponse.json({ ok: true });
}
