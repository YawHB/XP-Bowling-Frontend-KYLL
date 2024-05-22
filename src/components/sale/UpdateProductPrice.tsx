import React, { useEffect, useState } from 'react';
import { getAllConsumables } from '../../api/sale/getAllConsumables';
import { putConsumablePrice } from '../../api/sale/putConsumablePrice';

interface Consumable {
    id: number;
    title: string;
    price: number;
}

export function UpdateProductPrice() {
    const [consumables, setConsumables] = useState<Consumable[]>([]);
    const [selectedConsumable, setSelectedConsumable] = useState<Consumable | null>(null);
    const [newPrice, setNewPrice] = useState('');

    useEffect(() => {
        getAllConsumables().then((value: Consumable[] | undefined) => setConsumables(value || []));
    }, []);

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = consumables.find((c) => c.id === Number(event.target.value));
        setSelectedConsumable(selected || null);
        setNewPrice(selected ? String(selected.price) : '');
    };

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPrice(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (selectedConsumable && newPrice) {
            putConsumablePrice(selectedConsumable.id, Number(newPrice));
        }
    };

    return (
        <>
            <h3 className="text-lg font-semibold">Opdater produktpris</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Vælg produkt:
                    <select value={selectedConsumable?.id || ''} onChange={handleSelect}>
                        <option value="">Vælg et produkt</option>
                        {consumables.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.title}
                            </option>
                        ))}
                    </select>
                </label>
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
