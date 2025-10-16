import MyPagination, { Pagination } from "@/components/layout/MyPagination";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Booking } from "@/types/bookings.types";

import { useSearchParams } from "react-router-dom";

function BookingsTable({
  bookings,
  pagination,
}: {
  bookings: Booking[];
  pagination: Pagination;
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterOption = searchParams.get("status") || "all";

  const sortBy = searchParams.get("sortBy") || "startDate-asc";

  console.log("sort", sortBy);

  const filtersOptions = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Checked In",
      value: "checked-in",
    },
    {
      label: "Checked Out",
      value: "checked-out",
    },
    {
      label: "Unconfirmed",
      value: "unconfirmed",
    },
  ];

  const sortOptions = [
    {
      label: "Amount (High First)",
      value: "cabinPrice-desc",
    },
    {
      label: "Amount (Low First)",
      value: "cabinPrice-asc",
    },
    {
      label: "By Date (Earlier First)",
      value: "startDate-asc",
    },
    {
      label: "By Date (Recent First)",
      value: "startDate-desc",
    },
  ];

  function handleFilterChange(value: string) {
    searchParams.set("status", value);
    setSearchParams(searchParams);
  }

  function handleSortChange(value: string) {
    searchParams.set("sortBy", value);
    setSearchParams(searchParams);
  }
  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Bookings</CardTitle>
          <CardDescription>You can manage Bookings here</CardDescription>
          <CardAction className="flex items-center gap-2">
            <Tabs
              defaultValue={filtersOptions[0].value}
              onValueChange={(value) => handleFilterChange(value)}
              value={filterOption}
            >
              <TabsList>
                {filtersOptions.map((filter, index) => (
                  <TabsTrigger key={index} value={filter.value}>
                    {filter.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <Select
              onValueChange={(value) => handleSortChange(value)}
              // defaultValue={sortOptions[2].value}
              value={sortBy}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue>Sort By</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((sort, index) => (
                  <SelectItem key={index} value={sort.value}>
                    {sort.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Cabin Name</TableHead>
                <TableHead>Guest Name</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {booking.cabins.name}
                  </TableCell>
                  <TableCell>{booking.guests.fullName}</TableCell>
                  <TableCell>{booking.created_at}</TableCell>
                  <TableCell>{booking.status}</TableCell>
                  <TableCell>${booking.totalPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <MyPagination pagination={pagination} />
        </CardFooter>
      </Card>
    </div>
  );
}

export default BookingsTable;
