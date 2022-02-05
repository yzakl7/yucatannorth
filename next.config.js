/** @type {import('next').NextConfig} */
module.exports = {
  distDir: '.next',
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
    formats: ['image/avif', 'image/webp'],
  },
}
