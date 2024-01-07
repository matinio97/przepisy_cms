import React from "react";
import Stat from "./Stat";
import {
	Area,
	AreaChart,
	Bar,
	CartesianGrid,
	ResponsiveContainer,
	XAxis,
	Tooltip,
	YAxis,
} from "recharts";

import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const countRecipesByType = (recipes) => {
	const categories = {
		meat: "Mięsne",
		soup: "Zupa",
		salad: "Sałatki",
		fish: "Ryby",
		dessert: "Desery",
		drink: "Napoje",
		other: "Inne",
	};

	return Object.entries(
		recipes
			.filter((recipe) => recipe.recipeStatus === "accepted")
			.reduce((acc, recipe) => {
				const type = recipe.type;
				acc[type] = (acc[type] || 0) + 1;
				return acc;
			}, {})
	).map(([type, count]) => ({ type: categories[type], Ilość: count }));
};

const BarChart = ({ recipes, colors }) => {
	console.log(recipes);
	console.log(colors);

	const barChartData = countRecipesByType(recipes);

	return (
		<>
			<Stat
				title="Przepisy dodane w ostatnim tygodniu"
				gridArea="recipesBarChart">
				<ResponsiveContainer height={250} width="100%">
					<BarChart data={barChartData}>
						<CartesianGrid strokeDasharray="3" />
						<XAxis
							dataKey="name"
							tick={{ fill: colors.text }}
							tickLine={{ strone: colors.text }}
						/>
						<YAxis
							tick={{ fill: colors.text }}
							tickLine={{ strone: colors.text }}
							width={20}
						/>
						<Tooltip
							contentStyle={{
								backgroundColor: colors.background,
							}}
						/>
						<Bar
							maxBarSize={40}
							dataKey="uv"
							// fill={colors.categoriesBarChart.fill}
							// stroke={colors.categoriesBarChart.stroke}
						/>
					</BarChart>
				</ResponsiveContainer>
			</Stat>
		</>
	);
};

export default BarChart;
