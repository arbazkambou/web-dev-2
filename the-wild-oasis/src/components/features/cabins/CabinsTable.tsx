import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteCabin } from "@/services/cabins.services";
import { Cabin } from "@/types/cabins.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import AddCabinDialog from "./AddCabinDialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EditCabinForm } from "./EditCabinForm";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";

export function CabinsTable({ cabins }: { cabins: Cabin[] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const { mutate: deleteCabinApi, isPending } = useMutation({
    mutationKey: ["delete-cabin"],
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("Cabin has been deleted");

      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => console.log(err.message),
  });

  //filters

  const filterBy = searchParams.get("filter") || "all";

  let filteredCabins = cabins;

  if (filterBy === "all") {
    filteredCabins = cabins;
  }

  if (filterBy === "with-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  }

  if (filterBy === "no-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  }

  function handleFilterChange(value: string) {
    searchParams.set("filter", value);
    setSearchParams(searchParams);
  }

  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Cabins</CardTitle>
          <CardDescription>You can manage cabins here</CardDescription>
          <CardAction className="flex items-center gap-2">
            <Tabs
              defaultValue="all"
              onValueChange={(value) => handleFilterChange(value)}
            >
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="with-discount">With Discount</TabsTrigger>
                <TabsTrigger value="no-discount">No Discount</TabsTrigger>
              </TabsList>
            </Tabs>
            <AddCabinDialog />
          </CardAction>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead>Cabin</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCabins.map((cabin, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <div>
                      <img height={200} width={300} src={cabin.image} />
                    </div>
                  </TableCell>
                  <TableCell>{cabin.name}</TableCell>
                  <TableCell>{cabin.maxCapacity}</TableCell>
                  <TableCell>{cabin.regularPrice}</TableCell>
                  <TableCell>${cabin.discount}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={"outline"}
                        onClick={() => deleteCabinApi(cabin.id)}
                      >
                        {isPending ? "Deleting..." : <Trash2Icon />}
                      </Button>

                      <Dialog>
                        <DialogTrigger>
                          <Button variant={"outline"}>
                            <PencilIcon />
                          </Button>
                        </DialogTrigger>

                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Cabin</DialogTitle>
                            <DialogDescription>
                              You can edit cabin here
                            </DialogDescription>
                          </DialogHeader>

                          <EditCabinForm cabin={cabin} />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
