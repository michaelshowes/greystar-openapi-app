import { init } from '@paralleldrive/cuid2';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import React from 'react';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function cuid(length: number = 10) {
	const cuid = init({ length });

	return cuid();
}

export function formatPrice(price: number) {
	return price.toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0
	});
}

/**
 * Merges multiple refs into a single callback ref.
 * Useful when you need to pass multiple refs to a single element.
 *
 * @example
 * <AdvancedMarker ref={mergeRefs(markerRef, clusterRef)} />
 */
export function mergeRefs<T>(
	...refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T> {
	return (value) => {
		refs.forEach((ref) => {
			if (typeof ref === 'function') {
				ref(value);
			} else if (ref != null) {
				(ref as React.RefObject<T | null>).current = value;
			}
		});
	};
}
