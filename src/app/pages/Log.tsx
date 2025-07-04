import { RequestInfo } from "rwsdk/worker";

import StandardLayout from '@/app/layouts/standard';

export default function Log({ ctx }: RequestInfo) {
	return (
		<StandardLayout currentBasePage="log">
			<p>
				Hiking Log
			</p>
		</StandardLayout>
	);
}
