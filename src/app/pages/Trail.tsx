import { Suspense } from "react";
import { RequestInfo } from "rwsdk/worker";
import { TrailView } from '../components/trail-view';

import StandardLayout from '@/app/layouts/standard';

export default function Trail({ params }: RequestInfo) {
	return (
		<StandardLayout currentBasePage="trails" >
			<Suspense fallback={<div>Loading Trail...</div>}>
				<TrailView id={ params.id } />
			</Suspense>
		</StandardLayout>
	);
}
