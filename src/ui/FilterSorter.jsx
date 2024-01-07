import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "./Button";
import { useSearchParams } from "react-router-dom";
import Select from "./Select";

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	padding: 0.5rem;
`;

const Span = styled.span`
	font-weight: 600;
	font-size: 1.1em;
`;

const Box = styled.div`
	display: flex;
	align-items: center;
	gap: 0.8rem;
	width: 100%;
	@media (min-width: 768px) {
		align-items: flex-start;
		justify-content: flex-start;
	}
`;

const Li = styled.li`
	list-style-type: none;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;

	@media (min-width: 768px) {
		justify-content: flex-start;
	}
`;

const Ul = styled.ul`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 10px;
	@media (min-width: 768px) {
		flex-direction: column;
	}
`;

const RadioButton = styled.input`
	width: 20px;
	height: 20px;
`;

const FilterSorter = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const { register, handleSubmit } = useForm({
		defaultValues: {
			filter: searchParams.get("filter") || "all",
			sortBy: searchParams.get("sortBy") || "latest",
		},
	});

	const onSubmit = (data) => {
		searchParams.set("sortBy", data.sortBy);
		searchParams.set("filter", data.filter);
		setSearchParams(searchParams);
	};

	return (
		// <form style={{ margin: "0 auto" }} onSubmit={handleSubmit(onSubmit)}>
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Box>
				<Span>Sortuj: </Span>
				<Select {...register("sortBy")}>
					<option value="latest">Najnowsze</option>
					<option value="fastest">Najszybsze</option>
				</Select>
			</Box>
			<Box>
				<Span>Filtruj:</Span>
				<Ul>
					<Li>
						<RadioButton
							type="radio"
							value="all"
							id="all"
							{...register("filter")}
						/>
						<label htmlFor="all">Wszystkie</label>
					</Li>
					<Li>
						<RadioButton
							type="radio"
							value="meat"
							id="meat"
							{...register("filter")}
						/>
						<label htmlFor="meat">Mięsne</label>
					</Li>

					<Li>
						<RadioButton
							type="radio"
							value="fish"
							id="fish"
							{...register("filter")}
						/>
						<label htmlFor="fish">Ryby</label>
					</Li>

					<Li>
						<RadioButton
							type="radio"
							value="soup"
							id="soup"
							{...register("filter")}
						/>
						<label htmlFor="soup">Zupy</label>
					</Li>

					<Li>
						<RadioButton
							type="radio"
							value="salad"
							id="salad"
							{...register("filter")}
						/>
						<label htmlFor="salad">Sałatki</label>
					</Li>

					<Li>
						<RadioButton
							type="radio"
							value="dessert"
							id="dessert"
							{...register("filter")}
						/>
						<label htmlFor="dessert">Desery</label>
					</Li>
					<Li>
						<RadioButton
							type="radio"
							value="drink"
							id="drink"
							{...register("filter")}
						/>
						<label htmlFor="drink">Napoje</label>
					</Li>
					<Li>
						<RadioButton
							type="radio"
							value="other"
							id="other"
							{...register("filter")}
						/>
						<label htmlFor="other">Inne</label>
					</Li>
				</Ul>
			</Box>
			<Button type="submit" $variation="secondary">
				Zatwierdź
			</Button>
		</Form>
	);
};

export default FilterSorter;
