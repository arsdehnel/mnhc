import { Suspense } from "react";
import { RequestInfo } from "rwsdk/worker";
import StandardLayout from '@/app/layouts/standard';
import { TrailPassword } from "../components/data-fetch/trail-password";

export default function LogNew({ params }: RequestInfo) {
	return (
		<StandardLayout currentBasePage="profile">
			<h2 className="page-title">
				Log Your Hike
			</h2>
			<Suspense fallback={<div>Loading Trail...</div>}>
				<TrailPassword trailId={ params.trailId } />				
			</Suspense>
		</StandardLayout>
	);
}
