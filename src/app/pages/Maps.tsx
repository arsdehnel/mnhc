import { RequestInfo } from "rwsdk/worker";

import StandardLayout from '@/app/layouts/standard';

export default function Maps({ ctx }: RequestInfo) {
	return (
		<StandardLayout currentBasePage="maps">
			<p>
				Maps
			</p>
		</StandardLayout>
	);
}
