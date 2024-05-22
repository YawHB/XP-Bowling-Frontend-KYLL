import React, { useState } from 'react';
import { postNewConsumable } from '../../api/PostNewConsumable';

interface Consumable {
    title: string;
    price: number;
}

export function CreateProduct() {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        //Titel and price are updated in the state when the input fields change. Price is converted to a number because it is a string by default.
        const newProduct: Consumable = { title, price: Number(price) };
        console.log(`Creating product with title: ${newProduct.title} and price: ${newProduct.price}`);
        //postNewConsumable creates a new consumable on the server
        postNewConsumable(newProduct);
        setTitle('');
        setPrice('');
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
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit" onClick={handleSubmit}>
                    Opret
                </button>{' '}
            </form>
        </>
    );
}
