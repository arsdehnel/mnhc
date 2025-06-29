import { DifficultyRating } from "./difficulty-rating";

export async function TrailView( { name, difficulty }: { name: string, difficulty: number} ) {

	return (

		<div className="trail-view">
            <h3>{ name }</h3>
            <DifficultyRating difficulty={ difficulty } />
        </div>

	);

}