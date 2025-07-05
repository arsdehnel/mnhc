"use client";
import YouTube from 'react-youtube';

export function TrailVideo( { videoURL }: { videoURL: string } ) {

    const videoOpts = {
      // height: '390',
      width: '100%'
    };

    let videoId;
    try {
        videoId = new URL( videoURL ).pathname.split('/')[2];
    } catch( err ) {
        console.log( `Error determining YouTube video ID: ${ err }` );
    }

    return <YouTube videoId={ videoId } opts={ videoOpts } />
    
}