import React, { useEffect, useState } from 'react';
import SuccessToaster from '../../components/toasters/SuccesToaster';
//import FailMessage from '../../components/toasters/ErrorToaster';
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
}

export default function StockOrder({ addReplacementOrder }: StockOrderProps) {
    const [title, setTitle] = useState<string>('');
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    const [stockItems, setStockItems] = useState<StockItem[]>([]);
    const [selectedStockItem, setSelectedStockItem] = useState<string>('');
    const [amountToOrder, setAmountToOrder] = useState<number>(1);

    useEffect(() => {
        fetch('http://localhost:8080/stockitems')
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

                setSelectedStockItem('');
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

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const replacementOrder: ReplacementOrder = {
            title,
            totalPrice,
            timeDate: new Date().toISOString(),
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
        setTitle('');
        setOrderItems([]);

        fetch('http://localhost:8080/replacementorders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
        })
            .then((res) => res.json())
            .then((data) => {
                SuccessToaster({ messageString: 'Bestillingen er modtaget!' });
                //FailMessage({ messageString: 'Der skete en fejl ved bestillingen' });
                console.log(data);

                addReplacementOrder(data.replacementOrder);

                console.log(data);
            });
    }

    return (
        <form onSubmit={handleSubmit} className="flex w-screen">
            <div className="mx-auto px-4 py-8">
                <h1 className="text-4xl self-center font-bold text-pink-300">Bestil Reservedele</h1>
                <div className="my-4">
                    <label htmlFor="title" className="block">
                        Titel på bestilling
                    </label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="totalPrice" className="block">
                        Total Pris
                    </label>
                    <input type="number" id="totalPrice" value={totalPrice} readOnly />
                </div>

                <div className="my-4">
                    <label htmlFor="stockItem">Reservedel</label>
                    <select id="stockItem" value={selectedStockItem} onChange={(e) => setSelectedStockItem(e.target.value)}>
                        <option value="">Vælg vare</option>
                        {stockItems.map((stockItem, idx) => (
                            <option key={idx} value={stockItem.name}>
                                {stockItem.name}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="amountToOrder">Antal</label>
                    <input type="number" id="amountToOrder" value={amountToOrder} onChange={(e) => setAmountToOrder(parseInt(e.target.value))} />
                    <button type="button" onClick={addOrderItem}>
                        Tilføj vare
                    </button>
                </div>

                {orderItems.map((orderItem, index) => (
                    <div key={index} className="my-4">
                        <p>
                            {orderItem.stockItem.name} - Antal: {orderItem.amountToOrder}
                        </p>
                        <button type="button" onClick={() => removeOrderItem(index)}>
                            Fjern vare
                        </button>
                    </div>
                ))}

                <button type="submit">Send bestilling</button>
            </div>
        </form>
    );
}
