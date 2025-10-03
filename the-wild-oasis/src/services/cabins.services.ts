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

  if (error) {
    throw new Error(error.message);
  }

  return "Cabin has been deleted!";
}

export async function addCabin(cabin: AddCabinInputs) {
  // 1. Get image path
  const imagePath = `${Date.now()}-${cabin.image.name}`.replaceAll("/", "");

  // 2. Upload image to bucket
  const { data, error: uploadError } = await supabase.storage
    .from("images")
    .upload(imagePath, cabin.image);

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  // 3. Get public url of uploaded image
  const { data: publicUrlData } = supabase.storage
    .from("images")
    .getPublicUrl(data.path);

  // 4. Save the cabin in table with image url
  const { error } = await supabase
    .from("cabins")
    .insert([{ ...cabin, image: publicUrlData.publicUrl }])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return "Cabin has been uploaded.";
}
