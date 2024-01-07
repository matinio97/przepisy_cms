import React from "react";
import Stat from "./Stat";
import { BsCheck2Square, BsJournalCheck } from "react-icons/bs";
import { SlNote } from "react-icons/sl";
import { LuUsers } from "react-icons/lu";
import { useAcceptedRecipes } from "../recipes/useAcceptedRecipes";
import { useVerificationRecipes } from "../recipes/useVerificationRecipes copy";
import { useUserList } from "../auth/useUserList";
import { useAcceptedIngredients } from "../recipes/useAcceptedIngredients";
import { useVerificationIngredients } from "../recipes/useVerificationIngredients";

const Stats = () => {
	const { count: acceptedRecipesCount } = useAcceptedRecipes();
	const { count: verifyRecipesCount } = useVerificationRecipes();
	const { count: usersCount } = useUserList();
	const { count: acceptedIngredientsCount } = useAcceptedIngredients();
	const { count: verifyIngredientsCount } = useVerificationIngredients();

	return (
		<>
			<Stat
				title="Przepisy publiczne"
				gridArea="RAC"
				icon={<BsJournalCheck />}
				color="green">
				{acceptedRecipesCount}
			</Stat>

			<Stat
				title="Przepisy weryfikowane"
				gridArea="RVC"
				icon={<SlNote />}
				color="yellow">
				{verifyRecipesCount}
			</Stat>

			<Stat
				title="Składniki publiczne"
				gridArea="IAC"
				icon={<BsCheck2Square />}
				color="green">
				{acceptedIngredientsCount}
			</Stat>

			<Stat
				title="Składniki weryfikowane"
				gridArea="IVC"
				icon={<SlNote />}
				color="yellow">
				{verifyIngredientsCount}
			</Stat>

			<Stat
				title="Liczba wszystkich użytkowników"
				gridArea="UC"
				icon={<LuUsers />}
				color="blue">
				{usersCount}
			</Stat>
		</>
	);
};

export default Stats;
