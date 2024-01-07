import styled from "styled-components";

// const StyledSelect = styled.select`
const Select = styled.select`
	background-color: var(--color-grey-200);
	color: var(--color-grey-800);
	padding: 5px 10px;
	border-radius: var(--border-radius-lg);
`;

// const Select = ({ options, value, onChange, ...props }) => {
// 	return (
// 		<StyledSelect onChange={onChange} value={value} {...props}>
// 			{options.map((option, index) => (
// 				<option value={option.value} key={index}>
// 					{option.label}
// 				</option>
// 			))}
// 		</StyledSelect>
// 	);
// };

export default Select;
