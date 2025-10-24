import { getToday } from "@/helpers/helpers";
import { supabase } from "@/lib/supabase";

type Filter = { field: string; value: string };

export async function getBookings({
  filter,
  sortBy,
  limit = 5,
  page = 1,
}: {
  filter: Filter;
  sortBy: Filter;
  limit?: number;
  page?: number;
}) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)", { count: "exact" })
    .range(from, to);

  if (filter.value !== "all") {
    query = query.eq(filter.field, filter.value);
  }

  if (sortBy) {
    query = query.order(sortBy.field, { ascending: sortBy.value === "asc" });
  }

  const {
    data: bookings,
    error,
    count,
  } = await query.order("cabinPrice", {
    ascending: true,
  });

  const total = count ?? 0;
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  if (error) {
    throw new Error(error.message);
  }

  return {
    data: {
      bookings,
    },
    pagination: {
      total,
      totalPages,
      hasNextPage,
      hasPreviousPage,
      page,
      limit,
    },
  };
}

export async function getBookingsAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function getStaysAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}
