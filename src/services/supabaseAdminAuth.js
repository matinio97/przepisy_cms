import { createClient } from "@supabase/supabase-js";
import { supabaseUrl } from "./supabase";

const serviceRoleKey = import.meta.env.VITE_SERVICE_ROLE_KEY;

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
	auth: {
		autoRefreshToken: false,
		persistSession: false,
	},
});
// Access auth admin api
export const adminAuthClient = supabaseAdmin.auth.admin;
