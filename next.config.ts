import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 's7d9.scene7.com'
			}
		]
	}
};

export default nextConfig;
