'use client';

import GoogleMapsProvider from './GoogleMapsProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
	return <GoogleMapsProvider>{children}</GoogleMapsProvider>;
}
