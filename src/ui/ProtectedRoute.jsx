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

const ProtectedRoute = ({ children }) => {
	const { isLoading, isAuth, fetchStatus } = useUser();
	const navigate = useNavigate();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(changeSidebarOption("userAccountMenu"));
	}, []);

	useEffect(() => {
		if (!isLoading && !isAuth && fetchStatus !== "fetching")
			navigate("/recipes");
	}, [isAuth, isLoading, navigate, fetchStatus]);

	if (isLoading)
		return (
			<FullPage>
				<Spinner />
			</FullPage>
		);

	if (isAuth) return children;
};

export default ProtectedRoute;
