import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddCabinForm } from "./AddCabinForm";
import { useState } from "react";

function AddCabinDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>Add Cabin</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Cabin</DialogTitle>
          <DialogDescription>Enter cabins detils here</DialogDescription>
        </DialogHeader>

        <AddCabinForm onOpenChange={setOpen} />
      </DialogContent>
    </Dialog>
  );
}

export default AddCabinDialog;
