import type { NextConfig } from 'next';
import { baseURL } from './src/baseUrl';

const nextConfig: NextConfig = {
	assetPrefix: baseURL,
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
