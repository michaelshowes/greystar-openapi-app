'use client';

import { cn } from '@/lib/utils';
import { Map as GoogleMap } from '@vis.gl/react-google-maps';
import PropertyMarkers from './PropertyMarkers';
import { Property } from '@/types';

interface MapProps {
	properties: Property[];
	className?: string;
	defaultCenter?: {
		lat: number;
		lng: number;
	};
	defaultZoom?: number;
	gestureHandling?: 'greedy' | 'none' | 'auto';
	disableDefaultUI?: boolean;
}

export default function Map({
	properties,
	className,
	defaultCenter = { lat: 38.899939, lng: -77.03585 },
	defaultZoom = 12,
	gestureHandling = 'greedy',
	disableDefaultUI = true
}: MapProps) {
	return (
		<GoogleMap
			className={cn('w-screen h-screen', className)}
			defaultCenter={defaultCenter}
			defaultZoom={defaultZoom}
			gestureHandling={gestureHandling}
			disableDefaultUI={disableDefaultUI}
			mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID!}
		>
			<PropertyMarkers properties={properties} />
		</GoogleMap>
	);
}
