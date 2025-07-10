"use client";
import React, { useState, useTransition } from "react";

import { Hike } from "@/db";
import { saveHike } from '@/app/functions/hikes';

export function HikeCreateForm({ trailId }: { trailId: string }) {

    const [ formData, setFormData ] = React.useState<Partial<Hike>>({trailId});
    const [ saveError, setSaveError ] = useState('');
    const [ isPending, startTransition ] = useTransition();

    const handleFormFieldUpdate = ( field: string, value: string ) => {
        setFormData( {
            ...formData,
            [field]: value
        })
    }

    const handleSave = async function () {
        console.log( formData );
        const { error, hike } = await saveHike( formData )
        if( hike ) {
            window.location.href = `/hikes/${ hike.id }/`
        } else {
            setSaveError( error );
        }
    }

    const startSave = () => {
        startTransition(() => void handleSave());
    };    

    return (
        <div className="form-wrapper">
            <section className="trail-view-section">
                <h4>Date Hiked</h4>
                <input type="date" onChange={ e => handleFormFieldUpdate( 'hikeDate', new Date( e.target.value ) ) }  />
            </section>
            <section className="trail-view-section">
                <h4>Hike Comments</h4>
                <textarea onChange={ e => handleFormFieldUpdate( 'comments', e.target.value ) } />
            </section>
            <p>
                {
                    isPending ?
                        <button className="link-button">..saving...</button> :
                        <button className="link-button" onClick={startSave}>Save</button>
                }
            </p>
            {
                saveError
            }
        </div>
    )

}