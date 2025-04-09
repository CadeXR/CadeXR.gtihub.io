/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Remove basePath since this is your main GitHub Pages site
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
