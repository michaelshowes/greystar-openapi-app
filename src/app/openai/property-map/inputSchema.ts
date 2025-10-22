import { z } from 'zod';

export const propertyMapInputSchema = {
	city: z.string().describe('The city to search for properties').optional(),
	state: z.string().describe('The state to search for properties').optional(),
	zip: z.string().describe('The zip code to search for properties').optional(),
	leaseLength: z
		.number()
		.describe('The lease length to search for properties')
		.optional(),
	startingLeasePrice: z
		.number()
		.describe('The starting lease price to search for properties')
		.optional(),
	baseRent: z
		.number()
		.describe('The base rent to search for properties')
		.optional()
};
