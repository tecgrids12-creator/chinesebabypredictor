export { renderers } from '../../renderers.mjs';

const prerender = false;
const attempts = /* @__PURE__ */ new Map();
const WINDOW_MS = 6e4;
const MAX_PER_WINDOW = 5;
function rateLimited(ip) {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || entry.reset < now) {
    attempts.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}
const POST = async ({ request }) => {
  const contentType = request.headers.get("content-type") ?? "";
  let payload;
  try {
    if (contentType.includes("application/json")) {
      payload = await request.json();
    } else {
      const form = await request.formData();
      payload = Object.fromEntries(form.entries());
    }
  } catch {
    return json({ ok: false, error: "Malformed request." }, 400);
  }
  const ip = (request.headers.get("x-forwarded-for") ?? "local").split(",")[0].trim();
  if (typeof payload._honey === "string" && payload._honey.length > 0) {
    return json({ ok: true, message: "Thanks!" });
  }
  if (rateLimited(ip)) {
    return json({ ok: false, error: "Too many messages too fast — please wait a minute." }, 429);
  }
  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const subject = typeof payload.subject === "string" ? payload.subject.trim().slice(0, 200) : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  if (!name || name.length > 120) return json({ ok: false, error: "Please add your name." }, 422);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return json({ ok: false, error: "That email looks off — please check it." }, 422);
  if (!message || message.length > 5e3) return json({ ok: false, error: "Please write a message (max 5000 chars)." }, 422);
  {
    console.log("[contact] (dev mode, no Web3Forms key set)", { name, email, subject, message: message.slice(0, 120) });
    return json({ ok: true, message: "Message received (dev mode)." });
  }
};
function json(body, status) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
