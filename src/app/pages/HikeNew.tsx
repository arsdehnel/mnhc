import { Suspense } from "react";
import { RequestInfo } from "rwsdk/worker";
import StandardLayout from '@/app/layouts/standard';
import { TrailCode } from "../components/data-fetch/trail-code";

export default function HikeNew({ params }: RequestInfo) {
	return (
		<StandardLayout currentBasePage="hikes">
			<h2 className="page-title">
				Log Your Hike
			</h2>
			<Suspense fallback={<div>Loading Trail...</div>}>
				<TrailCode trailId={ params.trailId } />				
			</Suspense>
		</StandardLayout>
	);
}
