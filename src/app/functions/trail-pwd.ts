"use server";
import { db } from "@/db";

export async function checkProofCode( trailId: string | undefined, proofCode: string | null ) {

    const trail = await db.trail.findUnique({
        where: {
            id: trailId
        }
    })

    if( !trail ) {
        return {
            error: `No trail found`
        }
    }

    if( trail.proofCode?.toLowerCase() !== proofCode?.toLowerCase() ) {
        return {
            error: `Code does not match: ${ trail.proofCode }`
        }
    }

    return {
        success: true
    }

}