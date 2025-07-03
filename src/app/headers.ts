import { RouteMiddleware } from "rwsdk/router";
import { IS_DEV } from "rwsdk/constants";

export const setCommonHeaders = (): RouteMiddleware => ({ headers, rw: { nonce } }) => {
	if (!IS_DEV) {
		// Forces browsers to always use HTTPS for a specified time period (2 years)
		headers.set(
			"Strict-Transport-Security",
			"max-age=63072000; includeSubDomains; preload",
		);
	}

	// Forces browser to use the declared content-type instead of trying to guess/sniff it
	headers.set("X-Content-Type-Options", "nosniff");

	// Stops browsers from sending the referring webpage URL in HTTP headers
	headers.set("Referrer-Policy", "no-referrer");

	// Explicitly disables access to specific browser features/APIs
	headers.set(
		"Permissions-Policy",
		"geolocation=(), microphone=(), camera=()",
	);

	// Defines trusted sources for content loading and script execution:
	interface CSPDefinition {
		[index: string]: ReadonlyArray<string>;
 		default: ReadonlyArray<string>;
  		script: ReadonlyArray<string>;
		style: ReadonlyArray<string>;
		frame: ReadonlyArray<string>;
		object: ReadonlyArray<string>;
		img: ReadonlyArray<string>
	}
	
	const cspDef: CSPDefinition = {
		default: [
			'self'
		],
		script: [
			'self',
			`nonce-${nonce}`,
			'https://challenges.cloudflare.com',
			'http://www.youtube.com'
		],
		style: [
			'self',
			'unsafe-inline',
			'https://api.mapbox.com'
		],
		frame: [
			'https://challenges.cloudflare.com',
			'youtube.com',
			'www.youtube.com'
		],
		object: [
			'none'
		],
		img: [
			'self',
			'data:'
		]
	}

	let csp: string = '';
	Object.keys(cspDef).forEach(clause => {
		csp += `${clause}-src: ${cspDef[clause].join(' ')}`
	})

	headers.set(
		"Content-Security-Policy",
		csp
	);
};