/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/entrar',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        hostname: 'images.clerk.dev',
      },
      {
        hostname: 'img.clerk.com',
      },
      {
        hostname: 'dev-beta.quizur.com',
      },
      {
        hostname: 'quiz-master-app.s3.amazonaws.com',
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
