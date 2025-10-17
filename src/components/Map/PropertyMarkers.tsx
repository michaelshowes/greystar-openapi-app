'use client';

import { Property } from '@/types';
import { useMap } from '@vis.gl/react-google-maps';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import type { Marker } from '@googlemaps/markerclusterer';
import { useCallback, useEffect, useRef, useState } from 'react';
import PropertyMarker from './PropertyMarker';

export default function PropertyMarkers({
	properties
}: {
	properties: Property[];
}) {
	const map = useMap();
	const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
	const clusterer = useRef<MarkerClusterer | null>(null);

	useEffect(() => {
		if (!map) return;

		if (!clusterer.current) {
			clusterer.current = new MarkerClusterer({ map });
		}
	}, [map]);

	useEffect(() => {
		clusterer.current?.clearMarkers();
		clusterer.current?.addMarkers(Object.values(markers));
	}, [markers]);

	const setMarkerRef = useCallback((marker: Marker | null, key: string) => {
		setMarkers((prev) => {
			if (marker && prev[key]) return prev;
			if (!marker && !prev[key]) return prev;

			if (marker) {
				return { ...prev, [key]: marker };
			} else {
				const newMarkers = { ...prev };
				delete newMarkers[key];
				return newMarkers;
			}
		});
	}, []);

	return (
		<>
			{properties.map((property) => (
				<PropertyMarker
					key={property.id}
					property={property}
					onMarkerRef={setMarkerRef}
				/>
			))}
		</>
	);
}
