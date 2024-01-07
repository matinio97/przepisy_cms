import React from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import styled from "styled-components";

const CheckboxInput = styled.input`
	width: 20px;
	height: 20px;
`;

const Checkbox = ({ children, id }) => {
	const [isChecked, setIsChecked] = useLocalStorageState(true, id);

	return (
		<>
			<CheckboxInput
				type="checkbox"
				id={id}
				checked={isChecked}
				onChange={() => setIsChecked(!isChecked)}
			/>
			<label htmlFor={id}>{children}</label>
		</>
	);
};

export default Checkbox;
