import { formatPrice } from '@/lib/utils';
import { AdvancedMarkerProps, Property } from '@/types';
import { InfoWindow } from '@vis.gl/react-google-maps';
import Image from 'next/image';

interface PropertyInfoWindowProps {
	property: Property;
	marker: AdvancedMarkerProps;
}

export default function PropertyInfoWindow({
	property,
	marker
}: PropertyInfoWindowProps) {
	return (
		<InfoWindow
			anchor={marker}
			headerDisabled
			shouldFocus
		>
			<div>
				<div className={'w-full relative h-30'}>
					<Image
						src={property.image}
						alt={property.name}
						fill
					/>
				</div>
				<div className={'p-4'}>
					<h3 className={'text-xl font-bold'}>{property.name}</h3>
					<p className={'text-sm font-medium'}>
						{property.leaseLength} month lease from{' '}
						<span className={'font-semibold text-lg'}>
							{formatPrice(property.startingLeasePrice)}
						</span>
					</p>
					<p>Base rent from {formatPrice(property.baseRent)}</p>
				</div>
			</div>
		</InfoWindow>
	);
}
