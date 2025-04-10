/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS || false

let assetPrefix = ''
let basePath = ''

if (isGithubActions) {
  // Get the full repository name from GitHub Actions environment
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '')
  
  // Log the repository name for debugging during build
  console.log('Repository name:', repo)
  
  // Set the asset prefix and base path to include the repository name
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
    // Make sure the base path is available to the client
    NEXT_PUBLIC_BASE_PATH: basePath
  },
  trailingSlash: true,
}

// Log the configuration for debugging
console.log('Next.js config:', {
  basePath,
  assetPrefix,
  env: nextConfig.env
})

module.exports = nextConfig




