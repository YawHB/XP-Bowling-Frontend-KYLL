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
    <div>
      <table className=" w-full table-auto border-pink-300 my-4 ">
        <thead>
          <tr className=" border-pink-300">
            <th className="border px-4 py-2 sm:border-4 border-pink-300">Vare</th>
            <th className="border px-4 py-2 sm:border-4 border-pink-300">Antal i centeret</th>
            <th className="border px-4 py-2 sm:border-4 border-pink-300">Pris pr. stk.</th>
          </tr>
        </thead>
        <tbody className="">
          {stockItems.map((stockItem) => (
            <tr key={stockItem.name} className="odd:bg-gray-600/50 even:bg-gray-600 border-2 border-pink-300 px-4 py-2">
              <td className="border-2 border-pink-300 px-4 py-2">{stockItem.name}</td>
              <td className="border-2 border-pink-300 px-4 py-2">{stockItem.amountInCentre}</td>
              <td className="border-2 border-pink-300 px-4 py-2">{stockItem.price},00 Kr.</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // return (
  //   <div >
  //     <table >
  //       <thead>
  //         <tr>
  //           <th className="px-4 py-2">Vare</th>
  //           <th className="px-4 py-2">Antal i centeret</th>
  //           <th className="px-4 py-2">Pris pr. stk.</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {stockItems.map((stockItem) => (
  //           <tr key={stockItem.name}>
  //             <td className="border px-4 py-2">{stockItem.name}</td>
  //             <td className="border px-4 py-2">{stockItem.amountInCentre}</td>
  //             <td className="border px-4 py-2">{stockItem.price},00 Kr.</td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </div>
  // );
}
