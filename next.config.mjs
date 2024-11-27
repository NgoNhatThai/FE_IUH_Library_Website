/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'api-staging.addy.vn',
      '192.168.100.14',
      'https://api.addy.vn',
      'api.addy.vn',
      'res.cloudinary.com',
      'example.com',
    ],
  },
  async rewrites() {
    return [
      {
        source: '/book/:slug',
        destination: '/book/:slug',
      },
      {
        source: '/chapter/:slug',
        destination: '/chapter/:slug',
      },
    ];
  },
};

export default nextConfig;
