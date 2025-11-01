/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  eslint: {
    // Игнорировать ESLint ошибки во время сборки
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Игнорировать TypeScript ошибки во время сборки  
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig