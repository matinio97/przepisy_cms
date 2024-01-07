import NoRecipesInfo from "../ui/NoRecipesInfo";
import { useUserRecipes } from "../features/recipes/useUserRecipes";
import Spinner from "../ui/Spinner";
import Table from "../ui/Table";
import UserRecipeCart from "../features/recipes/UserRecipeCart";
import AddNewRecipeModal from "../features/recipes/AddNewRecipeModal";
import { useUser } from "../features/auth/useUser";
import Pagination from "../ui/Pagination";
import { usePreparePageParam } from "../hooks/usePreparePageParam";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { useWindowWidth } from "../hooks/useWindowWidth";

const UserRecipes = () => {
	const options = [{ value: 5 }, { value: 10 }, { value: 15 }];
	const pageSizeKey = "userRecipesPageSize";
	const windowWidth = useWindowWidth();
	const [pageSize, setPageSize] = usePreparePageParam(pageSizeKey, options);

	const { user } = useUser();
	const { isLoading, recipes, count } = useUserRecipes(user.id, pageSize);

	if (isLoading) return <Spinner />;

	const numberOfRecipes = recipes?.length;

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "1rem",
			}}>
			{windowWidth >= 768 ? (
				<Row>
					<Heading as="h3">Twoje przepisy</Heading>
					<AddNewRecipeModal />
				</Row>
			) : (
				<>
					<Heading as="h3">Twoje przepisy</Heading>
					<AddNewRecipeModal />
				</>
			)}
			{numberOfRecipes ? (
				<>
					<Table columns="1fr 1fr 1fr 1fr 1fr">
						<Table.Overflow>
							<Table.Header>
								<div>Zdjęcie</div>
								<div>Nazwa</div>
								<div>Utworzono</div>
								<div>Status</div>
								<div>Akcje</div>
							</Table.Header>
							<Table.Body
								data={recipes}
								render={(recipe, index) => (
									<UserRecipeCart recipe={recipe} key={index} />
								)}
							/>
						</Table.Overflow>
						<Table.Footer>
							<Pagination
								count={count}
								pageSize={pageSize}
								options={options}
								pageSizeKey={pageSizeKey}
								setPageSize={setPageSize}
							/>
						</Table.Footer>
					</Table>
				</>
			) : (
				<NoRecipesInfo />
			)}
		</div>
	);
};

export default UserRecipes;
