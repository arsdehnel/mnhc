"use client";
import Map from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

export function TrailMapBox( { latitude, longitude }: { latitude: number, longitude: number } ) {

    return (
        <Map
            mapboxAccessToken="pk.eyJ1IjoiYXJzZGVobmVsIiwiYSI6ImNtOXFod2VpdTB1ZXQyam9na3ZzZ3hteHoifQ.x0f0jPFLKyevTXBB8GFJ7Q"
            initialViewState={{
                longitude,
                latitude,
                zoom: 9
            }}
            style={{width: 600, height: 400}}
            mapStyle="mapbox://styles/mapbox/streets-v9"
        />
    )

}