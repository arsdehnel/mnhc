import { Suspense } from "react";
import { RequestInfo } from "rwsdk/worker";
import { db } from "@/db";

import StandardLayout from '@/app/layouts/standard';

export async function TrailsListing() {

	const dbTrails = await db.trail.findMany();

	return (

		<>

			{dbTrails.map((trail) => (

				<div key={ trail.id }>{ trail.name }</div>

			))}

		</>

	);

}

export default function Trails({ ctx }: RequestInfo) {
	return (
		<StandardLayout ctx={ctx}>
			<h2 className="page-title">
				Trails
			</h2>
			<Suspense fallback={<div>Loading...</div>}>
				<TrailsListing />
			</Suspense>
		</StandardLayout>
	);
}
