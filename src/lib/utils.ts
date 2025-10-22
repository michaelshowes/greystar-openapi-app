import { Widget } from '@/types';
import { init } from '@paralleldrive/cuid2';
import { clsx, type ClassValue } from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';

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

/**
 * Fetches the HTML content from your Next.js app that will be rendered inside ChatGPT.
 * This HTML includes all the patches needed to run Next.js in ChatGPT's triple-iframe architecture.
 */
export async function getAppsSdkCompatibleHtml(baseUrl: string, path: string) {
	const result = await fetch(`${baseUrl}${path}`);
	return await result.text();
}

/**
 * Helper function to generate OpenAI-specific metadata that configures how ChatGPT
 * interacts with your widget. This metadata:
 * - Links tools to resources via outputTemplate
 * - Defines loading states for better UX
 * - Signals that this tool can render a widget
 */
export function widgetMeta(widget: Widget) {
	return {
		'openai/outputTemplate': widget.templateUri,
		'openai/toolInvocation/invoking': widget.invoking,
		'openai/toolInvocation/invoked': widget.invoked,
		'openai/widgetAccessible': false,
		'openai/resultCanProduceWidget': true
	} as const;
}
