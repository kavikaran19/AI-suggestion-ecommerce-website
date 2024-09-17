/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    middleware: true, // Ensure this is set to enable middleware
  },
    images: {
      
         domains: ['via.placeholder.com','localhost'],
      },
};

export default nextConfig;
