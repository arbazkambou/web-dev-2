import { LoginFormInputs } from "@/lib/schemas/auth.schemas";
import { supabase } from "@/lib/supabase";

export async function login({ email, password }: LoginFormInputs) {
  const { data: user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return { message: "Login successfully", data: { user } };
}

export async function getUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("Your are not logged in");
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    throw new Error(error?.message);
  }

  return true;
}
