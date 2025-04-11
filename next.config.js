/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS || false
const isProduction = process.env.NODE_ENV === 'production'

// For custom domain, we don't need basePath or assetPrefix
// But we'll keep the configuration structure for maintainability
let assetPrefix = ''
let basePath = ''

const nextConfig = {
  output: 'export',
  basePath: basePath,
  assetPrefix: assetPrefix,
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './image-loader.js'
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath
  },
  trailingSlash: true,
}

// Keep logging for debugging purposes
console.log('Next.js config:', {
  basePath,
  assetPrefix,
  env: nextConfig.env,
  isProduction,
  isGithubActions
})

module.exports = nextConfig



