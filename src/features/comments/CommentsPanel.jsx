import React, { useEffect, useState } from "react";
import { useRecipeComments } from "./useRecipeComments";
import Spinner from "../../ui/Spinner";
import styled from "styled-components";
import { format, parseISO } from "date-fns";
import Button from "../../ui/Button";
import { getUserById } from "../../services/apiAdminAuth";
import { useUser } from "../auth/useUser";
import { useDeleteComment } from "./useDeleteComment";
import ShowImageModal from "./ShowImageModal";
import AddCommentModal from "./AddCommentModal";

const Container = styled.div`
	width: 100%;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
`;

const Header = styled.div`
	width: 100%;
	background-color: var(--color-indigo-100);
	font-weight: 600;
	padding: 0.8rem 1.2rem;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	gap: 0.6rem;
	align-items: center;
	flex-direction: column;
	@media (min-width: 550px) {
		flex-direction: row;
	}
`;

const SingleCommentBox = styled.div`
	box-sizing: border-box;
	width: 100%;
	display: grid;
	grid-template-areas: "author author trash" "comment comment comment" "image image image";
	gap: 1rem;
	padding: 0.4rem;
	border-left: 1px solid var(--color-indigo-100);
	border-right: 1px solid var(--color-indigo-100);
	border-bottom: 1px solid var(--color-indigo-100);

	& p {
		text-align: center;
		grid-area: comment;
		word-break: break-all;
	}

	@media (min-width: 425px) {
		padding: 0.8rem;
	}

	@media (min-width: 768px) {
		grid-template-columns: 5fr 1fr;
		padding: 1rem;
	}

	& div {
		@media (min-width: 600px) {
			display: flex;
			gap: 1rem;
		}
	}
`;

const Box = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	justify-content: space-between;
	align-items: center;
`;

const CommentsPanel = ({ recipeId, isLogged, recipeName }) => {
	const { isLoading, comments, count } = useRecipeComments(recipeId);
	const { isDeleting, deleteComment } = useDeleteComment();

	const { user } = useUser();
	const [usernames, setUsernames] = useState([]);

	useEffect(() => {
		const getUserName = async (id) => {
			const user = await getUserById(id);
			return user.user.user_metadata.userName;
		};

		const fetchData = async () => {
			const usernamesArray = await Promise.all(
				comments.map(async ({ authorId }) => {
					const username = await getUserName(authorId);
					return username;
				})
			);

			setUsernames(usernamesArray);
		};

		if (!isLoading) fetchData();
	}, [comments]);

	if (isLoading) return <Spinner />;

	return (
		<Container>
			<Header>
				<span style={{ textAlign: "center" }}>
					{count > 0
						? `Liczba komentarzy: ${count}`
						: "Nie dodano żadnego komentarza"}
				</span>
				{isLogged ? (
					<AddCommentModal
						recipeName={recipeName}
						recipeId={recipeId}
						authorId={user?.id}
					/>
				) : (
					<span>Zaloguj się, aby skomentować</span>
				)}
			</Header>
			<div style={{ maxHeight: "8000px", overflowY: "auto" }}>
				{comments.map(
					({ id, comment, created_at, authorId, imageUrl }, index) => (
						<SingleCommentBox key={index}>
							{(authorId === user?.id ||
								user?.user_metadata.role === "administrator") && (
								<Button
									style={{ gridArea: "trash" }}
									$variation="danger"
									disabled={isDeleting}
									onClick={() => deleteComment(id)}>
									Usuń
								</Button>
							)}

							<div style={{ gridArea: "author" }}>
								<span>{format(parseISO(created_at), "dd/MM/yyyy")}</span> <br />
								<b>{usernames[index]}</b>
							</div>
							<p
							//  style={{ gridArea: "comment", wordBreak: "break-all" }}
							>
								{comment}
							</p>
							{imageUrl && <ShowImageModal imageUrl={imageUrl} />}
						</SingleCommentBox>
					)
				)}
			</div>
		</Container>
	);
};

export default CommentsPanel;
