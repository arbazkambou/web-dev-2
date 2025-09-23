// import EmptyCart from "./EmptyCart";

import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { clearCart } from "../../redux/slices/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import EmptyCart from "./EmptyCart";

function Cart() {
  const username = useSelector((state) => state.user.username);
  const cartState = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();
  const isCartEmpty = cartState.length === 0;
  const dispatch = useDispatch();

  function handleDelAll() {
    console.log("run");
    dispatch(clearCart());
    navigate("/menu");
  }
  return (
    <div className="px-4 py-3">
      <a href="/menu" className="text-blue-600">
        &larr; Back to menu
      </a>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      {isCartEmpty && <EmptyCart />}

      {!isCartEmpty && (
        <ul className="mt-3 divide-y divide-stone-200 border-b">
          {cartState.map((item, index) => (
            <CartItem item={item} key={index} />
          ))}
          {/* <CartItem /> */}
          {/* <CartItem /> */}
        </ul>
      )}

      <div className="mt-6 space-x-2">
        <Button type="primary">
          <Link to={"/order/new"}>Order pizzas</Link>
        </Button>

        <Button type="secondary" onClick={handleDelAll}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
