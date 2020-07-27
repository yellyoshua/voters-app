const withPWA = require('next-pwa');

console.log({ENV: process.env.NODE_ENV});

module.exports = withPWA({
  exportPathMap: async function (defaultPathMap, {dev, dir, outDir, distDir, buildId}) {
    return {
      '/': {page: '/'},
      '/dashboard': {page: '/dashboard'}
    };
  },
  exportTrailingSlash: true,
  poweredByHeader: false,
  // other next config
  disable: process.env.NODE_ENV === 'development',
  register: process.env.NODE_ENV === 'production',
  pwa: {
    dest: 'public'
  }
});
