import { Suspense } from "react";
import { RequestInfo } from "rwsdk/worker";

import StandardLayout from '@/app/layouts/standard';
import { HikesListing } from "../components/data-fetch/hikes-listing";

export default function Hikes({ ctx }: RequestInfo) {
	return (
		<StandardLayout currentBasePage="hikes">
			<h2 className="page-title">
				Hiking Log
			</h2>
			<Suspense fallback={<div>Loading your hikes...</div>}>
				<HikesListing user={ ctx.user } />					
			</Suspense>
		</StandardLayout>
	);
}
