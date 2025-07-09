import { db } from "@/db";

export async function HikeForm( { id }: { id: string | undefined } ) {

    const hike = await db.hike.findUnique({
        where: {
            id
        }
    })

    if( !hike ) {
        return <p>No hike found</p>
    }

    return (

        <div className="log-entry">

            <p>Edit existing log entry { id }</p>

        </div>

    );

}