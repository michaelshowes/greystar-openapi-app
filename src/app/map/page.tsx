import Map from '@/components/Map';

export const dynamic = 'force-dynamic';

export default async function MapPage() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/properties`);
	const properties = await res.json();

	return (
		<div>
			<Map properties={properties} />
		</div>
	);
}
