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
import { editCabinFormSchema } from "@/lib/schemas/cabins.schemas";
import { editCabin } from "@/services/cabins.services";
import { Cabin } from "@/types/cabins.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export function EditCabinForm({ cabin }: { cabin: Cabin }) {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof editCabinFormSchema>>({
    resolver: zodResolver(editCabinFormSchema),
    defaultValues: {
      ...cabin,
      image: undefined,
    },
  });

  const { mutate: editCabinApi, isPending } = useMutation({
    mutationFn: editCabin,
    mutationKey: ["edit-cabin"],

    onSuccess: (message) => {
      toast.success(message);
      // onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof editCabinFormSchema>) {
    editCabinApi({ ...values, imageUrl: cabin.image, id: cabin.id });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cabin Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter name for cabin"
                  {...field}
                  disabled={isPending}
                />
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
                  disabled={isPending}
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
                  disabled={isPending}
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
                  disabled={isPending}
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
                <Input
                  placeholder="Enter cabin description"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, ref } }) => (
            <FormItem>
              <FormLabel>Cabin image</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  type="file"
                  accept="image/*"
                  ref={ref}
                  onChange={(e) => onChange(e.target.files?.[0])}
                  disabled={isPending}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Uploading..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
