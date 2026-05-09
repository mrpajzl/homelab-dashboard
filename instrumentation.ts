const endpoint = process.env.OBSERVABILITY_INGEST_URL || "https://observability.ondrejzraly.cz/v1/events";
const token = process.env.OBSERVABILITY_TOKEN;
const app = process.env.NEXT_PUBLIC_OBSERVABILITY_APP || process.env.OBSERVABILITY_APP || "homeassistant";

async function report(event: Record<string, unknown>) {
  if (!token) return;
  try {
    await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
      body: JSON.stringify({ app, source: "server", ts: new Date().toISOString(), ...event }),
      cache: "no-store",
    });
  } catch {}
}

export async function onRequestError(error: unknown, request: { path: string; method: string }, context: { routerKind?: string; routePath?: string; renderSource?: string }) {
  await report({
    kind: "server_error",
    level: "error",
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    path: request.path,
    method: request.method,
    ...context,
  });
}
