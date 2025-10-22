import { properties } from './data';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const leaseLength = searchParams.get('leaseLength');
	const city = searchParams.get('city');
	const state = searchParams.get('state');
	const zip = searchParams.get('zip');
	const name = searchParams.get('name');
	const startingLeasePrice = searchParams.get('startingLeasePrice');
	const baseRent = searchParams.get('baseRent');

	if (searchParams.size === 0) {
		return NextResponse.json(properties);
	}

	const filteredProperties = properties.filter((property) => {
		// Only check conditions for parameters that are provided
		if (leaseLength && property.leaseLength !== parseInt(leaseLength)) {
			return false;
		}
		if (city && property.address.city.toLowerCase() !== city.toLowerCase()) {
			return false;
		}
		if (state && property.address.state.toLowerCase() !== state.toLowerCase()) {
			return false;
		}
		if (zip && property.address.zip !== zip) {
			return false;
		}
		if (name && !property.name.toLowerCase().includes(name.toLowerCase())) {
			return false;
		}
		if (
			startingLeasePrice &&
			property.startingLeasePrice !== parseInt(startingLeasePrice)
		) {
			return false;
		}
		if (baseRent && property.baseRent !== parseInt(baseRent)) {
			return false;
		}
		return true;
	});

	// console.log(filteredProperties);

	try {
		return NextResponse.json(filteredProperties);
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to fetch properties' },
			{ status: 500 }
		);
	}
}
