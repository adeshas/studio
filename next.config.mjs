/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rmh.jsl.mybluehost.me',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;