import { db } from "@/db";

import { HikeCodeEntry } from "../client/hike-code-entry";

export async function TrailCode( { trailId }: { trailId: string | undefined } ) {

    const trail = await db.trail.findUnique({
        where: {
            id: trailId
        }
    })

    if( !trail ) {
        return <p>No trail found</p>
    }

    return (

        <div className="log-entry">

            <p>{ trail.name }</p>

            <section className="trail-view-section">
                <h4>Hiking Club Trail Password</h4>
                <HikeCodeEntry trailId={ trailId } />
            </section>

        </div>

    );

}