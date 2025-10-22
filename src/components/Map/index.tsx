'use client';

// import { properties } from '@/app/api/properties/data';
import { cn } from '@/lib/utils';
import { Map as GoogleMap } from '@vis.gl/react-google-maps';
import PropertyMarkers from './PropertyMarkers';
import { Property } from '@/types';
import {
	useDisplayMode,
	useMaxHeight,
	useRequestDisplayMode,
	useWidgetProps
} from '@/hooks';

interface MapProps {
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
	className,
	defaultCenter = { lat: 38.899939, lng: -77.03585 },
	defaultZoom = 12,
	gestureHandling = 'greedy',
	disableDefaultUI = true
}: MapProps) {
	const toolOutput = useWidgetProps<{ properties: Property[] }>();
	const properties = toolOutput?.properties;

	// console.log(properties);

	return (
		<div className={'relative h-full'}>
			<div
				className={
					'absolute top-10 left-4 bg-white p-4 z-10 rounded-xl shadow-lg border border-gray-200'
				}
			>
				Property
			</div>
			<GoogleMap
				className={cn('w-screen h-screen', className)}
				defaultCenter={defaultCenter}
				defaultZoom={defaultZoom}
				gestureHandling={gestureHandling}
				disableDefaultUI={disableDefaultUI}
				mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID!}
			>
				{properties && <PropertyMarkers properties={properties} />}
			</GoogleMap>
		</div>
	);
}
