import { Cabin } from "./cabins.types";
import { Tables } from "./database.types";

export type Guest = Tables<"guests">;

export type Booking = {
  cabinId: number;
  cabinPrice: number;
  created_at: string;
  endDate: string;
  extrasPrice: number;
  guestId: number;
  hasBreakfast: boolean;
  id: number;
  isPaid: boolean;
  numGuests: number;
  numNights: number;
  observations: string;
  startDate: string;
  status: string;
  totalPrice: number;
  cabins: Cabin;
  guests: Guest;
};
