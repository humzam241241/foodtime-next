import type { NextConfig } from "next";

// Baseline security response headers applied to every route.
//
// CSP is intentionally NOT set here: the site loads a third-party chat widget
// (chattybot-widget.vercel.app -> onrender.com) plus next/font Google Fonts,
// and a strict script-src would break them. Layer a CSP on once every external
// origin has been inventoried; in the meantime these headers are safe to ship
// without changing behaviour.
const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
