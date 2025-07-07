"use client";
import Map, { 
    Marker,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl
} from 'react-map-gl/mapbox';
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
            onLoad={ ( { target } ) => target.resize() }
            style={ { width: '100%', height: 400 } }
            mapStyle="mapbox://styles/mapbox/streets-v9"
        >
            <GeolocateControl position="top-left" />
            <FullscreenControl position="top-left" />
            <NavigationControl position="top-left" />
            <ScaleControl position="bottom-right" />
            <Marker longitude={longitude} latitude={latitude} anchor="bottom" />
        </Map>
    )

}