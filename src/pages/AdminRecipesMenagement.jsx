import { useRecipes } from "../features/recipes/useRecipes";
import Spinner from "../ui/Spinner";
import Table from "../ui/Table";
import styled from "styled-components";
import AdminRecipeCart from "../features/recipes/AdminRecipeCart";
import Heading from "../ui/Heading";
import RecipesOperation from "../features/recipes/RecipesOperation";
import Pagination from "../ui/Pagination";
import { useNavigate } from "react-router-dom";
import { usePreparePageParam } from "../hooks/usePreparePageParam";
import Button from "../ui/Button";
import Row from "../ui/Row";
import { useWindowWidth } from "../hooks/useWindowWidth";

const Layout = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1rem;
`;

const AdminRecipesMenagement = () => {
	const options = [{ value: 5 }, { value: 10 }, { value: 20 }];
	const pageSizeKey = "adminRecipesPageSize";
	const navigate = useNavigate();
	const [pageSize, setPageSize] = usePreparePageParam(pageSizeKey, options);
	const windowWidth = useWindowWidth();
	const { isLoading, recipes, count } = useRecipes(pageSize);

	if (isLoading) return <Spinner />;

	const numberOfRecipes = recipes?.length;

	return (
		<>
			<Heading as="h3" style={{ marginBottom: "1rem" }}>
				Zarządzanie przepisami
			</Heading>
			<Layout>
				{windowWidth > 1024 ? (
					<Row>
						<Button
							style={{ width: "60%" }}
							$variation={"secondary"}
							onClick={() => navigate("/ingredients-management")}>
							Składniki
						</Button>
						<RecipesOperation />
					</Row>
				) : (
					<>
						<Button
							style={{ width: "100%" }}
							variation={"secondary"}
							onClick={() => navigate("/ingredients-management")}>
							Składniki
						</Button>
						<RecipesOperation />
					</>
				)}
				{numberOfRecipes ? (
					<>
						<Table columns="1fr 1fr 1fr 1fr 1fr">
							<Table.Overflow>
								<Table.Header>
									<div>Zdjęcie</div>
									<div>Nazwa przepisu</div>
									<div>Utworzono</div>
									<div>Status</div>
									<div>Akcje</div>
								</Table.Header>
								<Table.Body
									data={recipes}
									render={(recipe) => (
										<AdminRecipeCart recipe={recipe} key={recipe.id} />
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
					<Heading as="h3" style={{ textAlign: "center" }}>
						Brak takich przepisów
					</Heading>
				)}
			</Layout>
		</>
	);
};

export default AdminRecipesMenagement;
