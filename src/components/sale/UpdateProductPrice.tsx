import React, { useState } from 'react';

//import { getAllConsumables } from '../../api/sale/getAllConsumablesApi';
import { putConsumablePrice } from '../../api/sale/putConsumablePriceApi';

interface Consumable {
    id: number;
    title: string;
    price: number;
    amount: number;
}

//setConsumablesInBarSale is the useState function from BarSale.tsx that updates the list of consumables in the bar sale
// React.Dispatch is just a type that represents a function that updates the state of a React component
export function UpdateProductPrice({ consumables, setConsumablesInBarSale }: { consumables: Consumable[]; setConsumablesInBarSale: React.Dispatch<React.SetStateAction<Consumable[]>> }) {
    const [selectedConsumable, setSelectedConsumable] = useState<Consumable | null>(null);
    const [newPrice, setNewPrice] = useState('');

    // useEffect(() => {
    //     getAllConsumables().then((consumables: Consumable[] | undefined) => setConsumables(consumables || []));
    // }, []);

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = consumables.find((consumable) => consumable.id === Number(event.target.value));
        setSelectedConsumable(selected || null);
        setNewPrice(selected ? String(selected.price) : '');
    };

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPrice(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (selectedConsumable && newPrice) {
            putConsumablePrice(selectedConsumable.id, Number(newPrice)).then(() => {
                // After updating the price on the server, update the price in the local state
                setConsumablesInBarSale((prevConsumables) => prevConsumables.map((consumable) => (consumable.id === selectedConsumable.id ? { ...consumable, price: Number(newPrice) } : consumable)));
            });
        }
        setSelectedConsumable(null);
        setNewPrice('');
    };

    return (
        <>
            <h3 className="text-lg font-semibold">Opdater produktpris</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Vælg produkt:
                    {/* Dropdown menu dynamically created according to amount of products */}
                    <select value={selectedConsumable?.id || ''} onChange={handleSelect}>
                        <option value=""></option>
                        {consumables.map((consumable) => (
                            <option key={consumable.id} value={consumable.id}>
                                {consumable.title}
                            </option>
                        ))}
                    </select>
                </label>
                {/* //Logical AND operator && is used to render the input field only when selectedConsumable is truthy. */}
                {selectedConsumable && (
                    <label>
                        Ny pris:
                        <input type="number" value={newPrice} onChange={handlePriceChange} />
                    </label>
                )}
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">
                    Opdater
                </button>
            </form>
        </>
    );
}
