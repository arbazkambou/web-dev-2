import { useQuery } from "@tanstack/react-query";
import Loader from "../../ui/Loader";
import MenuItem from "./MenuItem";
import { getMenu } from "../../services/apiRestaurant";

export default function Menu() {
  const {
    isLoading,
    isError,
    error,
    data: pizzaMenu,
  } = useQuery({
    queryFn: getMenu,
    queryKey: ["pizza-menu"],
  });

  if (isLoading) return <Loader />;
  if (isError) return <div>{error.message}</div>;

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {pizzaMenu.map((pizza, index) => (
        <MenuItem pizza={pizza} key={index} />
      ))}
    </ul>
  );
}
