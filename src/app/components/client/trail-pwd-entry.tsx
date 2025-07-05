"use client";
import React, { useState, useTransition } from "react";
import { MdCheckCircle, MdError, MdOutlinePending } from "react-icons/md";

import { checkProofCode } from '@/app/functions/trail-pwd';

export function TrailPwdEntry({ trailId }: { trailId: string | undefined }) {

    const [checkStatus, setCheckStatus] = useState('');
    const [isPending, startTransition] = useTransition();

    const codeCheck = async function (e: React.ChangeEvent<HTMLInputElement>) {
        const { success } = await checkProofCode(trailId, e.target.value)
        if( success ) {
            setCheckStatus( 'PASSED' );
        } else {
            setCheckStatus( 'FAILED' );
        }
    }

    const handleCodeCheck = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        startTransition(() => void codeCheck( e ));
    };

    return (

        <div className="form-wrapper">
            <div>
                <input type="text" onChange={handleCodeCheck} />
                {
                    isPending ?
                        <MdOutlinePending color="orange" /> : 
                        checkStatus === 'FAILED' ? 
                            <MdError color="#990000" /> : 
                            checkStatus === 'PASSED' ?
                                <MdCheckCircle color="green" /> :
                                ''
                }
            </div>
        </div>

    );

}