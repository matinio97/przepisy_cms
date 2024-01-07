import React from "react";
import Stat from "./Stat";
import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { useDarkMode } from "../../context/DarkModeContext";

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

const Charts = ({ recipes }) => {
	const { isDarkMode } = useDarkMode();

	const colors = isDarkMode
		? {
				categoriesBarChart: { stroke: "#33314b", fill: "#6461a0" },
				recipesLineChart: { stroke: "#22c55e", fill: "#22c55e" },
				text: "#e5e7eb",
				background: "#18212f",
		  }
		: {
				categoriesBarChart: { stroke: "#4f46e5", fill: "#7b92ed" },
				recipesLineChart: { stroke: "#16a34a", fill: "#dcfce7" },
				text: "#374151",
				background: "#fff",
		  };

	const lastWeek = eachDayOfInterval({
		start: subDays(new Date(), 6),
		end: new Date(),
	});

	const lineChartData = lastWeek.map((date) => {
		return {
			label: format(date, "dd.MM"),
			Ilość:
				recipes
					?.filter((recipe) => recipe.recipeStatus === "accepted")
					.filter((recipe) => isSameDay(date, new Date(recipe.created_at)))
					.reduce((acc) => acc + 1, 0) || 0,
		};
	});

	const barChartData = countRecipesByType(recipes);

	return (
		<>
			<Stat title="Przepisy dodane w ostatnim tygodniu" gridArea="RLC">
				<ResponsiveContainer height={250} width="100%">
					<AreaChart data={lineChartData}>
						<CartesianGrid strokeDasharray="3" />
						<Tooltip contentStyle={{ backgroundColor: colors.background }} />
						<XAxis
							dataKey="label"
							tick={{ fill: colors.text }}
							tickLine={{ strone: colors.text }}
						/>
						<YAxis
							tick={{ fill: colors.text }}
							tickLine={{ strone: colors.text }}
							width={20}
						/>
						<Area
							type="monotone"
							dataKey="Ilość"
							strokeWidth={2}
							stroke={colors.recipesLineChart.stroke}
							fill={colors.recipesLineChart.fill}
						/>
					</AreaChart>
				</ResponsiveContainer>
			</Stat>

			<Stat title="Przepisów w danej kategorii" gridArea="RBC">
				<ResponsiveContainer height={250} width="100%">
					<BarChart data={barChartData}>
						<CartesianGrid strokeDasharray="3" />
						<XAxis
							dataKey="type"
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
							dataKey="Ilość"
							fill={colors.categoriesBarChart.fill}
							stroke={colors.categoriesBarChart.stroke}
						/>
					</BarChart>
				</ResponsiveContainer>
			</Stat>
		</>
	);
};

export default Charts;
