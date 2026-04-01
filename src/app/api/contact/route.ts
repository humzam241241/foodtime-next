import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, phone, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    // If Resend is configured, send email
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.RESEND_FROM || 'Food Time Website <onboarding@resend.dev>',
        to: process.env.CONTACT_EMAIL || 'info@foodtime.ca',
        subject: 'Contact form: ' + name,
        html: '<h2>New Contact Form Submission</h2>' +
          '<p><strong>Name:</strong> ' + name + '</p>' +
          '<p><strong>Phone:</strong> ' + (phone || 'N/A') + '</p>' +
          '<p><strong>Email:</strong> ' + email + '</p>' +
          '<p><strong>Message:</strong> ' + message + '</p>',
      });
    } else {
      // Log to console if Resend not configured (dev mode)
      console.log('Contact form submission (no RESEND_API_KEY):', { name, phone, email, message });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
