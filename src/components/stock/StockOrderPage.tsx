import StockOrder from './StockOrders';
import StockOrderOverview from './StockOrderOverview';
import { useEffect, useState } from 'react';
import { StockItem } from './StockOrderOverview';

export interface ReplacementOrder {
    id?: number;
    title: string;
    totalPrice: number;
    timeDate: string;
}

export interface OrderItem {
    replacementOrder: ReplacementOrder;
    amountToOrder: number;
    stockItem: StockItem;
}

export default function StockOrderPage() {
    const [replacementOrders, setReplacementOrders] = useState<ReplacementOrder[]>([]);
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    const [orderUpdate, setOrderUpdate] = useState(0); // Tilføj denne linje

    useEffect(() => {
        fetch('http://localhost:8080/orderitems')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setOrderItems(data);
            });
    }, [orderUpdate]);

    useEffect(() => {
        fetch('http://localhost:8080/replacementorders')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setReplacementOrders(data);
            });
    }, [orderUpdate]);

    const addReplacementOrder = (newOrder: ReplacementOrder) => {
        setReplacementOrders((prevOrders) => [...prevOrders, newOrder]);
        setOrderUpdate(orderUpdate + 1);
    };

    return (
      <div className="flex w-screen ">
        <div className=" px-4 py-8">
          <div className="flex ">
            <div className=''>
              <StockOrderOverview replacementOrders={replacementOrders} orderItems={orderItems} />
            </div>
            <div className='ml-10'>
              <StockOrder addReplacementOrder={addReplacementOrder} orderItems={orderItems} />
            </div>
          </div>
        </div>
      </div>
    );
}
