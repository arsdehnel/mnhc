import { Suspense } from "react";
import { RequestInfo } from "rwsdk/worker";
import { TrailView } from '../components/trail-view';
import { TrailsListing } from "../components/trails-listing";

import StandardLayout from '@/app/layouts/standard';

export default function Trails({ ctx }: RequestInfo) {
	return (
		<StandardLayout ctx={ctx}>
			<h2 className="page-title">
				Trails
			</h2>
			<div className="trails-viewer">
				<Suspense fallback={<div>Loading...</div>}>
					<TrailsListing />					
				</Suspense>
				<TrailView name="My trail" difficulty={ 3 } />
			</div>
		</StandardLayout>
	);
}
