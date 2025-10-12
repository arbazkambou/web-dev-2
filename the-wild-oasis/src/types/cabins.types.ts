import { Tables } from "./database.types";

export type Cabin = Tables<"cabins">;

export type EditCabinInputstype = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image?: File;
  imageUrl: string;
  id: number;
};
