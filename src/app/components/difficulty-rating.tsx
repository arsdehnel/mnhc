import { FaPersonHiking } from "react-icons/fa6";

export function DifficultyRating( { difficulty }: { difficulty: number} ) {

	return (

		<div className="difficulty-rating">
            {
                [ 1, 2, 3, 4, 5 ].map( rating => {
                    if( rating > difficulty ) {
                        return <FaPersonHiking key={ rating } fill="#444" />
                    } else {
                        return <FaPersonHiking key={ rating } fill="orange" />
                    }
                })
            }
        </div>

	);

}