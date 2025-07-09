import { link } from '@/app/shared/links';
import { db, User } from "@/db";

export async function HikesListing( { user }: { user: User | null } ) {

    if( !user ) {
        return <p>In order to log your hikes you must first be authenticated, please <a href={ link("/login" ) }>log in</a> or <a href={ link("/register") }>register</a>.</p>
    }

	const hikes = await db.hike.findMany();

    if( !hikes || hikes.length === 0 ) {
        return <p>No hikes yet! Probably the easiest way to log a hike is to go to the <a href={ link( "/trails" ) }>trails page</a>, find the trail you hiked, and then use the Log Hike button to create a log entry.</p>
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