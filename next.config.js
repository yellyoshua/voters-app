const withPWA = require('next-pwa');

console.log({ ENV: process.env.NODE_ENV });

const productionConfs = withPWA({
  poweredByHeader: false,
  // other next config
  disable: process.env.NODE_ENV === 'development',
  register: process.env.NODE_ENV === 'production',
  pwa: {
    dest: 'public'
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true
  }
});
const developmentConfs = {};

module.exports = process.env.NODE_ENV === 'production' ? productionConfs : developmentConfs;
