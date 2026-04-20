'use client';
import { useState, FormEvent } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle');
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '', honeypot: '' });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', phone: '', email: '', message: '', honeypot: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {status === 'success' && <div className="form-success">Thank you! We will get back to you soon.</div>}
      {status === 'error' && <div className="form-error">Something went wrong. Please try again or call us directly.</div>}
      <div className="form-group">
        <label>Name</label>
        <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
      </div>
      <div className="form-group">
        <label>Email Address</label>
        <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
      </div>
      <div className="form-group">
        <label>Message</label>
        <textarea required value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
      </div>
      {/* Honeypot: hidden from humans, filled by naive spam bots. Server silently discards any submission where this is non-empty. */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
        <label>
          Do not fill this field
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.honeypot}
            onChange={e => setForm({...form, honeypot: e.target.value})}
          />
        </label>
      </div>
      <button type="submit" className="btn" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Submit'}
      </button>
    </form>
  );
}
