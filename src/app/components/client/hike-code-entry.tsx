"use client";
import React, { useState, useTransition } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import { MdError, MdOutlinePending } from "react-icons/md";

import { checkProofCode } from '@/app/functions/trail-pwd';
import { HikeCreateForm } from "./hike-create-form";

export function HikeCodeEntry({ trailId }: { trailId: string | undefined } ) {

    if( !trailId ) {
        return <p>No trail ID</p>
    }

    const [entryFormVisibility, setEntryFormVisibility] = useState( false )
    const [proofCode, setProofCode] = useState('')
    const [checkStatus, setCheckStatus] = useState('');
    const [isPending, startTransition] = useTransition();

    const codeCheck = async function ( enteredCode: string ) {
        const { success } = await checkProofCode(trailId, enteredCode)
        if( success ) {
            setEntryFormVisibility( true )
            setCheckStatus( 'PASSED' );
        } else {
            setCheckStatus( 'FAILED' );
        }
    }

    const handleCodeCheck = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        setProofCode( e.target.value );
    };

    const handleKeyDown = ( e: React.KeyboardEvent ) => {
        if( e.code == 'Enter' ) {
            checkCode()
        }
    }

    const checkCode = () => {
        startTransition(() => void codeCheck( proofCode ));
    };

    return (
        <div className="form-wrapper">
            <input type="text" onChange={ handleCodeCheck } onKeyDown={ handleKeyDown } />
            <button className="link-button link-button-inline" onClick={ checkCode }><FaArrowCircleRight /></button>
            {
                isPending ?
                    <MdOutlinePending color="#999" /> : 
                    checkStatus === 'FAILED' ? 
                        <MdError color="#990000" /> : 
                        ''
            }
            {
                entryFormVisibility && 
                <HikeCreateForm trailId={ trailId } />
            }
        </div>
    );

}