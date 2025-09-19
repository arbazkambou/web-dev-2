import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { deleteItem } from "../../redux/slices/cartSlice";

function DeleteItemButton({ id }) {
  const dispatch = useDispatch();

  function handleDel() {
    dispatch(deleteItem(id));
  }
  return (
    <Button type="small" onClick={handleDel}>
      Delete Item
    </Button>
  );
}

export default DeleteItemButton;
