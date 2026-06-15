import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_STREAM_SUBDOMAIN: process.env.CLOUDFLARE_STREAM_CUSTOMER_SUBDOMAIN ?? 'customer-evsgrse8zm7f6r0v',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'oyewoleadesina.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'rmh.jsl.mybluehost.me',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.oyewoleadesina.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pub-dff2dcf3e9c045f2bd47bede1998375e.r2.dev',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'customer-evsgrse8zm7f6r0v.cloudflarestream.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
