function OrderItem({ order }) {
  return (
    <li className="py-3">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span className="font-bold">{order.quantity}×</span> {order.name}
        </p>
        <p className="font-bold">${order.totalPrice}</p>
      </div>
    </li>
  );
}

export default OrderItem;
