export interface Property {
	id: string;
	name: string;
	leaseLength: number;
	startingLeasePrice: number;
	baseRent: number;
	image: string;
	address: {
		street: string;
		city: string;
		state: string;
		zip: string;
	};
	coordinates: {
		lat: number;
		lng: number;
	};
}

export type Point = google.maps.LatLngLiteral & {
	key: string;
};

export type AdvancedMarkerProps =
	google.maps.marker.AdvancedMarkerElement | null;

export type ContentWidget = {
	id: string;
	title: string;
	templateUri: string; // URI that links tools to resources via openai/outputTemplate
	invoking: string; // Text shown while the tool is executing
	invoked: string; // Text shown after completion
	html: string; // The actual HTML content to render
	description: string; // Description of what the widget displays
	widgetDomain: string; // Domain context for the widget
};
