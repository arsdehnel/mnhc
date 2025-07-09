"use client";
import React, { useState, useTransition } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import { MdCheckCircle, MdError, MdOutlinePending } from "react-icons/md";

import { checkProofCode } from '@/app/functions/trail-pwd';

export function HikeCreateForm({ trailId }: { trailId: string }) {

    const [ formData, setFormData ] = useState({});

    const handleFormFieldUpdate = ( field: string, value: string ) => {
        setFormData( {
            ...formData,
            [field]: value
        })
    }

    return (
        <div className="form-wrapper">
            {JSON.stringify(trailId)}
            <section className="trail-view-section">
                <h4>Date Hiked</h4>
                <input type="date" onChange={ e => handleFormFieldUpdate( 'dateHiked', e.target.value ) }  />
            </section>
            <section className="trail-view-section">
                <h4>Hike Comments</h4>
                <textarea onChange={ e => handleFormFieldUpdate( 'hikeComments', e.target.value ) } />
            </section>
            { JSON.stringify( formData ) }
        </div>
    )

}