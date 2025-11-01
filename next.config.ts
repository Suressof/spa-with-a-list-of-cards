/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // ← ключевая строка
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: '/spa-with-a-list-of-cards', // важно для GitHub Pages
  assetPrefix: '/spa-with-a-list-of-cards/',
};

module.exports = nextConfig;