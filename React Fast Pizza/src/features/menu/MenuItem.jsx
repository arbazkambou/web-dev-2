import Button from "../../ui/Button";
import DeleteItemButton from "../cart/DeleteItemButton";
import IncDecButtons from "../cart/IncDecButtons";

function MenuItem({ pizza }) {
  const { imageUrl, ingredients, name, soldOut, unitPrice } = pizza;
  return (
    <li className="flex gap-4 py-2">
      <img src={imageUrl} alt="Pizza Name" className="h-24" />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <p className="text-sm">{soldOut ? "Sold Out" : `$${unitPrice}`}</p>
          <Button type="small">Add to cart</Button>
          <div className="flex items-center justify-center gap-2">
            <IncDecButtons />
            <DeleteItemButton />
          </div>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
