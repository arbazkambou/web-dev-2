import { Button } from "@/components/ui/button";
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
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { AddCabinForm } from "./AddCabinForm";

export function CabinsTable({ cabins }: { cabins: Cabin[] }) {
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

  return (
    <div className="flex flex-col gap-8">
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
          {cabins.map((cabin, index) => (
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
                <div>
                  <Button
                    variant={"outline"}
                    onClick={() => deleteCabinApi(cabin.id)}
                  >
                    {isPending ? "Deleting..." : <Trash2Icon />}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AddCabinForm />
    </div>
  );
}
