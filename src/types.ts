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
