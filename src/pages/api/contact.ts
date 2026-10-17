export const prerender = false;

import type { APIRoute } from 'astro';

/**
 * Web3Forms-compatible contact endpoint.
 * - Validates the payload server-side ( honeypot + required fields + length caps)
 * - Simple per-process rate limiting to deter floods
 * - Forwards to Web3Forms when PUBLIC_CONTACT_FORM_KEY is configured
 */
const attempts = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || entry.reset < now) {
    attempts.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

export const POST: APIRoute = async ({ request }) => {
  const contentType = request.headers.get('content-type') ?? '';
  let payload: { name?: unknown; email?: unknown; subject?: unknown; message?: unknown; _honey?: unknown };

  try {
    if (contentType.includes('application/json')) {
      payload = await request.json();
    } else {
      const form = await request.formData();
      payload = Object.fromEntries(form.entries());
    }
  } catch {
    return json({ ok: false, error: 'Malformed request.' }, 400);
  }

  const ip = (request.headers.get('x-forwarded-for') ?? 'local').split(',')[0].trim();

  if (typeof payload._honey === 'string' && payload._honey.length > 0) {
    return json({ ok: true, message: 'Thanks!' });
  }
  if (rateLimited(ip)) {
    return json({ ok: false, error: 'Too many messages too fast — please wait a minute.' }, 429);
  }

  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  const subject = typeof payload.subject === 'string' ? payload.subject.trim().slice(0, 200) : '';
  const message = typeof payload.message === 'string' ? payload.message.trim() : '';

  if (!name || name.length > 120) return json({ ok: false, error: 'Please add your name.' }, 422);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return json({ ok: false, error: 'That email looks off — please check it.' }, 422);
  if (!message || message.length > 5000) return json({ ok: false, error: 'Please write a message (max 5000 chars).' }, 422);

  const apiKey = import.meta.env.PUBLIC_CONTACT_FORM_KEY as string | undefined;

  if (!apiKey) {
    // No key configured (local dev): accept and log so the demo works.
    console.log('[contact] (dev mode, no Web3Forms key set)', { name, email, subject, message: message.slice(0, 120) });
    return json({ ok: true, message: 'Message received (dev mode).' });
  }

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: apiKey,
        name,
        email,
        subject: subject || 'New message from chinesebabypredictor.com',
        message,
        from_name: 'chinesebabypredictor.com',
      }),
    });
    const data: { success?: boolean; message?: string } = await res.json().catch(() => ({}));
    if (!res.ok || !data.success) {
      return json({ ok: false, error: data.message || 'The form processor hiccuped — try again shortly.' }, 502);
    }
    return json({ ok: true, message: 'Message sent!' });
  } catch {
    return json({ ok: false, error: 'Network error reaching the form processor.' }, 502);
  }
};

function json(body: Record<string, string | boolean>, status: number) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
}
