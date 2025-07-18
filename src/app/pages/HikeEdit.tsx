import { Suspense } from "react";
import { RequestInfo } from "rwsdk/worker";
import StandardLayout from '@/app/layouts/standard';
import { HikeForm } from "../components/data-fetch/hike-form";

export default function HikeEdit({ params }: RequestInfo) {
	return (
		<StandardLayout currentBasePage="hikes">
			<h2 className="page-title">
				Edit Hike
			</h2>
			<Suspense fallback={<div>Loading Hike...</div>}>
				<HikeForm id={ params.id } />
			</Suspense>
		</StandardLayout>
	);
}
