import { Menu } from "../components/menu";

export default function StandardLayout({ children, currentBasePage }: { children: React.ReactNode, currentBasePage: string | undefined }) {	
	return (
		<>
			<header>
				<Menu currentBasePage={ currentBasePage } />
			</header>
			<main>
				{children}
			</main>
			<footer>Footer</footer>
		</>
	);
}