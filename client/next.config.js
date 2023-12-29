/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: "/api/v1/:path*",
                destination: "http://localhost:3001/api/v1/:path*"
            }
        ]
    },
    images: {
        remotePatterns: [
            {
                hostname: 'localhost',
                pathname: '/uploads/**',
            }
        ]
    },
}

module.exports = nextConfig;