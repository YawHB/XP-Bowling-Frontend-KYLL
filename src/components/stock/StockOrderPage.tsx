import StockOrder from './StockOrders';
import StockOrderOverview from './StockOrderOverview';
import { useEffect, useState } from 'react';

export interface replacementOrder {
    id: number;
    title: string;
    totalPrice: number;
    timeDate: string;
}

export default function StockOrderPage() {
    const [replacementOrders, setReplacementOrders] = useState<replacementOrder[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/replacementorders')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setReplacementOrders(data);
            });
    }, []);

    const addReplacementOrder = (newOrder: ReplacementOrder) => {
        setReplacementOrders((prevOrders) => [...prevOrders, newOrder]);
    };

    return (
        <div className="flex w-screen">
            <div className=" mx-auto px-4 py-8">
                <h1 className="text-4xl self-center font-bold text-pink-300">Se Bestillinger</h1>

                <div className="flex ">
                    <div>
                        <StockOrderOverview replacementOrders={replacementOrders} />
                    </div>
                    <div>
                        <StockOrder addReplacementOrder={addReplacementOrder} />
                    </div>
                </div>
            </div>
        </div>
    );
}
