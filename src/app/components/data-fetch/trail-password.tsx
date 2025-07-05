import { db } from "@/db";

import { TrailPwdEntry } from "../client/trail-pwd-entry";

export async function TrailPassword( { trailId }: { trailId: string | undefined } ) {

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
                <TrailPwdEntry trailId={ trailId } />
            </section>

        </div>

    );

}