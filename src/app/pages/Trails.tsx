import { Suspense } from "react";
import { RequestInfo } from "rwsdk/worker";

import StandardLayout from '@/app/layouts/standard';

export async function TrailsListing() {

	// const todos = await db.todo.findMany({ where: { userId: ctx.user.id } });

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
