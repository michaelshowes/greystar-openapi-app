import { properties } from './data';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
	try {
		return NextResponse.json(properties);
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to fetch properties' },
			{ status: 500 }
		);
	}
}
