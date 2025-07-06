"use client";

import { useState, useTransition } from "react";
import {
    startRegistration,
} from "@simplewebauthn/browser";
import {
    finishPasskeyRegistration,
    startPasskeyRegistration,
} from "../functions/passkey";
import { link } from '@/app/shared/links';

export default function Register() {

    const [username, setUsername] = useState("");
    const [result, setResult] = useState("");
    const [isPending, startTransition] = useTransition();

    const passkeyRegister = async () => {
        // 1. Get a challenge from the worker
        const options = await startPasskeyRegistration(username);

        // 2. Ask the browser to sign the challenge
        const registration = await startRegistration({ optionsJSON: options });

        // 3. Give the signed challenge to the worker to finish the registration process
        const success = await finishPasskeyRegistration(username, registration);

        if (!success) {
            setResult("Registration failed");
        } else {
            window.location.href = link("/login");
        }
    };

    const handlePerformPasskeyRegister = () => {
        startTransition(() => void passkeyRegister());
    };

    return (
        <>
            <div>Register</div>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <button onClick={handlePerformPasskeyRegister} disabled={isPending}>
                {isPending ? <>...</> : "Register with passkey"}
            </button>
            {result && <div>{result}</div>}
        </>
    )
}