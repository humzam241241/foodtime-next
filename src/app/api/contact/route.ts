import { NextResponse } from 'next/server';
import { rateLimit, clientIp } from '@/lib/rateLimit';

export const runtime = 'nodejs';

const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_PHONE = 40;
const MAX_MESSAGE = 5000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, c => {
    switch (c) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      default:  return '&#39;';
    }
  });
}

function stripCrlf(s: string): string {
  return s.replace(/[\r\n]+/g, ' ');
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  const rl = rateLimit(`contact:${ip}`, 5, 10 * 60 * 1000); // 5 requests per 10 min
  if (!rl.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSec) } },
    );
  }

  let body: {
    name?: unknown;
    phone?: unknown;
    email?: unknown;
    message?: unknown;
    honeypot?: unknown;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // Honeypot: bots fill every field. Silently accept so they stop retrying.
  if (typeof body.honeypot === 'string' && body.honeypot.trim() !== '') {
    return NextResponse.json({ success: true });
  }

  const name = typeof body.name === 'string' ? body.name.trim().slice(0, MAX_NAME) : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim().slice(0, MAX_PHONE) : '';
  const email = typeof body.email === 'string' ? body.email.trim().slice(0, MAX_EMAIL) : '';
  const message = typeof body.message === 'string' ? body.message.trim().slice(0, MAX_MESSAGE) : '';

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  try {
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.RESEND_FROM || 'Food Time Website <onboarding@resend.dev>',
        to: process.env.CONTACT_EMAIL || 'info@foodtime.ca',
        subject: stripCrlf(`Contact form: ${name}`),
        html:
          '<h2>New Contact Form Submission</h2>' +
          `<p><strong>Name:</strong> ${escapeHtml(name)}</p>` +
          `<p><strong>Phone:</strong> ${phone ? escapeHtml(phone) : 'N/A'}</p>` +
          `<p><strong>Email:</strong> ${escapeHtml(email)}</p>` +
          `<p><strong>Message:</strong><br>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`,
      });
    } else {
      console.log('Contact form submission (no RESEND_API_KEY):', { name, phone, email, message });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
