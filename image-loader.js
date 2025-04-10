export default function customImageLoader({ src }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  return `${basePath}${src}`
}