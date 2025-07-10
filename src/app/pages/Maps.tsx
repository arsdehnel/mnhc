import { RequestInfo } from "rwsdk/worker";

import StandardLayout from '@/app/layouts/standard';
import { Suspense } from "react";
import { MapsListing } from "../components/data-fetch/maps-listing";

export default function Maps({ ctx }: RequestInfo) {
	return (
		<StandardLayout currentBasePage="maps">
			<h2 className="page-title">
				Maps
			</h2>
			<Suspense fallback={<div>Loading...</div>}>
				<MapsListing />
			</Suspense>
		</StandardLayout>
	);
}
