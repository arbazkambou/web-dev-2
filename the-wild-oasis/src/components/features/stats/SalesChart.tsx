"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { RecentBookings } from "@/types/stats.types";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

export const description = "An area chart with axes";

// const chartData = [
//   { label: "Feb 01", extrasSales: 120, totalSales: 400 },
//   { label: "Feb 02", extrasSales: 150, totalSales: 420 },
//   { label: "Feb 03", extrasSales: 180, totalSales: 460 },
//   { label: "Feb 04", extrasSales: 200, totalSales: 480 },
//   { label: "Feb 05", extrasSales: 220, totalSales: 500 },
//   { label: "Feb 06", extrasSales: 250, totalSales: 530 },
//   { label: "Feb 07", extrasSales: 270, totalSales: 550 },
//   { label: "Feb 08", extrasSales: 260, totalSales: 540 },
//   { label: "Feb 09", extrasSales: 300, totalSales: 580 },
//   { label: "Feb 10", extrasSales: 320, totalSales: 600 },
//   { label: "Feb 11", extrasSales: 310, totalSales: 590 },
//   { label: "Feb 12", extrasSales: 330, totalSales: 610 },
//   { label: "Feb 13", extrasSales: 340, totalSales: 630 },
//   { label: "Feb 14", extrasSales: 350, totalSales: 640 },
//   { label: "Feb 15", extrasSales: 370, totalSales: 660 },
//   { label: "Feb 16", extrasSales: 360, totalSales: 650 },
//   { label: "Feb 17", extrasSales: 390, totalSales: 690 },
//   { label: "Feb 18", extrasSales: 400, totalSales: 710 },
//   { label: "Feb 19", extrasSales: 420, totalSales: 730 },
//   { label: "Feb 20", extrasSales: 450, totalSales: 760 },
// ];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function SalesChart({
  numOfDays,
  recentBookings,
}: {
  numOfDays: number;
  recentBookings: RecentBookings[];
}) {
  const dates = eachDayOfInterval({
    start: subDays(new Date(), numOfDays - 1),
    end: new Date(),
  });

  const salesData = dates.map((date) => ({
    label: format(date, "MMM dd"),
    totalSales: recentBookings
      .filter((booking) => isSameDay(booking.created_at, date))
      .reduce((acc, cur) => acc + cur.totalPrice, 0),
    extrasSales: recentBookings
      .filter((booking) => isSameDay(booking.created_at, date))
      .reduce((acc, cur) => acc + cur.extrasPrice, 0),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Last 7 Days Sales</CardTitle>
        <CardDescription>
          Showing total sales for the last 7 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[300px] w-full">
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <AreaChart
              accessibilityLayer
              data={salesData}
              margin={{
                left: -20,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickCount={3}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Area
                dataKey="extrasSales"
                type="natural"
                fill="var(--color-mobile)"
                fillOpacity={0.4}
                stroke="var(--color-mobile)"
                stackId="a"
              />
              <Area
                dataKey="totalSales"
                type="natural"
                fill="var(--color-desktop)"
                fillOpacity={0.4}
                stroke="var(--color-desktop)"
                stackId="a"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
