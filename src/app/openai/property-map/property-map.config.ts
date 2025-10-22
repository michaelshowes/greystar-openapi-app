import { baseURL } from '@/baseUrl';
import { getAppsSdkCompatibleHtml, widgetMeta } from '@/lib/utils';
import { Property, Widget } from '@/types';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { propertyMapInputSchema } from './inputSchema';

export default async (server: McpServer) => {
	const html = await getAppsSdkCompatibleHtml(baseURL, '/openai/property-map');

	const propertyMapWidget: Widget = {
		id: 'property_map',
		title: 'Property Map',
		templateUri: 'ui://widget/property-map-template.html',
		invoking: 'Loading map...',
		invoked: 'Map loaded',
		html: html,
		description: 'Displays the map with properties',
		widgetDomain: baseURL
	};

	server.registerResource(
		'property_map-widget',
		propertyMapWidget.templateUri,
		{
			title: propertyMapWidget.title,
			description: propertyMapWidget.description,
			mimeType: 'text/html+skybridge',
			_meta: {
				'openai/widgetDescription': propertyMapWidget.description,
				'openai/widgetPrefersBorder': true
			}
		},
		async (uri) => ({
			contents: [
				{
					uri: uri.href,
					mimeType: 'text/html+skybridge',
					text: `<html>${propertyMapWidget.html}</html>`,
					_meta: {
						'openai/widgetDescription': propertyMapWidget.description,
						'openai/widgetPrefersBorder': true,
						'openai/widgetDomain': propertyMapWidget.widgetDomain
					}
				}
			]
		})
	);

	server.registerTool(
		propertyMapWidget.id,
		{
			title: propertyMapWidget.title,
			description: 'Gets a list of properties based on the prompt',
			inputSchema: propertyMapInputSchema,
			_meta: widgetMeta(propertyMapWidget)
		},
		async (args) => {
			try {
				const params = new URLSearchParams();
				if (args.city !== undefined) params.append('city', args.city);
				if (args.state !== undefined) params.append('state', args.state);
				if (args.zip !== undefined) params.append('zip', args.zip);
				if (args.leaseLength !== undefined)
					params.append('leaseLength', args.leaseLength.toString());
				if (args.startingLeasePrice !== undefined)
					params.append(
						'startingLeasePrice',
						args.startingLeasePrice.toString()
					);
				if (args.baseRent !== undefined)
					params.append('baseRent', args.baseRent.toString());

				const url = `${baseURL}/api/properties?${params.toString()}`;
				const res = await fetch(url);
				const data = await res.json();
				const properties = data.map((property: Property) => ({
					id: property.id,
					name: property.name,
					leaseLength: property.leaseLength,
					startingLeasePrice: property.startingLeasePrice,
					baseRent: property.baseRent,
					image: property.image,
					address: property.address,
					coordinates: property.coordinates
				}));

				return {
					content: [
						{
							type: 'text',
							text: `Found ${data.length} properties in ${args.city}`
						}
					],
					structuredContent: {
						properties
					},
					_meta: widgetMeta(propertyMapWidget)
				};
			} catch (error) {
				return {
					content: [
						{
							type: 'text',
							text: 'Error fetching properties'
						}
					],
					structuredContent: {
						error: 'Error fetching properties'
					},
					_meta: widgetMeta(propertyMapWidget)
				};
			}
		}
	);
};
