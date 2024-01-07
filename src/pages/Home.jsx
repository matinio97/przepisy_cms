import styled from "styled-components";
import RecipeCard from "../features/recipes/RecipeCard";
import Spinner from "../ui/Spinner";
import { useRecipes } from "../features/recipes/useRecipes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeSidebarOption } from "../context/sidebarSlice";
import { searchRecipe } from "../context/searchRecipesSlice";
import NoRecipeFound from "../ui/NoRecipeFound";
import { usePreparePageParam } from "../hooks/usePreparePageParam";
import Pagination from "../ui/Pagination";

const StyledHome = styled.div`
	box-sizing: border-box;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 0.5rem;
`;

const Home = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(changeSidebarOption("filterSorter"));
		dispatch(searchRecipe(""));
	}, []);

	const options = [{ value: 20 }, { value: 30 }, { value: 40 }];
	const pageSizeKey = "homeRecipesPageSize";
	const [pageSize, setPageSize] = usePreparePageParam(pageSizeKey, options);
	const { isLoading, recipes, count } = useRecipes(pageSize, true, true);

	if (isLoading) return <Spinner />;

	return (
		<>
			{recipes.length > 0 ? (
				<>
					<StyledHome>
						{recipes.map((recipe) => (
							<RecipeCard recipe={recipe} key={recipe.id} />
						))}
					</StyledHome>
					<div
						style={{
							borderBottom: "1px solid var(--color-grey-400)",
							marginBottom: "1rem",
							marginTop: "1rem",
						}}
					/>
					<Pagination
						count={count}
						pageSize={pageSize}
						options={options}
						pageSizeKey={pageSizeKey}
						setPageSize={setPageSize}
					/>
				</>
			) : (
				<NoRecipeFound />
			)}
		</>
	);
};

export default Home;
