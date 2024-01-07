import supabase, { supabaseUrl } from "./supabase";

export async function getRecipes({
	filters,
	sortBy,
	page,
	pageSize,
	recipeQuery,
}) {
	let query = supabase.from("recipes").select("*", { count: "exact" });

	//search by query
	if (recipeQuery) {
		query = query.ilike("recipeName", `%${recipeQuery}%`);
	}

	//sort
	if (sortBy === "latest")
		query = query.order("created_at", {
			ascending: false,
		});
	if (sortBy === "fastest")
		query = query.order("timeToPrepare", {
			ascending: true,
		});

	//filter
	if (filters) {
		filters.forEach((filter) => {
			if (filter)
				query = query[filter.method || "eq"](filter.field, filter.value);
		});
	}

	//pagination
	if (page && pageSize) {
		const from = (page - 1) * pageSize;
		const to = from + pageSize - 1;
		query = query.range(from, to);
	}

	const { data, error, count } = await query;

	if (error) {
		throw new Error("Recipes could not be loaded");
	}

	return { data, count };
}

export async function getRecipe(id) {
	const { data, error } = await supabase
		.from("recipes")
		.select("*")
		.eq("id", id)
		.single();

	if (error) {
		console.error(error);
		throw new Error("Recipe not found");
	}

	return data;
}

export async function getUserRecipes({ user, page, pageSize }) {
	let query = supabase
		.from("recipes")
		.select("*", { count: "exact" })
		.eq("author", user);

	// const { data: recipes, error } = await supabase
	// 	.from("recipes")
	// 	.select("*", { count: "exact" })
	// 	.eq("author", user);

	if (page) {
		const from = (page - 1) * pageSize;
		const to = from + pageSize - 1;
		query = query.range(from, to);
	}

	const { data, error, count } = await query;

	if (error) {
		console.error(error);
		throw new Error("Recipes not found");
	}

	return { data, count };
}

export async function changeRecipeStatus(recipe, id, target) {
	let query = supabase.from("recipes");

	//target true zaakceptuj
	if (target) {
		query = query.update([{ ...recipe, recipeStatus: "accepted" }]);
	} else {
		//target false odrzuć
		query = query.update([{ ...recipe, recipeStatus: "rejected" }]);
	}

	const { data, error } = await query.eq("id", id).select().single();

	if (error)
		throw new Error("An error occurred while changing the recipe status");

	return data;
}

export async function createUpdateRecipe(newRecipe, id) {
	const hasImagePath = newRecipe.imageUrl?.startsWith?.(supabaseUrl);
	const imageName = `${Math.random()}-${newRecipe.imageUrl.name}`.replace(
		"/",
		""
	);
	const imagePath = hasImagePath
		? newRecipe.imageUrl
		: `${supabaseUrl}/storage/v1/object/public/recipeImages/${imageName}`;

	let query = supabase.from("recipes");

	if (!id)
		query = query.insert([
			{ ...newRecipe, imageUrl: imagePath, recipeStatus: "verifying" },
		]);

	if (id) {
		query = query
			.update({ ...newRecipe, imageUrl: imagePath, recipeStatus: "verifying" })
			.eq("id", id)
			.select();
	}

	const { data, error } = await query.select().single();

	if (error) {
		console.log(error);
		throw new Error("The recipe could not be updated");
	}

	if (hasImagePath) return data;

	const { error: storageError } = await supabase.storage
		.from("recipeImages")
		.upload(imageName, newRecipe.imageUrl);

	if (storageError) {
		await supabase.from("recipes").delete().eq("id", data.id);
		throw new Error("The photo could not be updated. The recipe was not added");
	}

	return data;
}

export async function deleteRecipe(id) {
	const { data, error } = await supabase.from("recipes").delete().eq("id", id);

	if (error) {
		throw new Error("The recipe could not be deleted");
	}
	return data;
}

export async function createIngredient(name) {
	const { data, error } = await supabase
		.from("ingredients")
		.insert([{ name: name }])
		.select();

	if (error) {
		throw new Error("This ingredient could not be added");
	}
	return data;
}

export async function getIngredients({
	filter,
	page,
	pageSize,
	ingredientQuery,
}) {
	let query = supabase.from("ingredients").select("*", { count: "exact" });

	//search by query
	if (ingredientQuery) {
		query = query.ilike("name", `%${ingredientQuery}%`);
	}

	//filter
	if (filter) {
		query = query[filter.method || "eq"](filter.field, filter.value);
	}

	if (page && pageSize) {
		const from = (page - 1) * pageSize;
		const to = from + pageSize - 1;
		query = query.range(from, to);
	}

	const { data, error, count } = await query.order("name", {
		ascending: true,
	});

	if (error) {
		throw new Error("There was an error with loading ingredients");
	}

	return { data, count };
}

export async function getIngredientById(id) {
	const { data, error } = await supabase
		.from("ingredients")
		.select("name")
		.eq("id", id)
		.single();

	if (error) throw new Error("There was an error with loading ingredient");

	return data.name;
}

export async function getAcceptedRecipes() {
	const { data, error, count } = await supabase
		.from("recipes")
		.select("*", { count: "exact" })
		.eq("recipeStatus", "accepted");

	if (error) {
		throw new Error("There was an error with loading recipes");
	}

	return { data, count };
}

export async function getVerificationRecipes() {
	const { data, error, count } = await supabase
		.from("recipes")
		.select("*", { count: "exact" })
		.eq("recipeStatus", "verifying");

	if (error) {
		throw new Error("There was an error with loading recipes");
	}

	return { data, count };
}

export async function getAcceptedIngredients() {
	const { data, error, count } = await supabase
		.from("ingredients")
		.select("*", { count: "exact" })
		.eq("isAccepted", true);

	if (error) {
		throw new Error("There was an error with loading ingredients");
	}

	return { data, count };
}

export async function getVerificationIngredients() {
	const { data, error, count } = await supabase
		.from("ingredients")
		.select("*", { count: "exact" })
		.eq("isAccepted", false);

	if (error) {
		throw new Error("There was an error with loading ingredients");
	}

	return { data, count };
}

export async function getIngredientsByQuery(query) {
	const { data: ingredients, error } = await supabase
		.from("ingredients")
		.select("*")
		.eq("isAccepted", true)
		.ilike("name", `%${query}%`);

	if (error) {
		throw new Error("Such ingredients could not be read");
	}

	return ingredients;
}

export async function updateIngredientStatus(id) {
	const { data, error } = await supabase
		.from("ingredients")
		.update({ isAccepted: true })
		.eq("id", id)
		.select();

	if (error) {
		throw new Error("Ingredient could not be updated");
	}

	return data;
}
export async function deleteIngredient(id) {
	const { data, error } = await supabase
		.from("ingredients")
		.delete()
		.eq("id", id);
	if (error) {
		throw new Error("Ingredient could not be deleted");
	}

	return data;
}

export async function getRecipeComments(recipeId) {
	const {
		data: comments,
		error,
		count,
	} = await supabase
		.from("comments")
		.select("*", { count: "exact" })
		.eq("recipeId", recipeId)
		.order("created_at", {
			ascending: false,
		});

	if (error) {
		throw new Error("Comments could not be loaded");
	}
	return { comments, count };
}

export async function createComment(commentData) {
	const isImage = commentData.imageUrl;
	const imageName = `${Math.random()}-${commentData.imageUrl.name}`.replace(
		"/",
		""
	);
	const imagePath = `${supabaseUrl}/storage/v1/object/public/commentsImages/${imageName}`;

	let newData = [{ ...commentData }];

	if (isImage) {
		const { error: storageError } = await supabase.storage
			.from("commentsImages")
			.upload(imageName, commentData.imageUrl);

		if (storageError) {
			throw new Error(
				"The photo could not be updated. The recipe was not added"
			);
		}
		newData = [{ ...commentData, imageUrl: imagePath }];
	}

	const { data, error } = await supabase
		.from("comments")
		.insert(newData)
		.select()
		.single();

	if (error) throw new Error("Cannot add new comment");

	return data;
}

export async function deleteComment(id) {
	const { data, error } = await supabase.from("comments").delete().eq("id", id);

	if (error) throw new Error("Cannot delete comment");

	return data;
}
