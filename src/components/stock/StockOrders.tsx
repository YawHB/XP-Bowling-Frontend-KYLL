import { useEffect, useState } from "react";
import SuccessToaster from "../../components/toasters/SuccesToaster";
import FailMessage from "../../components/toasters/ErrorToaster";
interface StockItem {
  name: string;
  price?: number;
}

interface OrderItem {
  amountToOrder: number;
  stockItem: StockItem;
}

interface ReplacementOrder {
  title: string;
  totalPrice: number;
  timeDate: string;
}

interface Order {
  replacementOrder: ReplacementOrder;
  orderItems: OrderItem[];
}

interface StockOrderProps {
  addReplacementOrder: (newOrder: ReplacementOrder) => void;
  orderItems: OrderItem[];
}

export default function StockOrder({ addReplacementOrder }: StockOrderProps) {
  const [title, setTitle] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [selectedStockItem, setSelectedStockItem] = useState<string>("");
  const [amountToOrder, setAmountToOrder] = useState<number>(1);

  useEffect(() => {
    fetch("http://localhost:8080/stockitems")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setStockItems(data);
      });
  }, []);

  useEffect(() => {
    setTotalPrice(calculateTotalPrice(orderItems));
  }, [orderItems]);

  function addOrderItem() {
    if (selectedStockItem) {
      const stockItem = stockItems.find((item) => item.name === selectedStockItem);
      if (stockItem) {
        const newOrderItem: OrderItem = {
          amountToOrder,
          stockItem,
        };
        setOrderItems([...orderItems, newOrderItem]);

        setSelectedStockItem("");
        setAmountToOrder(1);
      }
    }
  }

  function removeOrderItem(index: number) {
    const updatedOrderItems = [...orderItems];
    updatedOrderItems.splice(index, 1);
    setOrderItems(updatedOrderItems);
  }

  function calculateTotalPrice(orderItems: OrderItem[]) {
    return orderItems.reduce((total, item) => {
      const itemPrice = item.stockItem.price || 0;
      return total + itemPrice * item.amountToOrder;
    }, 0);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Set the time to Danish time
    const now = new Date();
    const offsetInMs = now.getTimezoneOffset() * 60 * 1000;
    const danishTime = new Date(now.getTime() - offsetInMs);

    // Sets to ISO and removes milliseconds
    const formattedDate = danishTime.toISOString().slice(0, 19);

    const replacementOrder: ReplacementOrder = {
      title,
      totalPrice,
      timeDate: formattedDate,
    };

    const parsedOrderItems = orderItems.map((orderItem) => ({
      amountToOrder: orderItem.amountToOrder,
      stockItem: { name: orderItem.stockItem.name },
    }));

    const order: Order = {
      replacementOrder,
      orderItems: parsedOrderItems,
    };

    console.log(order);
    setTotalPrice(0);
    setTitle("");
    setOrderItems([]);

    try {
      const response = await fetch("http://localhost:8080/replacementorders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      SuccessToaster({ messageString: "Bestillingen er modtaget!" });
      console.log("replacement order data after post                     :", data);

      addReplacementOrder(data.replacementOrder);

      console.log(data);
    } catch (error) {
      console.error("Error:", error);
      FailMessage({ messageString: "Der skete en fejl ved bestillingen" });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="mx-auto px-4">
        <h1 className="text-4xl self-center font-bold text-pink-300">Bestil Reservedele</h1>
        <div className="my-4">
          <label htmlFor="title" className="block">
            Titel på bestilling
          </label>
          <input className="mx-0" type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="totalPrice" className="block font-bold">
            Total Pris: {totalPrice} kr.
          </label>
        </div>

        <div className="my-4 my-4 flex items-center">
          <label htmlFor="stockItem" className="mr-2">
            Reservedel
          </label>
          <select id="stockItem" value={selectedStockItem} onChange={(e) => setSelectedStockItem(e.target.value)} className="mr-4">
            <option value="">Vælg vare</option>
            {stockItems.map((stockItem, idx) => (
              <option key={idx} value={stockItem.name}>
                {stockItem.name}
              </option>
            ))}
          </select>

          <label htmlFor="amountToOrder" className="mr-2">
            Antal
          </label>
          <input type="number" id="amountToOrder" value={amountToOrder} onChange={(e) => setAmountToOrder(parseInt(e.target.value))} className="mr-4" />

          <button className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" type="button" onClick={addOrderItem}>
            Tilføj
          </button>
        </div>

     

        <ol className=" my-4">
          {orderItems.map((orderItem, index) => (
            <li key={index} className="my-4 flex items-center">
              <button className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded" type="button" onClick={() => removeOrderItem(index)}>
                Fjern
              </button>
              <p className="mx-4 text-lg">
                {orderItem.stockItem.name} - Antal: {orderItem.amountToOrder}
              </p>
            </li>
          ))}
        </ol>


        <button className="bg-green-400 hover:bg-green-600 mt-8 w-44 " type="submit">
          Send bestilling
        </button>
      </div>
    </form>
  );
}
