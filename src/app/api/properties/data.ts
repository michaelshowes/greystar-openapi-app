import { cuid } from '@/lib/utils';
import { Property } from '@/types';

export const properties: Property[] = [
	{
		id: cuid(),
		name: 'Sonnet Apartments',
		leaseLength: 13,
		startingLeasePrice: 2267,
		baseRent: 2246,
		image:
			'https://s7d9.scene7.com/is/image/greystarprod/15401REC1?fmt=avif&wid=1200&qlt=80&fit=constrain',
		address: {
			street: '1441 U Street',
			city: 'Washington',
			state: 'DC',
			zip: '20006'
		},
		coordinates: {
			lat: 38.91732831894802,
			lng: -77.03356208465723
		}
	},
	{
		id: cuid(),
		name: 'Verde Pointe',
		leaseLength: 12,
		startingLeasePrice: 2386,
		baseRent: 2370,
		image:
			'https://s7d9.scene7.com/is/image/greystarprod/20373BDG1?fmt=avif&wid=1200&qlt=80&fit=constrain',
		address: {
			street: '1947 N Uhle Street',
			city: 'Arlington',
			state: 'VA',
			zip: '22201'
		},
		coordinates: {
			lat: 38.89721389955969,
			lng: -77.08535861534276
		}
	},
	{
		id: cuid(),
		name: 'Potomac Towers',
		leaseLength: 15,
		startingLeasePrice: 1906,
		baseRent: 1885,
		image:
			'https://s7d9.scene7.com/is/image/greystarprod/17584PL3?fmt=avif&wid=1200&qlt=80&fit=constrain',
		address: {
			street: '2001 N Adams Street',
			city: 'Arlington',
			state: 'VA',
			zip: '22201'
		},
		coordinates: {
			lat: 38.89762524869955,
			lng: -77.08822855767139
		}
	},
	{
		id: cuid(),
		name: 'The Wendy',
		leaseLength: 12,
		startingLeasePrice: 2691,
		baseRent: 2595,
		image:
			'https://s7d9.scene7.com/is/image/greystarprod/21811RND1?fmt=avif&wid=1200&qlt=80&fit=constrain',
		address: {
			street: '2025 Clarendon Blvd',
			city: 'Arlington',
			state: 'VA',
			zip: '22201'
		},
		coordinates: {
			lat: 38.89180147836183,
			lng: -77.08341225031154
		}
	},
	{
		id: cuid(),
		name: 'Brookland Press',
		leaseLength: 13,
		startingLeasePrice: 1990,
		baseRent: 1969,
		image:
			'https://s7d9.scene7.com/is/image/greystarprod/19754BDG1?fmt=avif&wid=1200&qlt=80&fit=constrain',
		address: {
			street: '805-806 Channing Place NE',
			city: 'Washington',
			state: 'DC',
			zip: '20018'
		},
		coordinates: {
			lat: 38.923461000776506,
			lng: -76.99432129999998
		}
	},
	{
		id: cuid(),
		name: 'Jasper Columbia Pike',
		leaseLength: 12,
		startingLeasePrice: 2125,
		baseRent: 2049,
		image:
			'https://s7d9.scene7.com/is/image/greystarprod/20701CLB7?fmt=avif&wid=1200&qlt=80&fit=constrain',
		address: {
			street: '1028 S Walter Reed Drive',
			city: 'Arlington',
			state: 'VA',
			zip: '22204'
		},
		coordinates: {
			lat: 38.86198959375178,
			lng: -77.08711910548442
		}
	},
	{
		id: cuid(),
		name: 'Willow & Maple',
		leaseLength: 12,
		startingLeasePrice: 1261,
		baseRent: 1240,
		image:
			'https://s7d9.scene7.com/is/image/greystarprod/19756BDG1?fmt=avif&wid=1200&qlt=80&fit=constrain',
		address: {
			street: '6918 Willow Street, N.W.',
			city: 'Washington',
			state: 'DC',
			zip: '20012'
		},
		coordinates: {
			lat: 38.97390317333891,
			lng: -77.01478108650706
		}
	},
	{
		id: cuid(),
		name: 'Sophia Bethesda',
		leaseLength: 12,
		startingLeasePrice: 2496,
		baseRent: 2490,
		image:
			'https://s7d9.scene7.com/is/image/greystarprod/21480RND6?fmt=avif&wid=1200&qlt=80&fit=constrain',
		address: {
			street: '4924 St. Elmo Ave',
			city: 'Bethesda',
			state: 'MD',
			zip: '20814'
		},
		coordinates: {
			lat: 38.98826321038982,
			lng: -77.09785354232861
		}
	}
];
