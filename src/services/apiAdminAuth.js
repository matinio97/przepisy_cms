import supabase, { supabaseUrl } from "./supabase";
import { adminAuthClient } from "./supabaseAdminAuth";

export async function getUserById(id) {
	const { data: user, error } = await adminAuthClient.getUserById(id);

	if (error) throw new Error(error.message);
	// const userName = user.user_metadata.userName;
	return user;
}

export async function getUserList({ page, pageSize }) {
	const { data, error } = await adminAuthClient.listUsers({
		page: page,
		perPage: pageSize,
	});

	if (error) throw new Error("Users could not be loaded");

	return data;
}

export async function deleteUser(id) {
	const {
		data: { users },
		error,
	} = await adminAuthClient.deleteUser(id);

	const { data: recipes, error: recipesError } = await supabase
		.from("recipes")
		.delete()
		.eq("author", id);

	if (error || recipesError) {
		throw new Error("Nie udało się usunąć użytkownika");
	}

	return { users, recipes };
}

export async function updateUserRole(id, newRole) {
	const { data: user, error } = await adminAuthClient.updateUserById(id, {
		user_metadata: { role: newRole },
	});
	if (error)
		throw new Error("Wystąpił problem podczas aktualizacji danych użytkownika");

	return user;
}

export async function updateUserByAdmin({ id, password, userName, avatar }) {
	let updateData;
	if (password) updateData = { password };
	if (userName) updateData = { user_metadata: { userName } };

	const { data, error } = await adminAuthClient.updateUserById(id, updateData);

	if (error) throw new Error(error.message);

	if (!avatar) return { data };

	const fileName = `avatar-${data.user.id}-${Math.random()}`;

	const { error: storageError } = await supabase.storage
		.from("avatars")
		.upload(fileName, avatar);

	if (storageError) throw new Error(storageError.message);

	const { data: updatedUser, error: error2 } =
		await adminAuthClient.updateUserById(id, {
			user_metadata: {
				avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
			},
		});
	if (error2) throw new Error(error2.message);

	return updatedUser;
}
