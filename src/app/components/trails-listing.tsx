import { kebabCase } from "change-case";

import { DifficultyRating } from "./difficulty-rating";
import { db } from "@/db";

export async function TrailsListing() {

	const dbTrails = await db.trail.findMany();

	return (

		<div className="trails-listing">

			{ 
                dbTrails.map( trail => {
                    return (
                        <div key={ trail.id } className="trail-box">
                            <div className="trail-info">
                                <div className="trail-name"><a href={ `/trails/${ trail.id }/` }>{ trail.name }</a></div>
                                <DifficultyRating difficulty={ trail.difficulty } />
                            </div>
                            <img src={ `/images/trails/${ kebabCase( trail.name.toLowerCase() ) }.jpg` } className="trail-thumbnail" />
                        </div>    
                    )
                } )
            }

        </div>

	);

}