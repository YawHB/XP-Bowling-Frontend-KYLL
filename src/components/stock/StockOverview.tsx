import { useEffect, useState } from "react";

interface StockItem {
  name: string;
  amountInCentre: number;
  price: number;
}

export default function StockOverview() {
  const [stockItems, setStockItems] = useState<StockItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/stockitems")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setStockItems(data);
      });
  }, []);

  return (
    <div >
      <table >
        <thead>
          <tr>
            <th className="px-4 py-2">Vare</th>
            <th className="px-4 py-2">Antal i centeret</th>
            <th className="px-4 py-2">Pris pr. stk.</th>
          </tr>
        </thead>
        <tbody>
          {stockItems.map((stockItem) => (
            <tr key={stockItem.name}>
              <td className="border px-4 py-2">{stockItem.name}</td>
              <td className="border px-4 py-2">{stockItem.amountInCentre}</td>
              <td className="border px-4 py-2">{stockItem.price},00 Kr.</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
