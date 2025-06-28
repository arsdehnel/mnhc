import { RequestInfo } from "rwsdk/worker";

import StandardLayout from '@/app/layouts/standard';

export default function Maps({ ctx }: RequestInfo) {
	return (
		<StandardLayout ctx={ ctx }>
			<p>
				Maps
			</p>
		</StandardLayout>
	);
}
