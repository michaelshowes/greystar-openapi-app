'use client';

import { formatPrice, mergeRefs } from '@/lib/utils';
import { Property } from '@/types';
import {
	AdvancedMarker,
	useAdvancedMarkerRef
} from '@vis.gl/react-google-maps';
import type { Marker } from '@googlemaps/markerclusterer';
import { useCallback, useEffect, useMemo, useState } from 'react';
import PropertyInfoWindow from './PropertyInfoWindow';

interface PropertyMarkerProps {
	property: Property;
	onMarkerRef: (marker: Marker | null, key: string) => void;
}

export default function PropertyMarker({
	property,
	onMarkerRef
}: PropertyMarkerProps) {
	const [markerRef, marker] = useAdvancedMarkerRef();
	const [open, setOpen] = useState(false);

	const handleMarkerRef = useCallback(
		(marker: Marker | null) => {
			onMarkerRef(marker, property.id);
		},
		[onMarkerRef, property.id]
	);

	const mergedRef = useMemo(
		() => mergeRefs(markerRef, handleMarkerRef),
		[markerRef, handleMarkerRef]
	);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			const markerElement = marker?.element;
			const isClickOnMarker = markerElement?.contains(target);
			const isClickOnInfoWindow = target.closest(
				'.gm-style-iw-c, .gm-style-iw-d, .gm-style-iw-tc'
			);

			if (!isClickOnMarker && !isClickOnInfoWindow && open) {
				setOpen(false);
			}
		};

		if (open) {
			setTimeout(() => {
				document.addEventListener('click', handleClickOutside);
			}, 0);
		}

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [open, marker]);

	return (
		<>
			<AdvancedMarker
				ref={mergedRef}
				position={property.coordinates}
				clickable
				onClick={() => setOpen(!open)}
				title={property.name}
			>
				<div
					className={
						'bg-[#0077d4] text-sm text-white border border-black rounded-xl p-2 hover:bg-[#0a2245] cursor-pointer transition-colors duration-200 shadow-lg'
					}
				>
					{formatPrice(property.startingLeasePrice)}
				</div>
			</AdvancedMarker>
			{open && (
				<PropertyInfoWindow
					property={property}
					marker={marker}
				/>
			)}
		</>
	);
}
