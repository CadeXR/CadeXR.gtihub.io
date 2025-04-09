/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/CadeXR.github.io',
  assetPrefix: '/CadeXR.github.io/',
  images: {
    unoptimized: true,
  },
  // Ensure trailing slashes are handled correctly
  trailingSlash: true,
}

module.exports = nextConfig





