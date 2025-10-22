import { createMcpHandler } from 'mcp-handler';
import propertyMapConfig from '../openai/property-map/property-map.config';

const handler = createMcpHandler(async (server) => {
	await propertyMapConfig(server);
});

export const GET = handler;
export const POST = handler;
