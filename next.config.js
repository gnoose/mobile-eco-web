/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    api: 'http://localhost:3005/api/v0',
  },
}

module.exports = nextConfig
