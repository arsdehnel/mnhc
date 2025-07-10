import { db } from "@/db";
import { BiDownload } from 'react-icons/bi';

export async function MapsListing() {

    const trails = await db.trail.findMany();

	return (

		<div className="maps-listing">
            { 
                trails.map( trail => {
                    return (
                        <div key={ trail.id } className="map-box">
                            <BiDownload className="map-download" />
                            <div className="map-name">{ trail.name }</div>
                            <div className="map-length">{ trail.length } miles</div>
                        </div>    
                    )
                } )
            }
        </div>

	);

}