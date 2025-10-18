import { baseURL } from '@/baseUrl';
import Map from '@/components/Map';

export const dynamic = 'force-dynamic';

export default async function MapPage() {
	const res = await fetch(`${baseURL}/api/properties`);
	const properties = await res.json();

	return (
		<div>
			<Map properties={properties} />
		</div>
	);
}
