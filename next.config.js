/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/ownprofilesite',
  assetPrefix: '/ownprofilesite',
  trailingSlash: true,
}

module.exports = nextConfig

