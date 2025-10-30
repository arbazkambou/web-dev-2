import { useSearchParams } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useQuery } from "@tanstack/react-query";
import {
  getBookingsAfterDate,
  getStaysAfterDate,
} from "@/services/bookings.services";
import { subDays } from "date-fns";
import Stats from "../features/stats/Stats";
import Spinner from "../layout/Spinner";
import { getAllCabins } from "@/services/cabins.services";
import { SalesChart } from "../features/stats/SalesChart";
import { DurationChart } from "../features/stats/DurationChart";

function Homepage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filter = searchParams.get("last");

  const filterBy = filter ? filter : "7";

  const selectedDate = subDays(Date.now(), Number(filterBy)).toISOString();

  const {
    data: recentBookings,
    isLoading: isLoading1,
    isError: isError1,
    isSuccess: isSuccess1,
  } = useQuery({
    queryFn: () => getBookingsAfterDate(selectedDate),
    queryKey: ["recent-bookings", filterBy],
  });

  const {
    data: recentStays,
    isLoading: isLoading2,
    isError: isError2,
    isSuccess: isSuccess2,
  } = useQuery({
    queryFn: () => getStaysAfterDate(selectedDate),
    queryKey: ["recent-stays", filterBy],
  });

  const {
    data: cabins,
    isLoading: isLoading3,
    isSuccess: isSuccess3,
    isError: isError3,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getAllCabins,
  });

  const filters = [
    {
      label: "Last 7 Days",
      value: "7",
    },
    {
      label: "Last 30 Days",
      value: "30",
    },
    {
      label: "Last 90 Days",
      value: "90",
    },
  ];

  function handleFilterChange(value: string) {
    searchParams.set("last", value);
    setSearchParams(searchParams);
  }

  const isLoading = isLoading1 || isLoading2 || isLoading3;
  const isAllSuccess = isSuccess1 && isSuccess2 && isSuccess3;
  const isAnyError = isError1 || isError2 || isError3;

  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium">Dashboard</h1>
        <Tabs
          onValueChange={handleFilterChange}
          value={filterBy}
          defaultValue="7"
        >
          <TabsList>
            {filters.map((filter, index) => (
              <TabsTrigger key={index} value={filter.value}>
                {filter.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {isAllSuccess && !isAnyError && (
        <>
          <Stats
            recentBookings={recentBookings}
            recentStays={recentStays}
            numOfCabins={cabins.length}
            numOfDays={Number(filterBy)}
          />
          <div className="grid lg:grid-cols-2 gap-6">
            <DurationChart recentStays={recentStays} />
          </div>
          <div>
            <SalesChart
              numOfDays={Number(filterBy)}
              recentBookings={recentBookings}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Homepage;
