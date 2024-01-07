import styled from "styled-components";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../features/auth/useUser";
import { useDispatch } from "react-redux";
import { changeSidebarOption } from "../context/sidebarSlice";
import { changeShowDashboard } from "../context/dashboardSlice";

const FullPage = styled.div`
	height: 100vh;
	background-color: var(--color-grey-50);
	display: flex;
	align-items: center;
	justify-content: center;
`;

const ProtectedAdminRoute = ({ children }) => {
	const { isLoading, isAuth, fetchStatus, user } = useUser();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(changeSidebarOption("adminAccountMenu"));
	}, []);

	useEffect(() => {
		if (
			user?.user_metadata.role !== "administrator" &&
			!isLoading &&
			fetchStatus !== "fetching"
		)
			navigate("/recipes");
	}, [user, fetchStatus, isLoading]);

	if (isLoading)
		return (
			<FullPage>
				<Spinner />
			</FullPage>
		);

	if (isAuth && user?.user_metadata.role === "administrator") return children;
};

export default ProtectedAdminRoute;
