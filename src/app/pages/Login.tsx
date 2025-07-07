"use client";

import { useState, useTransition } from "react";
import { startAuthentication } from "@simplewebauthn/browser";

import { finishPasskeyLogin, startPasskeyLogin } from "@/app/functions/passkey";
import StandardLayout from '@/app/layouts/standard';
import { link } from '@/app/shared/links';

export default function Login() {
	// const [username, setUsername] = useState("");
	const [result, setResult] = useState("");
	const [isPending, startTransition] = useTransition();

	const passkeyLogin = async () => {
		// 1. Get a challenge from the worker
		const options = await startPasskeyLogin();

		// 2. Ask the browser to sign the challenge
		const login = await startAuthentication({ optionsJSON: options });

		// 3. Give the signed challenge to the worker to finish the login process
		const success = await finishPasskeyLogin(login);

		if (!success) {
			setResult("Login failed");
		} else {
			window.location.href = link("/profile");
		}
	};

	const handlePerformPasskeyLogin = () => {
		startTransition(() => void passkeyLogin());
	};

	return (
		<StandardLayout currentBasePage="profile">
			<h2 className="page-title">
				Login
			</h2>
			<p>
				At this time we only offer authentication via Passkey.  For a large percentage of mobile devices running iOS or Android this should be quite smooth and convenient.  For desktop access the support for this is less mature and might not even be available for you. We plan to offer other authentication options in the future, sorry for the inconvenience!
			</p>
			<p>&nbsp;</p>
			<button className="link-button" onClick={handlePerformPasskeyLogin} disabled={isPending}>
				{isPending ? <>...</> : "Login with passkey"}
			</button>
			{result && <div>{result}</div>}
		</StandardLayout>
	);
}
