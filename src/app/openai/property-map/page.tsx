'use client';

import Map from '@/components/Map';
import { useMaxHeight, useRequestDisplayMode } from '@/hooks';
import { useDisplayMode } from '@/hooks/use-display-mode';
import { cn } from '@/lib/utils';

export default function PropertyMapPage() {
	const maxHeight = useMaxHeight() ?? undefined;
	const displayMode = useDisplayMode();
	const requestDisplayMode = useRequestDisplayMode();

	console.log(displayMode);

	return (
		<div
			className={cn('h-[400px] sm:h-[500px]', {
				'max-h-[unset]': displayMode === 'fullscreen'
			})}
			// style={{
			// 	maxHeight,
			// 	height: displayMode === 'fullscreen' ? maxHeight : 500
			// }}
		>
			{displayMode !== 'fullscreen' && (
				<button
					aria-label='Enter fullscreen'
					className='fixed top-4 right-4 z-50 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-lg ring-1 ring-slate-900/10 dark:ring-white/10 p-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer'
					onClick={() => requestDisplayMode('fullscreen')}
				>
					<svg
						className='w-5 h-5'
						fill='none'
						stroke='currentColor'
						strokeWidth={1.5}
						viewBox='0 0 24 24'
						aria-hidden='true'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15'
						/>
					</svg>
				</button>
			)}
			<Map />
		</div>
	);
}
