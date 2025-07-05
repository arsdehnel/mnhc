import { db } from "@/db";

export async function HikesListing() {

	const hikes = await db.hike.findMany();

    if( !hikes || hikes.length === 0 ) {
        return <p>No hikes yet!</p>
    }

	return (

		<div className="hikes-listing">

			{ 
                hikes.map( hike => {
                    return (
                        <div key={ hike.id } className="hike-box">
                            { JSON.stringify( hike ) }
                        </div>    
                    )
                } )
            }

        </div>

	);

}