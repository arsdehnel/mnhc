import { link } from '@/app/shared/links';
import { db, User } from "@/db";
import dayjs from 'dayjs';

export async function HikesListing( { user }: { user: User | null } ) {

    if( !user ) {
        return <p>In order to log your hikes you must first be authenticated, please <a href={ link("/login" ) }>log in</a> or <a href={ link("/register") }>register</a>.</p>
    }

	const hikes = await db.hike.findMany();

    if( !hikes || hikes.length === 0 ) {
        return <p>No hikes yet! Probably the easiest way to log a hike is to go to the <a href={ link( "/trails" ) }>trails page</a>, find the trail you hiked, and then use the Log Hike button to create a log entry.</p>
    }

    const trails = await db.trail.findMany();

    const trailLengthMap = trails.reduce( ( trailMap, trail ) => {
        trailMap[ trail.id ] = trail.length;
        return trailMap;
    }, {} );

    const totalLength = hikes.reduce( ( ttl, hike ) => {
        ttl += trailLengthMap[ hike.trailId ];
        return ttl;
    }, 0 );

	return (

		<div className="hikes-listing">
            <div>Total Mileage: { totalLength }</div>
            <h4>Logged Hikes</h4>
			{ 
                hikes.map( hike => {
                    const trail = trails.find( trl => hike.trailId === trl.id );
                    return (
                        <div key={ hike.id } className="hike-box">
                            <div className="hike-name">{ trail?.name }</div>
                            <div className="hike-date">Hiked { dayjs( hike.hikeDate ).format( 'MM/DD/YYYY' ) }</div>
                            <div className="hike-length">{ trail?.length } miles</div>
                        </div>    
                    )
                } )
            }

        </div>

	);

}