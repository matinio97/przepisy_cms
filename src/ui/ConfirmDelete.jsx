import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.2rem;
	padding: 1rem;
	& p {
		color: var(--color-grey-500);
		margin-bottom: 1.2rem;
	}

	& div {
		display: flex;
		justify-content: flex-end;
		gap: 1.2rem;
	}
`;

function ConfirmDelete({
	resourceName,
	onConfirm,
	disabled,
	onCloseModal,
	toDelete = "przepis",
}) {
	function handleClick() {
		onConfirm();
		onCloseModal();
	}

	return (
		<StyledConfirmDelete>
			<Heading as="h3">Usuń {toDelete}</Heading>
			<p>
				Jeżeli potwierdzisz,
				<span style={{ fontWeight: 700 }}>{resourceName}</span> zostanie
				<b> usunięty permanentnie</b>. Operacja nie będzie odwracalna.
			</p>

			<div>
				<Button disabled={disabled} onClick={onCloseModal}>
					Anuluj
				</Button>
				<Button $variation="danger" disabled={disabled} onClick={handleClick}>
					Usuń
				</Button>
			</div>
		</StyledConfirmDelete>
	);
}

export default ConfirmDelete;
