import { db } from "@/db";

export async function LogEntry( { id, trailId }: { id: string | undefined, trailId: string | undefined } ) {

    if( trailId ) {
        
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
                    <div><input type="password" /></div>
                </section>

            </div>

        );

    }

    if( id ) {

        return (

            <div className="log-entry">

                <p>Edit existing log entry { id }</p>

            </div>

        );

    }



}