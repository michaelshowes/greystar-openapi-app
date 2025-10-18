'use client';

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
	const toolOutput = useWidgetProps<{
		name?: string;
		result?: { structuredContent?: { name?: string } };
	}>();
	const maxHeight = useMaxHeight() ?? undefined;
	const displayMode = useDisplayMode();
	const requestDisplayMode = useRequestDisplayMode();

	const name = toolOutput?.result?.structuredContent?.name || toolOutput?.name;

	return (
		<GoogleMap
			className={cn('w-screen h-screen', className)}
			defaultCenter={defaultCenter}
			defaultZoom={defaultZoom}
			gestureHandling={gestureHandling}
			disableDefaultUI={disableDefaultUI}
			mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID!}
			style={{
				maxHeight,
				height: displayMode === 'fullscreen' ? maxHeight : undefined
			}}
		>
			<PropertyMarkers properties={properties} />
		</GoogleMap>
	);
}
