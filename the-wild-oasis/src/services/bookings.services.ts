import { supabase } from "@/lib/supabase";

type Filter = { field: string; value: string };

export async function getBookings({
  filter,
  sortBy,
}: {
  filter: Filter;
  sortBy: Filter;
}) {
  let query = supabase.from("bookings").select("*, cabins(*), guests(*)");

  if (filter.value !== "all") {
    query = query.eq(filter.field, filter.value);
  }

  if (sortBy) {
    query = query.order(sortBy.field, { ascending: sortBy.value === "asc" });
  }

  const { data: bookings, error } = await query.order("cabinPrice", {
    ascending: true,
  });

  if (error) {
    throw new Error(error.message);
  }

  return bookings;
}
