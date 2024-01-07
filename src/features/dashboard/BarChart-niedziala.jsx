// import React from "react";
// import Stat from "./Stat";
// import {
// 	Bar,
// 	CartesianGrid,
// 	ResponsiveContainer,
// 	Tooltip,
// 	XAxis,
// 	YAxis,
// } from "recharts";
// import Spinner from "../../ui/Spinner";

// const data = [
// 	{
// 		name: "Page A",
// 		uv: 4000,
// 	},
// 	{
// 		name: "Page B",
// 		uv: 3000,
// 	},
// 	{
// 		name: "Page C",
// 		uv: 2000,
// 	},
// 	{
// 		name: "Page D",
// 		uv: 2780,
// 	},
// 	{
// 		name: "Page E",
// 		uv: 1890,
// 	},
// 	{
// 		name: "Page F",
// 		uv: 2390,
// 	},
// 	{
// 		name: "Page G",
// 		uv: 3490,
// 	},
// ];

// const countRecipesByType = (recipes) => {
// 	const categories = {
// 		meat: "Mięsne",
// 		soup: "Zupa",
// 		salad: "Sałatki",
// 		fish: "Ryby",
// 		dessert: "Desery",
// 		drink: "Napoje",
// 		other: "Inne",
// 	};

// 	return Object.entries(
// 		recipes
// 			.filter((recipe) => recipe.recipeStatus === "accepted")
// 			.reduce((acc, recipe) => {
// 				const type = recipe.type;
// 				acc[type] = (acc[type] || 0) + 1;
// 				return acc;
// 			}, {})
// 	).map(([type, count]) => ({ type: categories[type], Ilość: count }));
// };

// const BarChart = ({ recipes, colors }) => {
// 	// if (!recipes) return <Spinner />;

// 	// const barChartData = countRecipesByType(recipes);

// 	return (
// 		<>
// 			<Stat title="Przepisów w danej kategorii" gridArea="recipesBarChart">
// 				<ResponsiveContainer height={250} width="100%">
// 					<BarChart data={data}>
// 						<CartesianGrid strokeDasharray="3" />
// 						<XAxis
// 							dataKey="name"
// 							tick={{ fill: colors.text }}
// 							tickLine={{ strone: colors.text }}
// 						/>
// 						<YAxis
// 							tick={{ fill: colors.text }}
// 							tickLine={{ strone: colors.text }}
// 							width={20}
// 						/>
// 						<Tooltip
// 							contentStyle={{
// 								backgroundColor: colors.background,
// 							}}
// 						/>
// 						<Bar
// 							maxBarSize={40}
// 							dataKey="uv"
// 							// fill={colors.categoriesBarChart.fill}
// 							// stroke={colors.categoriesBarChart.stroke}
// 						/>
// 					</BarChart>
// 				</ResponsiveContainer>
// 			</Stat>
// 		</>
// 	);
// };

// export default BarChart;
