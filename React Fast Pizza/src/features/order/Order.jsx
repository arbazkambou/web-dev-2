import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getOrder, updateOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import Error from "../../ui/Error";
import Loader from "../../ui/Loader";
import { calcMinutesLeft, formatDate } from "../../utils/helpers";
import OrderItem from "./OrderItem";

export default function Order() {
  const params = useParams();
  const queryClient = useQueryClient();

  const {
    data: orderDetail,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["order-detail"],
    queryFn: () => getOrder(params.orderId),
  });

  const { mutate: updateOrderApi, isPending } = useMutation({
    mutationFn: updateOrder,
    mutationKey: ["update-order"],

    onSuccess: () => {
      console.log("Success");
      queryClient.invalidateQueries({ queryKey: ["order-detail"] });
    },
    onError: (error) => console.log(error.message),
  });

  if (isLoading) return <Loader />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">
          Order #{orderDetail.id} status
        </h2>

        <div className="space-x-2">
          {orderDetail.priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}

          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {orderDetail.status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          Only {calcMinutesLeft(orderDetail.estimatedDelivery)} minutes left 😃
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery:{formatDate(orderDetail.estimatedDelivery)})
        </p>
      </div>

      <ul className="dive-stone-200 divide-y border-b border-t">
        {orderDetail.cart.map((order, index) => (
          <OrderItem key={index} order={order} />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: ${orderDetail.orderPrice}
        </p>
        <p className="text-sm font-medium text-stone-600">
          Price priority: ${orderDetail.priorityPrice}
        </p>
        <p className="font-bold">
          To pay on delivery: $
          {orderDetail.orderPrice + orderDetail.priorityPrice}
        </p>
      </div>

      {!orderDetail.priority && (
        <Button
          type="small"
          onClick={() =>
            updateOrderApi({
              id: params.orderId,
              updatedOrder: { priority: true },
            })
          }
        >
          {isPending ? "Updating..." : "Make this priority"}
        </Button>
      )}
    </div>
  );
}
