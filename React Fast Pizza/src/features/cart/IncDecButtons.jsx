import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import {
  decreaseQuantity,
  increaseQuantity,
} from "../../redux/slices/cartSlice";

function IncDecButtons({ id }) {
  const cartState = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const pizza = cartState.cart.find((item) => item.id === id);

  function handleInc() {
    dispatch(increaseQuantity(id));
  }

  function handleDec() {
    dispatch(decreaseQuantity(id));
  }

  return (
    <div className="flex items-center gap-2">
      <Button type="small" onClick={handleDec}>
        -
      </Button>
      <p>{pizza.quantity}</p>
      <Button type="small" onClick={handleInc}>
        +
      </Button>
    </div>
  );
}

export default IncDecButtons;
