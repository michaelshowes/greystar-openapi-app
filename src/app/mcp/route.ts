import { baseURL } from '@/baseUrl';
import { getAppsSdkCompatibleHtml, widgetMeta } from '@/lib/utils';
import { ContentWidget } from '@/types';
import { createMcpHandler } from 'mcp-handler';
import { z } from 'zod';

/**
 * Creates the MCP (Model Context Protocol) handler for ChatGPT integration.
 * MCP is an open standard that connects AI models to external tools and data,
 * similar to how REST or GraphQL works for APIs, but designed for AI agents.
 */
const handler = createMcpHandler(async (server) => {
	// Fetch the HTML from your Next.js app's homepage
	const homepageHtml = await getAppsSdkCompatibleHtml(baseURL, '/');

	// Define the widget configuration
	const homepageWidget: ContentWidget = {
		id: 'show_content',
		title: 'Show Content',
		templateUri: 'ui://widget/content-template.html', // Unique URI for linking tools to resources
		invoking: 'Loading map...',
		invoked: 'Map loaded',
		html: homepageHtml,
		description: 'Displays the map',
		widgetDomain: 'https://nextjs.org/docs'
	};
	/**
	 * Register a Resource: Resources are HTML content that ChatGPT can display.
	 * When ChatGPT needs to show your app, it fetches HTML from your MCP server
	 * and renders it in an iframe.
	 *
	 * The mimeType "text/html+skybridge" tells ChatGPT to render this as an
	 * interactive widget instead of static content.
	 */
	server.registerResource(
		'content-widget', // Unique identifier for this resource
		homepageWidget.templateUri, // URI that tools can reference via openai/outputTemplate
		{
			title: homepageWidget.title,
			description: homepageWidget.description,
			mimeType: 'text/html+skybridge', // Signals ChatGPT to render as interactive widget
			_meta: {
				'openai/widgetDescription': homepageWidget.description,
				'openai/widgetPrefersBorder': true // Whether to show a border around the widget
			}
		},
		// Resource handler function that returns the actual HTML content
		async (uri) => ({
			contents: [
				{
					uri: uri.href,
					mimeType: 'text/html+skybridge',
					text: `<html>${homepageWidget.html}</html>`, // The Next.js HTML to render
					_meta: {
						'openai/widgetDescription': homepageWidget.description,
						'openai/widgetPrefersBorder': true,
						'openai/widgetDomain': homepageWidget.widgetDomain
					}
				}
			]
		})
	);

	/**
	 * Register a Tool: Tools are actions ChatGPT can invoke.
	 * By linking a tool to a resource via openai/outputTemplate, ChatGPT knows
	 * to render the widget after the tool is called.
	 *
	 * When a user's message triggers this tool, ChatGPT will:
	 * 1. Execute the tool function
	 * 2. Display the resource HTML in an iframe
	 * 3. Pass the structuredContent to your app via window.openai.toolOutput
	 */
	server.registerTool(
		homepageWidget.id, // Unique identifier for this tool
		{
			title: homepageWidget.title,
			description:
				'Fetch and display the homepage content with the name of the user',
			inputSchema: {
				// Define the inputs this tool accepts (validated with Zod)
				name: z
					.string()
					.describe('The name of the user to display on the homepage')
			},
			_meta: widgetMeta(homepageWidget) // OpenAI metadata that links this tool to the resource
		},
		// Tool handler function that executes when ChatGPT invokes this tool
		async ({ name }) => {
			return {
				// Content shown to the user in the chat
				content: [
					{
						type: 'text',
						text: name
					}
				],
				/**
				 * structuredContent is passed to your Next.js app via window.openai.toolOutput
				 * Your app can access this data using the useWidgetProps() hook to
				 * update the UI reactively based on the tool invocation
				 */
				structuredContent: {
					name: name,
					timestamp: new Date().toISOString()
				},
				_meta: widgetMeta(homepageWidget) // Include metadata in response
			};
		}
	);
});

/**
 * Export the handler for both GET and POST requests.
 * ChatGPT uses these endpoints to communicate with your MCP server.
 */
export const GET = handler;
export const POST = handler;
