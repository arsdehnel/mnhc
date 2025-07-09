import { Suspense } from "react";
import { RequestInfo } from "rwsdk/worker";
import { TrailsListing } from "../components/data-fetch/trails-listing";

import StandardLayout from '@/app/layouts/standard';

export default function Trails({ ctx }: RequestInfo) {
	return (
		<StandardLayout currentBasePage="trails">
			<h2 className="page-title">
				Trails
			</h2>
			<Suspense fallback={<div>Loading...</div>}>
				<TrailsListing />					
			</Suspense>
		</StandardLayout>
	);
}
