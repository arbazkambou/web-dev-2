import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeUserName } from "../../redux/slices/userSlice";
import Button from "../../ui/Button";

function CreateUser() {
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
