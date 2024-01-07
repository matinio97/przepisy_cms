import { useUser } from "../features/auth/useUser";
import styled, { css } from "styled-components";
import Spinner from "../ui/Spinner";
import Heading from "../ui/Heading";
import { DEFAULT_USER_AVATAR } from "../context/variables";
import { format, parseISO } from "date-fns";
import { useUserRecipes } from "../features/recipes/useUserRecipes";

const StyledLayout = styled.div`
	padding: 0.8rem;
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	@media (min-width: 768px) {
		padding: 0.8rem 5vw;
	}
	@media (min-width: 1024px) {
		padding: 0.8rem 10vw;
	}
	@media (min-width: 1440px) {
		padding: 0.8rem 20vw;
	}
`;

const Img = styled.img`
	width: 60%;
	aspect-ratio: 1 / 1;
	border-radius: 999px;
	border: 1px solid var(--color-grey-400);
	@media (min-width: 768px) {
		width: 60%;
	}
	@media (min-width: 1024px) {
		width: 50%;
		max-width: 50%;
	}
`;

const P = styled.p`
	font-size: ${(props) => (props.size ? props.size : css`1rem`)};
	text-align: justify;
`;

const UserOverview = () => {
	const { user } = useUser();
	const { isLoading, count } = useUserRecipes(user.id);

	if (isLoading) return <Spinner />;

	const userName = user.user_metadata.userName;
	const userAvatar = user.user_metadata.avatar || DEFAULT_USER_AVATAR;

	return (
		<StyledLayout>
			<Heading as="h4" style={{ textAlign: "center" }}>
				Cześć {userName} 👋
			</Heading>
			<Img src={userAvatar} style={{ margin: "auto" }} />
			<P size={"1.1rem"}>
				Jesteś z nami od {format(parseISO(user.created_at), "dd.MM.yyyy")}r i
				bardzo się z tego powodu cieszymy 😁.&nbsp;
				{count ? (
					<>
						Na naszym portalu dodałeś/aś
						{count === 1 && <b> {count} przepis! </b>}
						{count >= 2 && count < 5 && <b> {count} przepisy! </b>}
						{count >= 5 && <b> {count} przepisów! </b>}
						Cieszymy się z twojej aktywności, zachęcamy do dalszej działalności
						🤩.
					</>
				) : (
					<>
						Nie dodałeś/aś u nas żadnych przepisów, zachęcamy do dzielenia się z
						pomysłami z innymi użytkownikami 🍕.
					</>
				)}
			</P>
			<P>
				Dodawanie, edytowanie czy usuwanie swoich przepisów możesz dokonać w
				zakładce <b>"Twoje przepisy"</b>. Aby Twój przepis był widoczny,
				<b> musi zostać zaakceptowany przez administratowa</b>. W związku z tym
				treści niecenzuralne oraz nieodpowienie nie będą widoczne dla
				użytkowników.
			</P>
			<P>
				W zakładce <b>"Ustawienia konta"</b> możesz zmienić swoje zdjęcie
				profilowe, nazwę użytkownika oraz hasło.
			</P>
		</StyledLayout>
	);
};

export default UserOverview;
