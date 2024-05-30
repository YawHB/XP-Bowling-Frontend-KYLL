import React, { useState } from 'react';
import { postNewConsumable } from '../../api/sale/PostNewConsumableApi';

interface Consumable {
    title: string;
    price: number;
}

interface CreateProductProps {
    onProductCreated: () => void;
}

export function CreateProduct({ onProductCreated }: CreateProductProps) {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const newProduct: Consumable = { title, price: Number(price) };
        console.log(`Creating product with title: ${newProduct.title} and price: ${newProduct.price}`);
        await postNewConsumable(newProduct);
        setTitle('');
        setPrice('');
        onProductCreated();
    };

    return (
        <>
            <h3 className="text-lg font-semibold">Opret nyt produkt</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Titel:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <label>
                    Pris:
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                </label>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">
                    Opret
                </button>{' '}
            </form>
        </>
    );
}
