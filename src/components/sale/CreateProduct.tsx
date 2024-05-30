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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center">
            <label className="w-20" htmlFor="title">
              Titel:
            </label>
            <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border border-gray-300 rounded-md p-2 flex-1" />
          </div>
          <div className="flex items-center">
            <label className="w-20" htmlFor="price">
              Pris:
            </label>
            <input id="price" type="number" min={0} value={price} onChange={(e) => setPrice(e.target.value)} className="border border-gray-300 rounded-md p-2 flex-1" />
          </div>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">
            Opret
          </button>
        </form>
      </>

      // <>
      //     <h3 className="text-lg font-semibold">Opret nyt produkt</h3>
      //     <form onSubmit={handleSubmit}>
      //         <label>
      //             Titel:
      //             <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      //         </label>
      //         <label>
      //             Pris:
      //             <input type="number" min={0} value={price} onChange={(e) => setPrice(e.target.value)} />
      //         </label>
      //         <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">
      //             Opret
      //         </button>{' '}
      //     </form>
      // </>
    );
}
