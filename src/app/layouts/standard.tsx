import { AppContext } from "@/worker";

import '../styles/global.css';

export default function StandardLayout({ children, ctx }:
	{ children: React.ReactNode, ctx: AppContext }) {
	return (
		<>
			<header>
				<div className="menu">
					<a href="/">Home</a>
					<a href="/trails">Trails</a>
					<a href="/log">Hiking Log</a>
					<a href="/maps">Offline Maps</a>
				</div>
				<div className="user-info">
					{ctx.user?.username
						? `You are logged in as user ${ctx.user.username}`
						: "You are not logged in"}
				</div>
			</header>
			<main>
				{children}
			</main>
			<footer>Footer</footer>
		</>
	);
}