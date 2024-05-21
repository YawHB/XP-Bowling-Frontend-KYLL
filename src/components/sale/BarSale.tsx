import { useEffect, useState } from 'react';
import { CheckoutSummary } from './CheckOutSummary';

interface Consumable {
    id: number;
    title: string;
    price: number;
    quantity: number;
}

export default function BarSale() {
    const [consumables, setConsumables] = useState<Consumable[]>([]);
    const [checkoutItems, setCheckoutItems] = useState<Consumable[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/consumables')
            .then((response) => response.json())
            .then((data) => {
                // Add a quantity property to each consumable
                const consumablesWithQuantity = data.map((consumable: Consumable) => ({ ...consumable, quantity: 0 }));
                setConsumables(consumablesWithQuantity);
            });
    }, []);

    const handleAddOne = (id: number) => {
        setConsumables(
            consumables.map((consumable) => {
                //if the id matches the consumable we map over, make a shallow copy of the consumable and set the quantity value to quantity + 1
                if (consumable.id === id) {
                    return { ...consumable, quantity: consumable.quantity + 1 };
                } else {
                    //Else just return the consumable as it is
                    return consumable;
                }
            })
        );
    };

    const handleSubtractOne = (id: number) => {
        setConsumables(
            consumables.map((consumable) => {
                //Same logic as AddOne, but Math.max(0, consumable.quantity - 1) returns the larges number between 0 and the new quantity.

                if (consumable.id === id) {
                    return { ...consumable, quantity: Math.max(0, consumable.quantity - 1) };
                } else {
                    return consumable;
                }
            })
        );
    };

    const handleCheckout = () => {
        const itemsToCheckout = consumables.filter((consumable) => consumable.quantity > 0);
        setCheckoutItems(itemsToCheckout);
    };

    return (
        <div className="w-screen">
            <CheckoutSummary items={checkoutItems} />
            <div className="container mx-auto px-4 py-8">
                <h1 className="font-bold text-red-500">Lad os sælge øller møller!</h1>
                <table className="table-auto bg-blue-400">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Vare</th>
                            <th className="px-4 py-2">Pris</th>
                            <th className="px-4 py-2">Antal</th>
                            <th className="px-4 py-2">Hej</th>
                        </tr>
                    </thead>
                    <tbody>
                        {consumables.map((consumable) => (
                            <tr key={consumable.id}>
                                <td>{consumable.title}</td>
                                <td>{consumable.price}</td>
                                <td>{consumable.quantity}</td>
                                <td>
                                    <button onClick={() => handleAddOne(consumable.id)}>+</button>
                                    <button onClick={() => handleSubtractOne(consumable.id)}>-</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={handleCheckout}>Bekræft</button>
            </div>
        </div>
    );
}
