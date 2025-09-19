import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";
import Button from "../../ui/Button";
import IncDecButtons from "../cart/IncDecButtons";
import DeleteItemButton from "../cart/DeleteItemButton";

function MenuItem({ pizza }) {
  const { id, imageUrl, ingredients, name, soldOut, unitPrice } = pizza;
  const cartState = useSelector((store) => store.cart);

  const isInCart = cartState.cart.some((item) => item.id === id);
  const dispatch = useDispatch();

  function handleAddItem() {
    const newPizzaItem = {
      id,
      imageUrl,
      ingredients,
      name,
      soldOut,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice,
    };

    dispatch(addItem(newPizzaItem));
  }

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

          {!isInCart && (
            <Button type="small" onClick={handleAddItem}>
              Add to cart
            </Button>
          )}

          {isInCart && (
            <div className="flex items-center justify-center gap-2">
              <IncDecButtons id={id} />
              <DeleteItemButton id={id} />
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
