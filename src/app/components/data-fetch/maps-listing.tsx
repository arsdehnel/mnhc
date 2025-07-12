import { kebabCase } from "change-case";
import { db } from "@/db";
import { MapDownload } from "../client/map-download";

export async function MapsListing() {

    const trails = await db.trail.findMany();

	return (

		<div className="maps-listing">
            { 
                trails.map( trail => {
                    return (
                        <div key={ trail.id } className="map-box">
                            <MapDownload url={ `/images/maps/${ kebabCase( trail.name.toLowerCase() ) }.jpg` } />
                            <div className="map-name">{ trail.name }</div>
                            <div className="map-length">{ trail.length } miles</div>
                        </div>    
                    )
                } )
            }
        </div>

	);

}