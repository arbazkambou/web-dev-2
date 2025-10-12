import { AddCabinInputs } from "@/lib/schemas/cabins.schemas";
import { supabase } from "@/lib/supabase";
import { EditCabinInputstype } from "@/types/cabins.types";

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

export async function editCabin(cabinInputs: EditCabinInputstype) {
  const { description, discount, maxCapacity, name, regularPrice } =
    cabinInputs;
  //1. Check if user wants to upload a new image
  let publicUrl;

  if (cabinInputs.image) {
    const oldImagePath = cabinInputs.imageUrl.split(
      "/storage/v1/object/public/images/"
    )[1];

    const { error: deleteError } = await supabase.storage
      .from("images")
      .remove([oldImagePath]);

    if (deleteError) {
      throw new Error(deleteError.message);
    }

    const newImagePath = `${Date.now()}-${cabinInputs.image.name}`.replaceAll(
      "/",
      ""
    );

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("images")
      .upload(newImagePath, cabinInputs.image);

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { data: publicUrlData } = supabase.storage
      .from("images")
      .getPublicUrl(uploadData.path);

    publicUrl = publicUrlData.publicUrl;
  }

  const { error: uploadError } = await supabase
    .from("cabins")
    .update({
      image: publicUrl ? publicUrl : cabinInputs.imageUrl,
      description,
      discount,
      maxCapacity,
      regularPrice,
      name,
    })
    .eq("id", cabinInputs.id);

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  return "Cabin has been updated!";
}
