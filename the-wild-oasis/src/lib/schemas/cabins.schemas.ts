import z from "zod";

export const addCabinFormSchema = z
  .object({
    name: z
      .string()
      .min(5, "Please enter valid name")
      .max(20, "Cabin name should be less than or equal to 20 characters"),
    maxCapacity: z
      .transform(Number)
      .pipe(
        z
          .number()
          .min(1, "Cabin capacity should greater or equal to 1")
          .max(20, "Cabin capacity should greater or equal to 20")
      ),
    regularPrice: z.transform(Number).pipe(z.number().min(10).max(10000)),
    discount: z.transform(Number).pipe(z.number()),
    description: z.string().min(5).max(20),
    image: z.string(),
  })
  .refine((data) => data.discount < data.regularPrice, {
    message: "Discount should be less than regular price",
    path: ["discount"],
  });

export type AddCabinInputs = z.infer<typeof addCabinFormSchema>;
