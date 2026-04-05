'use client';

import { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { HeroSlide } from '@/data/defaultHeroImages';
import type { AvailableImage } from '@/lib/imageLibrary';

type Props = {
  initialSlides: HeroSlide[];
  initialImages: AvailableImage[];
  source: 'blob' | 'default';
  blobConfigured: boolean;
};

export default function AdminDashboard({ initialSlides, initialImages, source, blobConfigured }: Props) {
  const router = useRouter();
  const [slides, setSlides] = useState<HeroSlide[]>(initialSlides);
  const [images, setImages] = useState<AvailableImage[]>(initialImages);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeSrcs = useMemo(() => new Set(slides.map(s => s.src)), [slides]);

  function flash(type: 'ok' | 'err', text: string) {
    setMessage({ type, text });
    window.setTimeout(() => setMessage(null), 4000);
  }

  function addSlide(img: AvailableImage) {
    if (activeSrcs.has(img.src)) return;
    setSlides(prev => [
      ...prev,
      {
        src: img.src,
        title: 'New Slide Title',
        subtitle: 'Describe this slide',
        cta: { label: 'View Menu', href: '/menu/dine-in' },
      },
    ]);
  }

  function removeSlide(i: number) {
    setSlides(prev => prev.filter((_, idx) => idx !== i));
  }

  function move(i: number, dir: -1 | 1) {
    setSlides(prev => {
      const next = [...prev];
      const j = i + dir;
      if (j < 0 || j >= next.length) return prev;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }

  function updateSlide(i: number, patch: Partial<HeroSlide>) {
    setSlides(prev => prev.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  }

  function updateCta(i: number, patch: Partial<NonNullable<HeroSlide['cta']>>) {
    setSlides(prev =>
      prev.map((s, idx) =>
        idx === i
          ? { ...s, cta: { label: '', href: '', ...(s.cta ?? {}), ...patch } }
          : s,
      ),
    );
  }

  function removeCta(i: number) {
    setSlides(prev => prev.map((s, idx) => (idx === i ? { ...s, cta: undefined } : s)));
  }

  async function save() {
    if (slides.length === 0) {
      flash('err', 'Add at least one slide before saving.');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/admin/hero-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slides }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        flash('err', data.error ?? 'Save failed');
      } else {
        flash('ok', 'Hero images saved. Refresh the homepage to see changes.');
        router.refresh();
      }
    } catch {
      flash('err', 'Network error');
    } finally {
      setSaving(false);
    }
  }

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!blobConfigured) {
      flash('err', 'Vercel Blob is not configured — uploads disabled.');
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const data = (await res.json()) as {
        ok: boolean;
        error?: string;
        image?: AvailableImage;
      };
      if (!res.ok || !data.ok || !data.image) {
        flash('err', data.error ?? 'Upload failed');
        return;
      }
      setImages(prev => [...prev, data.image!]);
      flash('ok', `Uploaded ${data.image.name}`);
    } catch {
      flash('err', 'Upload network error');
    } finally {
      setUploading(false);
    }
  }

  async function deleteImage(img: AvailableImage) {
    if (img.source !== 'blob' || !img.pathname) {
      flash('err', 'Built-in images cannot be deleted from here (edit the repo).');
      return;
    }
    if (!window.confirm(`Delete ${img.name}? Slides using it will keep their URL (broken).`)) return;
    try {
      const res = await fetch('/api/admin/delete-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pathname: img.pathname }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        flash('err', data.error ?? 'Delete failed');
        return;
      }
      setImages(prev => prev.filter(x => x.pathname !== img.pathname));
      flash('ok', 'Image deleted');
    } catch {
      flash('err', 'Network error');
    }
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div>
          <h1>Hero Carousel Manager</h1>
          <p className="muted">
            Source: <strong>{source === 'blob' ? 'Vercel Blob (live)' : 'Default fallback'}</strong>
            {!blobConfigured && (
              <> · <span className="warn">Blob not configured — saves will fail</span></>
            )}
          </p>
        </div>
        <button type="button" className="btn btn-secondary" onClick={logout}>Log out</button>
      </header>

      {message && <div className={`admin-msg ${message.type}`}>{message.text}</div>}

      {/* ── Current slides ── */}
      <section className="admin-section">
        <div className="admin-section-head">
          <h2>Active Hero Slides ({slides.length})</h2>
          <button type="button" className="btn" onClick={save} disabled={saving}>
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>

        {slides.length === 0 && (
          <p className="muted">No slides yet — pick from the library below.</p>
        )}

        <div className="slide-list">
          {slides.map((s, i) => (
            <div key={i} className="slide-row">
              <div className="slide-thumb">
                <Image src={s.src} alt={s.title} fill sizes="160px" style={{ objectFit: 'cover' }} />
              </div>
              <div className="slide-fields">
                <label>
                  <span>Title</span>
                  <input
                    type="text"
                    value={s.title}
                    onChange={e => updateSlide(i, { title: e.target.value })}
                  />
                </label>
                <label>
                  <span>Subtitle</span>
                  <input
                    type="text"
                    value={s.subtitle}
                    onChange={e => updateSlide(i, { subtitle: e.target.value })}
                  />
                </label>

                {s.cta ? (
                  <div className="cta-row">
                    <label>
                      <span>Button label</span>
                      <input
                        type="text"
                        value={s.cta.label}
                        onChange={e => updateCta(i, { label: e.target.value })}
                      />
                    </label>
                    <label>
                      <span>Button link</span>
                      <input
                        type="text"
                        value={s.cta.href}
                        onChange={e => updateCta(i, { href: e.target.value })}
                      />
                    </label>
                    <button type="button" className="link-btn" onClick={() => removeCta(i)}>Remove button</button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="link-btn"
                    onClick={() => updateCta(i, { label: 'View Menu', href: '/menu/dine-in' })}
                  >
                    + Add button
                  </button>
                )}
              </div>
              <div className="slide-actions">
                <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up">↑</button>
                <button type="button" onClick={() => move(i, 1)} disabled={i === slides.length - 1} aria-label="Move down">↓</button>
                <button type="button" className="danger" onClick={() => removeSlide(i)} aria-label="Remove">✕</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Image library ── */}
      <section className="admin-section">
        <div className="admin-section-head">
          <h2>Image Library ({images.length})</h2>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
              onChange={onFile}
              style={{ display: 'none' }}
            />
            <button
              type="button"
              className="btn"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading || !blobConfigured}
              title={!blobConfigured ? 'Connect Vercel Blob to enable uploads' : ''}
            >
              {uploading ? 'Uploading…' : '+ Upload Image'}
            </button>
          </div>
        </div>

        <div className="image-grid">
          {images.map(img => {
            const inUse = activeSrcs.has(img.src);
            return (
              <div key={img.src} className={`image-tile${inUse ? ' in-use' : ''}`}>
                <div className="image-tile-img">
                  <Image src={img.src} alt={img.name} fill sizes="200px" style={{ objectFit: 'cover' }} />
                  {inUse && <span className="badge">In use</span>}
                  <span className={`badge source ${img.source}`}>{img.source === 'blob' ? 'uploaded' : 'built-in'}</span>
                </div>
                <div className="image-tile-name" title={img.name}>{img.name}</div>
                <div className="image-tile-actions">
                  <button type="button" className="btn btn-sm" disabled={inUse} onClick={() => addSlide(img)}>
                    {inUse ? 'Added' : 'Add to Hero'}
                  </button>
                  {img.source === 'blob' && (
                    <button type="button" className="link-btn danger" onClick={() => deleteImage(img)}>Delete</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
