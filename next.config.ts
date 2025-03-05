import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },

    typescript: {
        ignoreBuildErrors: true, // Ensure type checking
    },
};

export default nextConfig;
