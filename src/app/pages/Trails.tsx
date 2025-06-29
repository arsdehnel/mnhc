import { Suspense } from "react";
import { RequestInfo } from "rwsdk/worker";
import { db } from "@/db";

import StandardLayout from '@/app/layouts/standard';

export async function TrailsListing() {

	const dbTrails = await db.trail.findMany();

	const trails = [
		{
			id: 1,
			name: "foo trail"
		}
	]
  
	return (
  
	  <ol>
  
		{trails.map((trail) => (
  
		  <li key={trail.id}>{trail.name}</li>
  
		))}

		<li>{ JSON.stringify( dbTrails ) }</li>

		<li>{ JSON.stringify( dbTrails.length ) }</li>
  
	  </ol>
  
	);
  
  }

export default function Trails({ ctx }: RequestInfo) {
	return (
		<StandardLayout ctx={ ctx }>
			<p>
				Trails
			</p>
			<Suspense fallback={<div>Loading...</div>}>
				<TrailsListing />
			</Suspense>
		</StandardLayout>
	);
}
