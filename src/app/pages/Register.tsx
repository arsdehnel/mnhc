"use client";
import { useState, useTransition } from "react";
import { startRegistration } from "@simplewebauthn/browser";

import { finishPasskeyRegistration, startPasskeyRegistration } from "@/app/functions/passkey";
import { link } from '@/app/shared/links';

import StandardLayout from '@/app/layouts/standard';

export default function Register() {

    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [isPending, startTransition] = useTransition();

    const passkeyRegister = async () => {

        if (!username) {
            setError("Username required");
            return;
        }

        // 1. Get a challenge from the worker
        const options = await startPasskeyRegistration(username);

        // 2. Ask the browser to sign the challenge
        const registration = await startRegistration({ optionsJSON: options });

        // 3. Give the signed challenge to the worker to finish the registration process
        const success = await finishPasskeyRegistration(username, registration);

        if (!success) {
            setError("Registration failed");
        } else {
            window.location.href = link("/login");
        }
    };

    const handlePerformPasskeyRegister = () => {
        startTransition(() => void passkeyRegister());
    };

    return (
        <StandardLayout currentBasePage="profile">
            <h2 className="page-title">
                Register
            </h2>
            <p>
                At this time we only offer registration via Passkey.  For a large percentage of mobile devices running iOS or Android this should be quite smooth and convenient.  For desktop access the support for this is less mature and might not even be available for you. We plan to offer other authentication options in the future, sorry for the inconvenience!
            </p>
            <h4>Register with Passkey</h4>
            <p>Please provide a username for your account (must be unique) and click the "Register with Passkey" button.  This will trigger the passkey/biometric verification on your device.  Once you've completed that verification your MN Hiking Club account will be created and you will be redirected to your newly created profile!</p>
            <div className="form-wrapper">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <button className="link-button link-button-inline" onClick={handlePerformPasskeyRegister} disabled={isPending}>
                    {isPending ? <>...</> : "Register with passkey"}
                </button>
                {
                    error && 
                    <div className="error-message">{ error}</div>
                }
            </div>
        </StandardLayout>
    )
}