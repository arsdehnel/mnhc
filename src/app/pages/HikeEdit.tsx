import { Suspense } from "react";
import { RequestInfo } from "rwsdk/worker";
import StandardLayout from '@/app/layouts/standard';
import { LogEntry } from "../components/log-entry";

export default function HikeEdit({ params }: RequestInfo) {
	return (
		<StandardLayout currentBasePage="hikes">
			<h2 className="page-title">
				Edit Hike
			</h2>
			<Suspense fallback={<div>Loading Hike...</div>}>
				<LogEntry id={ params.id } trailId={ params.trailId } />				
			</Suspense>
		</StandardLayout>
	);
}
