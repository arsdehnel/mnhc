import { RequestInfo } from "rwsdk/worker";

import StandardLayout from '@/app/layouts/standard';

export default function Maps({ ctx }: RequestInfo) {
	return (
		<StandardLayout currentBasePage="maps">
			<h2 className="page-title">
				Maps
			</h2>
		</StandardLayout>
	);
}
