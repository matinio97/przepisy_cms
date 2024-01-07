import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { createPortal } from "react-dom";
import { cloneElement, createContext, useContext, useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: var(--color-grey-0);
	border-radius: var(--border-radius-lg);
	box-shadow: var(--shadow-lg);
	padding: 0.2rem 0.4rem;
	/* padding: 3.2rem 4rem; */
	width: 90%;
	@media (min-width: 425px) {
		padding: 0.4rem 0.8rem;
	}
	@media (min-width: 500px) {
		padding: 0.4rem 0.8rem;
		width: 80%;
	}
	@media (min-width: 768px) {
		padding: 0.8rem 1.6rem;
		width: 60%;
	}
	@media (min-width: 1024px) {
		padding: 1rem 2rem;
		width: 50%;
	}
	transition: all 0.5s;
	overflow-y: auto;
	max-height: 80vh;
`;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: var(--backdrop-color);
	backdrop-filter: blur(4px);
	z-index: 1000;
	transition: all 0.5s;
`;

const Button = styled.button`
	background: none;
	border: none;
	padding: 0.4rem;
	border-radius: var(--border-radius-sm);
	transform: translateX(0.8rem);
	transition: all 0.2s;
	position: absolute;
	top: 1.2rem;
	right: 1.9rem;
	z-index: 999;
	&:hover {
		background-color: var(--color-grey-100);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		/* Sometimes we need both */
		/* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
		color: var(--color-grey-500);
	}
`;

const ModalContext = createContext();

function Modal({ children }) {
	const [openName, setOpenName] = useState("");
	const close = () => setOpenName("");
	const open = setOpenName;

	return (
		<ModalContext.Provider value={{ openName, close, open }}>
			{children}
		</ModalContext.Provider>
	);
}

function Open({ children, opens: opensWindowName }) {
	const { open } = useContext(ModalContext);
	return cloneElement(children, { onClick: () => open(opensWindowName) });
}

const Window = ({ children, name, outsideClickClose = true }) => {
	const { openName, close } = useContext(ModalContext);
	const ref = useOutsideClick(close);

	if (name !== openName) return null;

	return createPortal(
		<Overlay>
			<StyledModal ref={outsideClickClose ? ref : null}>
				<Button onClick={close}>
					<HiXMark />
				</Button>
				{cloneElement(children, { onCloseModal: close })}
			</StyledModal>
		</Overlay>,
		document.body //modal jest bezposrednim dzieckiem body
	);
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
