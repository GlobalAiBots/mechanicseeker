import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Redirect duplicate-topic blog slugs to existing canonical posts.
      { source: "/blog/how-to-find-honest-mechanic", destination: "/blog/how-to-find-trustworthy-mechanic", permanent: true },
      { source: "/blog/timing-belt-replacement-cost", destination: "/blog/how-much-does-a-timing-belt-cost", permanent: true },
      { source: "/blog/pre-purchase-inspection-checklist", destination: "/blog/used-car-inspection", permanent: true },
    ];
  },
};

export default nextConfig;
