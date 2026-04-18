'use client';

import { useState, useEffect, type ReactNode, type CSSProperties } from 'react';

// Address is Apple-Maps-friendly for iOS/macOS visitors and falls back to
// Google Maps everywhere else. Detection runs once on mount; SSR always emits
// the Google Maps URL so the link is valid before hydration.
export default function MapLink({
  query,
  children,
  className,
  style,
  ariaLabel,
}: {
  query: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  ariaLabel?: string;
}) {
  const gmaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  const [href, setHref] = useState(gmaps);

  useEffect(() => {
    const ua = navigator.userAgent;
    const iPadOnMac = /Macintosh/.test(ua) && 'ontouchend' in document;
    const isApple = /iPad|iPhone|iPod/.test(ua) || iPadOnMac;
    if (isApple) setHref(`https://maps.apple.com/?q=${encodeURIComponent(query)}`);
  }, [query]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
