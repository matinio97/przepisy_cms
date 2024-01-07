import React from "react";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import styled from "styled-components";

const Img = styled.img`
	object-fit: contain;
	width: 100%;
	height: 100%;
`;

const ShowImageModal = ({ imageUrl }) => {
	return (
		<Modal>
			<Modal.Open opens="show-image">
				<Button style={{ gridArea: "image" }}>Zobacz zdjęcie</Button>
			</Modal.Open>
			<Modal.Window name="show-image">
				<Img src={imageUrl} alt="zdjęcie" onCloseModal />
			</Modal.Window>
		</Modal>
	);
};

export default ShowImageModal;
