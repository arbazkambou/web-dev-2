import { RecentBookings, RecentStays } from "@/types/stats.types";
import { StatCard } from "./StatCard";
import { Briefcase } from "lucide-react";

function Stats({
  recentBookings,
  recentStays,
  numOfDays,
  numOfCabins,
}: {
  recentBookings: RecentBookings[];
  recentStays: RecentStays[];
  numOfDays: number;
  numOfCabins: number;
}) {
  // 1) Num of bookings
  const totalBookings = recentBookings.length;

  // 2) Total Sales
  const totalSales = recentBookings.reduce(
    (totalSale, curBooking) => totalSale + curBooking.totalPrice,
    0
  );

  // 3) Total Check ins

  const confirmedStays = recentStays.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  const totalCheckIns = confirmedStays.length;

  // 3) Occupancy rate

  // (totalNightsStay/totalNumOfNight)*100

  const totalNumOfNights = numOfDays * numOfCabins;
  const totalNightsStay = confirmedStays.reduce(
    (acc, cur) => acc + cur.numNights,
    0
  );

  const occupancyRate = Math.round((totalNightsStay / totalNumOfNights) * 100);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <StatCard
        title="Bookings"
        value={totalBookings}
        icon={<Briefcase />}
        iconBg="bg-blue-600"
        iconColor="text-background"
      />
      <StatCard
        title="Sales"
        value={`$${totalSales}`}
        icon={<Briefcase />}
        iconBg="bg-blue-600"
        iconColor="text-background"
      />
      <StatCard
        title="Check Ins"
        value={`${totalCheckIns}`}
        icon={<Briefcase />}
        iconBg="bg-blue-600"
        iconColor="text-background"
      />
      <StatCard
        title="Occupancy Rate"
        value={`${occupancyRate}%`}
        icon={<Briefcase />}
        iconBg="bg-blue-600"
        iconColor="text-background"
      />
    </div>
  );
}

export default Stats;
