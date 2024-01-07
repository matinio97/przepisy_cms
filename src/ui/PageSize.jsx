import React, { useState } from "react";
import Select from "./Select";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { useSearchParams } from "react-router-dom";

const PageSize = ({ options, pageSizeKey, setPageSize }) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [value, setValue] = useLocalStorageState(
		options.at(0).value,
		pageSizeKey
	);

	const [selectedOption, setSelectedOption] = useState(value);

	const handleClick = (e) => {
		setSelectedOption(e.target.value);
		setValue(Number(e.target.value));
		setPageSize(e.target.value);
		searchParams.set("page", 1);
		setSearchParams(searchParams);
	};

	return (
		<Select value={selectedOption} onChange={handleClick}>
			{options.map(({ value }, index) => (
				<option key={index}>{value}</option>
			))}
		</Select>
	);
};

export default PageSize;
