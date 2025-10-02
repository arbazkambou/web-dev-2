"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addCabinFormSchema } from "@/lib/schemas/cabins.schemas";
import { addCabin } from "@/services/cabins.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export function AddCabinForm() {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof addCabinFormSchema>>({
    resolver: zodResolver(addCabinFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutate: addCabinApi, isPending } = useMutation({
    mutationFn: addCabin,
    mutationKey: ["add-cabin"],

    onSuccess: () => {
      toast.success("Cabin has been added");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof addCabinFormSchema>) {
    addCabinApi(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cabin Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter name for cabin" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maxCapacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cabin Capacity</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter cabin capacity"
                  {...field}
                  type="number"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="regularPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cabin Price</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter cabin price"
                  {...field}
                  type="number"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="discount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cabin Discount</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter cabin discount"
                  {...field}
                  type="number"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cabin description</FormLabel>
              <FormControl>
                <Input placeholder="Enter cabin description" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cabin image</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
