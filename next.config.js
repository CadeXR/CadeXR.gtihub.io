/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS || false
const isProduction = process.env.NODE_ENV === 'production'

let assetPrefix = ''
let basePath = ''

// Only use custom domain settings in production, not GitHub Actions
if (isProduction && !isGithubActions) {
  assetPrefix = ''  // Empty for custom domain
  basePath = ''     // Empty for custom domain
} else if (isGithubActions) {
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '')
  assetPrefix = `/${repo}`
  basePath = `/${repo}`
}

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

// Log the configuration for debugging
console.log('Next.js config:', {
  basePath,
  assetPrefix,
  env: nextConfig.env,
  isProduction,
  isGithubActions
})

module.exports = nextConfig

