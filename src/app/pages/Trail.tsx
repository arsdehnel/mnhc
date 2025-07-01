import { Suspense } from "react";
import { RequestInfo } from "rwsdk/worker";
import { TrailView } from '../components/trail-view';

import StandardLayout from '@/app/layouts/standard';

export default function Trail({ ctx, params }: RequestInfo) {
	return (
		<StandardLayout ctx={ctx}>
			<h2 className="page-title">
				Trail: { params.id }
			</h2>
			<div className="trails-viewer">
				<Suspense fallback={<div>Loading...</div>}>
					<TrailView id={ params.id } />
				</Suspense>
			</div>
		</StandardLayout>
	);
}
