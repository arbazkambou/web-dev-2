import { getAllCabins } from "@/services/cabins.services";
import { useQuery } from "@tanstack/react-query";
import { CabinsTable } from "../features/cabins/CabinsTable";

function Cabins() {
  const {
    data: cabins,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getAllCabins,
  });

  if (isLoading) return <div>Loading...</div>;

  console.log("cabins", cabins);

  if (isSuccess)
    return (
      <div>
        <CabinsTable cabins={cabins} />
      </div>
    );
}

export default Cabins;
