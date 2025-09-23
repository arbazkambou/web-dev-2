import { useState } from "react";
import Button from "../../ui/Button";
import { useMutation } from "@tanstack/react-query";
import { createOrder, fetchUserLocation } from "../../services/apiRestaurant";
import { useSelector } from "react-redux";

function CreateOrder() {
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [priority, setPriority] = useState(false);
  const [position, setPosition] = useState("");

  const cart = useSelector((state) => state.cart.cart);

  const { mutate: fetchUserLocationApi, isPending } = useMutation({
    mutationFn: fetchUserLocation,
    mutationKey: ["fetch-location"],
    onSuccess: (data) => {
      console.log("data", data);
      setAddress(data.address);
      setPosition(
        `latitude ${data.position.latitude}, longitude ${data.position.longitude}`
      );
    },
    onError: (error) => console.log(error.message),
  });

  const { mutate: createOrderApi, isPending: isOrderCreating } = useMutation({
    mutationFn: createOrder,
    mutationKey: ["create-order"],
    onSuccess: (data) => {
      console.log("data", data);
    },
    onError: (error) => console.log(error.message),
  });

  function handleSubmit(e) {
    e.preventDefault();

    const order = {
      customer,
      phone,
      address,
      priority,
      position,
      cart,
    };

    createOrderApi(order);
  }
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40" htmlFor="customer">
            First Name
          </label>
          <input
            id="customer"
            className="input grow"
            type="text"
            name="customer"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40" htmlFor="phone">
            Phone number
          </label>
          <div className="grow">
            <input
              id="phone"
              className="input w-full"
              type="tel"
              name="phone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40" htmlFor="address">
            Address
          </label>
          <div className="relative grow">
            <input
              id="address"
              className="input w-full"
              type="text"
              name="address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <div className="absolute right-2 top-[5px]">
              <Button
                type="small"
                buttonType="button"
                onClick={fetchUserLocationApi}
              >
                {isPending ? "Geting..." : "Get Location"}
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            checked={priority}
            onChange={(e) => setPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to give your order priority?
          </label>
        </div>

        <div>
          <Button type="primary">Create order</Button>
        </div>
      </form>
    </div>
  );
}

export default CreateOrder;
