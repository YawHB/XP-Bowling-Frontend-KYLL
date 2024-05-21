import { useEffect, useState } from 'react';

interface Consumable {
    id: number;
    title: string;
    price: number;
}

export default function BarSale() {
    const [consumables, setConsumables] = useState<Consumable[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/consumables')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setConsumables(data);
            });
    }, []);
    return (
        <div className="w-screen">
            <div className="container mx-auto px-4 py-8">
                <h1 className="font-bold text-red-500">Lad os sælge øller møller!</h1>
                <table className="table-auto bg-blue-400">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Vare</th>
                            <th className="px-4 py-2">Pris</th>
                            <th className="px-4 py-2">Hej</th>
                            <th className="px-4 py-2">Antal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {consumables.map((consumable) => (
                            <tr key={consumable.id}>
                                <td>{consumable.title}</td>
                                <td>{consumable.price}</td>
                                <td> + - </td>
                                <td>0</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
