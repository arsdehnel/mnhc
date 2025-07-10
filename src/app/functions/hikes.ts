"use server";
import { requestInfo } from "rwsdk/worker";
import { db, Hike } from "@/db";

export async function saveHike(hike: Partial<Hike>) {

	const { ctx } = requestInfo;

	if( hike.id ) {
		const updatedHike = await db.hike.update({
			where: {
				id: hike.id
			},
			data: {
				...hike
			}
		})

		if (!updatedHike) {
			return {
				error: `Trail not updated`
			}
		}

		return {
			hike: updatedHike
		}
	}

	const insertedHike = await db.hike.create( {
		data: {
			...hike,
			userId: ctx.user.id
		}
	})

	if (!insertedHike) {
		return {
			error: `Trail not inserted`
		}
	}

	return {
		hike: insertedHike
	}

}