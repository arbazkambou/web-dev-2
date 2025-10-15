import { getBookings } from "@/services/bookings.services";
import { useQuery } from "@tanstack/react-query";
import BookingsTable from "../features/bookings/BookingsTable";
import { useSearchParams } from "react-router-dom";
import Spinner from "../layout/Spinner";

function Bookings() {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status") || "all";

  const sortOption = searchParams.get("sortBy") || "startDate-asc";

  const [field, value] = sortOption.split("-");

  const sortBy = {
    field,
    value,
  };

  const filter = {
    field: "status",
    value: filterValue,
  };

  const {
    data: bookings,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner size="xl" />
      </div>
    );

  if (isSuccess) {
    return <BookingsTable bookings={bookings} />;
  }
}

export default Bookings;
