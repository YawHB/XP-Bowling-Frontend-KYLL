import { useEffect, useState } from 'react';
import { CheckoutSummary } from './CheckOutSummary';
import { postCheckoutItems } from '../../api/sale/PostSaleConsumablesApi';
import { CreateProduct } from './CreateProduct';
import { UpdateProductPrice } from './UpdateProductPrice';

export interface Consumable {
    id: number;
    title: string;
    price: number;
    amount: number;
}

export default function BarSale() {
    const [consumables, setConsumables] = useState<Consumable[]>([]);
    const [checkoutItems, setCheckoutItems] = useState<Consumable[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/consumables')
            .then((response) => response.json())
            .then((data) => {
                // Add a quantity property to each consumable
                const consumablesWithQuantity = data.map((consumable: Consumable) => ({ ...consumable, amount: 0 }));
                setConsumables(consumablesWithQuantity);
            });
    }, []);

    //This useEffect hook updates the CheckoutSummary component. When a consumable's amount is greater than 0, it is added to the checkoutItems state.
    useEffect(() => {
        const itemsToCheckout = consumables.filter((consumable) => consumable.amount > 0);
        setCheckoutItems(itemsToCheckout);
    }, [consumables]);

    const handleAddOne = (id: number) => {
        setConsumables(
            consumables.map((consumable) => {
                //if the id matches the consumable we map over, make a shallow copy of the consumable and set the quantity value to quantity + 1
                if (consumable.id === id) {
                    return { ...consumable, amount: consumable.amount + 1 };
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
                    return { ...consumable, amount: Math.max(0, consumable.amount - 1) };
                } else {
                    return consumable;
                }
            })
        );
    };

    const handleCheckout = () => {
        postCheckoutItems(checkoutItems); //Makes a POST request to the server with the checkout items
        setCheckoutItems([]); // Clears the checkout summary list after the items have been posted
        setConsumables(consumables.map((consumable) => ({ ...consumable, amount: 0 }))); // Reset the amount of each consumable to 0
    };
    return (
        <div className="w-screen flex flex-wrap">
            <div className="w-full md:w-1/2 p-4">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="font-bold text-white-500">Barsalg</h1>
                    <table className="table-auto bg-blue-400">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Vare</th>
                                <th className="px-4 py-2">Pris</th>
                                <th className="px-4 py-2">Antal</th>
                                <th className="px-4 py-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {consumables.map((consumable) => (
                                <tr key={consumable.id}>
                                    <td>{consumable.title}</td>
                                    <td>{consumable.price}</td>
                                    <td>{consumable.amount}</td>
                                    <td>
                                        <button onClick={() => handleAddOne(consumable.id)}>+</button>
                                        <button onClick={() => handleSubtractOne(consumable.id)}>-</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit" onClick={handleCheckout}>
                        Bekræft
                    </button>
                    <CheckoutSummary items={checkoutItems} />
                </div>
                <div className="w-full md:w-1/2 p-4">
                    <div className="flex flex-col items-start px-4 py-8">
                        <CreateProduct />
                        <UpdateProductPrice />
                    </div>
                </div>
            </div>
        </div>
    );
}
