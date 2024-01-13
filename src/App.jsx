import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DarkModeProvider } from "./context/DarkModeContext";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import UserRecipes from "./pages/UserRecipes";
import UserAccount from "./pages/UserAccount";
import UserOverview from "./pages/UserOverview";
import ProtectedRoute from "./ui/ProtectedRoute";
import ProtectedAdminRoute from "./ui/ProtectedAdminRoute";
import LoadedRecipe from "./ui/LoadedRecipe";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUserManagement from "./pages/AdminUserManagement";
import AdminRecipesMenagement from "./pages/AdminRecipesMenagement";
import AdminIngredientsManagement from "./pages/AdminIngredientsManagement";
import AddNewRecipe from "./pages/AddNewRecipe";
import { Suspense, lazy } from "react";
import SpinnerFullPage from "./ui/SpinnerFullPage";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const AppLayout = lazy(() => import("./layouts/AppLayout"));
const Home = lazy(() => import("./pages/Home"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const WelcomePage = lazy(() => import("./pages/WelcomePage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 0,
		},
	},
});

const App = () => {
	return (
		<DarkModeProvider>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />
				<BrowserRouter>
					<Suspense fallback={<SpinnerFullPage />}>
						<Routes>
							<Route index element={<WelcomePage />} />
							<Route element={<AppLayout />}>
								<Route path="/recipes" element={<Home />} />
								<Route path="/recipe/:recipeId" element={<LoadedRecipe />} />
								<Route
									path="/user-overview"
									element={
										<ProtectedRoute>
											<UserOverview />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/user-account"
									element={
										<ProtectedRoute>
											<UserAccount />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/user-recipes"
									element={
										<ProtectedRoute>
											<UserRecipes />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/add-new-recipe"
									element={
										<ProtectedRoute>
											<AddNewRecipe />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/dashboard"
									element={
										<ProtectedAdminRoute>
											<AdminDashboard />
										</ProtectedAdminRoute>
									}
								/>
								<Route
									path="/user-management"
									element={
										<ProtectedAdminRoute>
											<AdminUserManagement />
										</ProtectedAdminRoute>
									}
								/>
								<Route
									path="/recipes-management"
									element={
										<ProtectedAdminRoute>
											<AdminRecipesMenagement />
										</ProtectedAdminRoute>
									}
								/>
								<Route
									path="/ingredients-management"
									element={
										<ProtectedAdminRoute>
											<AdminIngredientsManagement />
										</ProtectedAdminRoute>
									}
								/>
							</Route>
							<Route path="/login" element={<LoginPage />} />
							<Route path="/register" element={<RegisterPage />} />
							<Route path="*" element={<PageNotFound />} />
						</Routes>
					</Suspense>
				</BrowserRouter>

				<Toaster
					position="top-center"
					gutter={12}
					containerStyle={{ margin: "8px" }}
					toastOptions={{
						success: {
							duration: 3000,
						},
						error: {
							duration: 5000,
						},
						style: {
							fontSize: "15px",
							maxWitdh: "500px",
							padding: "16px 24px",
							backgroundColor: "var(--color-grey-0)",
							color: "var(--color-grey-700)",
						},
					}}
				/>
			</QueryClientProvider>
		</DarkModeProvider>
	);
};

export default App;
