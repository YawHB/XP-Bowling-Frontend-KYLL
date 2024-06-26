import React, { useState } from 'react';
import { putConsumablePrice } from '../../api/sale/putConsumablePriceApi';
import SuccessMessage from '../toasters/SuccesToaster';

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
        SuccessMessage({ messageString: 'Prisen er opdateret!' });
    };

    return (
      <>
        <h3 className="text-lg font-semibold">Opdater produktpris</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center">
            <label className="w-28" htmlFor="product-select">
              Vælg produkt:
            </label>
            <select id="product-select" value={selectedConsumable?.id || ""} onChange={handleSelect} className="border border-gray-300 rounded-md p-2 flex-1">
              <option value=""></option>
              {consumables.map((consumable) => (
                <option key={consumable.id} value={consumable.id}>
                  {consumable.title}
                </option>
              ))}
            </select>
          </div>
          {selectedConsumable && (
            <div className="flex items-center">
              <label className="w-28" htmlFor="new-price">
                Ny pris:
              </label>
              <input id="new-price" type="number" min={0} value={newPrice} onChange={handlePriceChange} className="border border-gray-300 rounded-md p-2 flex-1" />
            </div>
          )}
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">
            Opdater
          </button>
        </form>
      </>

      // <>
      //     <h3 className="text-lg font-semibold">Opdater produktpris</h3>
      //     <form onSubmit={handleSubmit}>
      //         <label>
      //             Vælg produkt:
      //             {/* Dropdown menu dynamically created according to amount of products */}
      //             <select value={selectedConsumable?.id || ''} onChange={handleSelect}>
      //                 <option value=""></option>
      //                 {consumables.map((consumable) => (
      //                     <option key={consumable.id} value={consumable.id}>
      //                         {consumable.title}
      //                     </option>
      //                 ))}
      //             </select>
      //         </label>
      //         {/* //Logical AND operator && is used to render the input field only when selectedConsumable is truthy. */}
      //         {selectedConsumable && (
      //             <label>
      //                 Ny pris:
      //                 <input type="number" min={0} value={newPrice} onChange={handlePriceChange} />
      //             </label>
      //         )}
      //         <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">
      //             Opdater
      //         </button>
      //     </form>
      // </>
    );
}
