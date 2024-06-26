/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'images.clerk.dev',
      },
      {
        hostname: 'img.clerk.com',
      },
      {
        hostname: 'quiz-expert.s3.amazonaws.com',
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    config.optimization.minimize = true;

    return config;
  },
};

export default nextConfig;
