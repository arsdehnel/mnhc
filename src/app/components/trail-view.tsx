import { kebabCase } from "change-case";
import { GoLinkExternal } from "react-icons/go";

import { db } from "@/db";

import { DifficultyRating } from "./difficulty-rating";
import { TrailVideo } from "./trail-video";
import { TrailMapBox } from "./trail-mapbox";

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
            <p>{ trail.address }</p>
            {
                trail.latitude &&
                trail.longitude &&
                <TrailMapBox latitude={ trail.latitude } longitude={ trail.longitude } />
            }
            <h4>Hiking Club Trail Description</h4>
            <p>{ trail.notes }</p>
            <DifficultyRating difficulty={ trail.difficulty } />
            <img src={ `/images/trails/${ kebabCase( trail.name.toLowerCase() ) }.jpg` } className="trail-thumbnail" />
            <h4>State Park Video</h4>
            <TrailVideo videoURL={ trail.videoURL } />
            <h4>Hike Length (miles):</h4>
            <p>{ trail.length }</p>
            <h4>Park Map</h4>
            <img src={ `/images/maps/${ kebabCase( trail.name.toLowerCase() ) }.jpg` } className="trail-map" />
            <h4>DNR Resources</h4>
            <p><a className="dnr-link" href={ trail.dnrURL }>State Park Website <GoLinkExternal /></a></p>
        </div>

	);

}