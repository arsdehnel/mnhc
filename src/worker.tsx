import { defineApp, ErrorResponse } from "rwsdk/worker";
import { route, render, prefix } from "rwsdk/router";
import { Document } from "@/app/Document";
import { setCommonHeaders } from "@/app/headers";
import { sessions, setupSessionStore } from "./session/store";
import { Session } from "./session/durableObject";
import { type User, db, setupDb } from "@/db";
import { env } from "cloudflare:workers";
export { SessionDurableObject } from "./session/durableObject";

// pages
import Home from "@/app/pages/Home";
import Hikes from "@/app/pages/Hikes";
import HikeNew from "@/app/pages/HikeNew";
import HikeEdit from "@/app/pages/HikeEdit";
import Maps from "@/app/pages/Maps";
import Trails from "@/app/pages/Trails";
import Trail from "@/app/pages/Trail";
import Profile from "@/app/pages/Profile";
import Login from "@/app/pages/Login";
import Register from "@/app/pages/Register";

export type AppContext = {
	session: Session | null;
	user: User | null;
};

export type RequestProps = {
	url: string | null;
};

export default defineApp([
	setCommonHeaders(),
	async ({ ctx, request, headers }) => {
		await setupDb(env);
		setupSessionStore(env);

		try {
			ctx.session = await sessions.load(request);
		} catch (error) {
			if (error instanceof ErrorResponse && error.code === 401) {
				await sessions.remove(request, headers);
				headers.set("Location", "/user/login");

				return new Response(null, {
					status: 302,
					headers,
				});
			}

			throw error;
		}

		if (ctx.session?.userId) {
			ctx.user = await db.user.findUnique({
				where: {
					id: ctx.session.userId,
				},
			});
		}
	},
	render(Document, [
		route("/", Home),
		route("/trails", Trails),
		route("/trails/:id", Trail),
		route("/hikes", Hikes),
		route("/hikes/new/:trailId", HikeNew),
		route("/hikes/:id", HikeEdit),
		route("/maps", Maps),
		route("/profile", Profile),
		route("/login", Login),
		route("/logout", async function ({ request }) {

			const headers = new Headers();
			await sessions.remove(request, headers);
			headers.set("Location", "/");

			return new Response(null, {
				status: 302,
				headers,
			});

		}),
		route("/register", Register)
	]),
]);
