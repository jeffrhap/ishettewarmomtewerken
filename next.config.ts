import type { NextConfig } from "next";

// Defense-in-depth response headers applied to every route.
// Note: no Content-Security-Policy here — a strict CSP for Next needs per-request
// nonces (the framework and this app use inline styles), so it's intentionally
// left out rather than shipped in a broken/over-permissive form.
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
