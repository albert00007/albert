"use strict";

// next.config.js
var nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  output: "standalone"
};
module.exports = nextConfig;
