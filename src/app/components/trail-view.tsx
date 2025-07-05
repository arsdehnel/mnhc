import { kebabCase } from "change-case";
import { GoLinkExternal } from "react-icons/go";
import { MdOutlineFileDownload } from "react-icons/md";

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

    let difficultyWord;
    switch( trail.difficulty ) {
        case 1:
            difficultyWord = 'easiest';
            break;
        case 2:
            difficultyWord = 'easy';
            break;
        case 3:
            difficultyWord = 'moderate';
            break;
        case 4:
            difficultyWord = 'challenging';
            break;
        case 5:
            difficultyWord = 'difficult';
            break;
    }

	return (

		<div className="trail-view">

            <h2>{ trail.name }</h2>

            <a className="log-hike-button" href={ `/log/new/${ trail.id }` }><span>Log Hike</span></a>

            <section className="trail-view-section">
                <p>{ trail.address }</p>
            </section>

            <section className="trail-view-section">
                <img src={ `/images/trails/${ kebabCase( trail.name.toLowerCase() ) }.jpg` } className="trail-image" />
            </section>

            <section className="trail-view-section">
                <ul className="trail-badges">
                    <li className="trail-badge trail-badge-mileage">
                        <span className="trail-badge-prefix">Hiking Club Trail Mileage</span>
                        <span className="trail-badge-content">{ trail.length }</span>
                        <span className="trail-badge-suffix">Miles</span>
                    </li>
                    <li className="trail-badge trail-badge-rating">
                        <span className="trail-badge-prefix">Hiking Club Trail Rating</span>
                        <span className="trail-badge-content">
                            <DifficultyRating difficulty={ trail.difficulty } />
                        </span>
                        <span className="trail-badge-suffix">{ difficultyWord }</span>
                    </li>
                    <li className="trail-badge trail-badge-download">
                        <span className="trail-badge-prefix">Download State Park Map</span>
                        <span className="trail-badge-content"><MdOutlineFileDownload /></span>
                        <span className="trail-badge-suffix">Offline PDF</span>
                    </li>
                </ul>
            </section>

            <section className="trail-view-section">
                <h4>Hiking Club Trail Description</h4>
                <p>{ trail.notes }</p>
            </section>

            <section className="trail-view-section">
                <h4>State Park Highlights</h4>
                <p>coming soon!</p>
            </section>

            <section className="trail-view-section">
                <TrailVideo videoURL={ trail.videoURL } />
            </section>

            {
                trail.latitude &&
                trail.longitude &&
                <section className="trail-view-section">
                   <TrailMapBox latitude={ trail.latitude } longitude={ trail.longitude } />
                </section>
            }
            
            <p><a className="dnr-link" href={ trail.dnrURL }>Visit State Park Webpage <GoLinkExternal /></a></p>
        </div>

	);

}