import { kebabCase } from "change-case";
import { GoLinkExternal } from "react-icons/go";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaDiamond } from "react-icons/fa6";

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
            <h2>{ trail.name }</h2>
            <p>{ trail.address }</p>
            <img src={ `/images/trails/${ kebabCase( trail.name.toLowerCase() ) }.jpg` } className="trail-image" />
            
            <ul className="trail-badges">
                <li className="trail-badge trail-badge-mileage">
                    <span className="trail-badge-prefix">Hiking Club Trail Mileage</span>
                    <span className="trail-badge-content">{ trail.length }</span>
                    <span className="trail-badge-suffix">Miles</span>
                </li>
                <li className="trail-badge trail-badge-rating">
                    <span className="trail-badge-prefix">Hiking Club Trail Rating</span>
                    <span className="trail-badge-content"><FaDiamond /></span>
                    <span className="trail-badge-suffix">
                        <DifficultyRating difficulty={ trail.difficulty } />
                    </span>
                </li>
                <li className="trail-badge trail-badge-download">
                    <span className="trail-badge-prefix">Download State Park Map</span>
                    <span className="trail-badge-content"><MdOutlineFileDownload /></span>
                    <span className="trail-badge-suffix">Offline PDF</span>
                </li>
            </ul>

            <h4>Hiking Club Trail Description</h4>
            <p>{ trail.notes }</p>

            <h4>State Park Highlights</h4>
            <p>coming soon!</p>

            <TrailVideo videoURL={ trail.videoURL } />

            {
                trail.latitude &&
                trail.longitude &&
                <TrailMapBox latitude={ trail.latitude } longitude={ trail.longitude } />
            }
            
            <p><a className="dnr-link" href={ trail.dnrURL }>Visit State Park Webpage <GoLinkExternal /></a></p>
        </div>

	);

}