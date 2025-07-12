"use client";
import { useEffect, useState } from 'react';
import { FaEye } from "react-icons/fa";
import { BiDownload } from 'react-icons/bi';

export function MapDownload({ url }: { url: string }) {

    const [isCached, setIsCached] = useState(false);

    useEffect(() => {
        async function checkCache() {
            const cacheKeys = await caches.open("v1").then(cache => cache.keys());
            if (cacheKeys.some(request => request.url.includes(url))) {
                setIsCached(true)
            }
        }
        checkCache();
    })

    const saveForOffline = () => {
        caches.open("v1").then((cache) => cache.add(url))
        setIsCached( true )
    }

    return (
        <>
            {
                isCached ? 
                    <a className="map-view" href={ url }><FaEye /></a> :
                    <button className="map-download" onClick={saveForOffline}><BiDownload /></button>
            }
        </>
    )
}