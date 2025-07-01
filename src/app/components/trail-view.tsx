import { kebabCase } from "change-case";
import { DifficultyRating } from "./difficulty-rating";
import { db } from "@/db";

export async function TrailView( { id }: { id: string } ) {

    const trail = await db.trail.findUnique({
        where: {
            id
        }
    })

    if( !trail ) {
        return <p>No trail found</p>
    }

	return (

		<div className="trail-view">
            <h3>{ trail.name }</h3>
            <DifficultyRating difficulty={ trail.difficulty } />
            <img src={ `/images/trails/${ kebabCase( trail.name.toLowerCase() ) }.jpg` } className="trail-thumbnail" />
            <img src={ `/images/maps/${ kebabCase( trail.name.toLowerCase() ) }.jpg` } className="trail-map" />
        </div>

	);

}