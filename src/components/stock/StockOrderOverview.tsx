import { useEffect, useState } from "react";

interface OrderItem {
  replacementOrder: replacementOrder;
  amountToOrder: number;
  stockItem: StockItem;
}

interface replacementOrder {
  id: number;
  title: string;
  totalPrice: number;
  timeDate: string;
}

interface StockItem {
  name: string;
  price: number;
}

export default function StockOrderOverview() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [replacementOrders, setReplacementOrders] = useState<replacementOrder[]>([]);
//   const [orderDate, setOrderDate] = useState<replacementOrder["timeDate"]>("");

  useEffect(() => {
    fetch("http://localhost:8080/orderitems")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOrderItems(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/replacementorders")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setReplacementOrders(data);
      });
  }, []);


  function formatDate(dateString: string) {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }
  

  return (
    <div className="overscroll-contain">
      {replacementOrders.map((replacementOrder) => (
        <div className="border-2 border-white p-2 my-4" key={replacementOrder.id}>
          <h2 className="font-bold text-lg">{replacementOrder.title}</h2>
          <h3 className="font-bold pb-1">Total Pris: {replacementOrder.totalPrice} kr.</h3>
          <h3 className="font-bold pb-1">Tidspunkt: {formatDate(replacementOrder.timeDate)}</h3>
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Vare</th>
                <th className="px-4 py-2">Antal</th>
                <th className="px-4 py-2">Pris</th>
              </tr>
            </thead>
            <tbody>
              {orderItems
                .filter((orderItem) => orderItem.replacementOrder.id === replacementOrder.id)
                .map((orderItem, index) => {
                  return (
                    <tr key={index}>
                      <td className="border px-4 py-2">{orderItem.stockItem.name}</td>
                      <td className="border px-4 py-2">{orderItem.amountToOrder}</td>
                      <td className="border px-4 py-2">{orderItem.stockItem.price}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
