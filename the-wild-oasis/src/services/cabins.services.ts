import { AddCabinInputs } from "@/lib/schemas/cabins.schemas";
import { supabase } from "@/lib/supabase";

export async function getAllCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return cabins;
}

export async function deleteCabin(id: number) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
}

export async function addCabin(cabin: AddCabinInputs) {
  const { error } = await supabase.from("cabins").insert([cabin]).select();

  if (error) {
    throw new Error(error.message);
  }

  return true;
}
