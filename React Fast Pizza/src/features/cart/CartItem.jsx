import DeleteItemButton from "./DeleteItemButton";
import IncDecButtons from "./IncDecButtons";

function CartItem({ item }) {
  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {item.quantity}× {item.name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">${item.totalPrice}</p>
        <IncDecButtons id={item.id} />
        <DeleteItemButton id={item.id} />
      </div>
    </li>
  );
}

export default CartItem;
