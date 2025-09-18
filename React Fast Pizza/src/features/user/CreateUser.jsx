import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { useState } from "react";
import { storeUserName } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const username = useSelector((state) => state.user);
  console.log("username", username);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const navigate = useNavigate();

  function handleStoreName(e) {
    e.preventDefault();
    dispatch(storeUserName(name));
    navigate("/menu");
  }

  return (
    <form onSubmit={handleStoreName}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        className="input mb-8 w-72"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {name.length > 3 && (
        <div>
          <Button type="primary" onClick={handleStoreName}>
            Start ordering
          </Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
