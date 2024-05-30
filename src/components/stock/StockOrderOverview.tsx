import { format, parseISO } from "date-fns";
import { OrderItem } from "./StockOrderPage";
import { ReplacementOrder } from "./StockOrderPage";

export interface StockItem {
  name: string;
  price: number;
}

interface StockOrderOverviewProps {
  replacementOrders: ReplacementOrder[];
  orderItems: OrderItem[];
}

export default function StockOrderOverview({ replacementOrders, orderItems }: StockOrderOverviewProps) {
  function formatDate(dateString: string) {
    const date = parseISO(dateString);
    return format(date, "dd-MM-yyyy HH:mm"); 
  }

  
  const sortedReplacementOrders = [...replacementOrders].sort((a, b) => new Date(b.timeDate).getTime() - new Date(a.timeDate).getTime());

  return (
    <div className="">
      <h1 className=" text-4xl self-center font-bold text-pink-300">Se Bestillinger</h1>
      {sortedReplacementOrders.map((replacementOrder) => (
        <div className="border-2 border-white p-2 my-4" key={replacementOrder.id}>
          <h2 className="font-bold text-lg">{replacementOrder.title}</h2>
          <h3 className="font-bold pb-1">Total Pris: {replacementOrder.totalPrice} kr.</h3>
          <h3 className="font-bold pb-1">Tidspunkt: {formatDate(replacementOrder.timeDate)}</h3>
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Vare</th>
                <th className="px-4 py-2">Antal</th>
                <th className="px-4 py-2">Pris</th>
              </tr>
            </thead>
            <tbody>
              {orderItems
                .filter((orderItem) => orderItem.replacementOrder.id === replacementOrder.id)
                .map((orderItem, index) => {
                  return (
                    <tr key={orderItem.stockItem.name}>
                      <td className="border px-4 py-2">{orderItem.stockItem.name}</td>
                      <td className="border px-4 py-2">{orderItem.amountToOrder}</td>
                      <td className="border px-4 py-2">{orderItem.stockItem.price}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}







// import { OrderItem } from "./StockOrderPage";
// import { ReplacementOrder } from "./StockOrderPage";

// export interface StockItem {
//   name: string;
//   price: number;
// }

// interface StockOrderOverviewProps {
//   replacementOrders: ReplacementOrder[];
//   orderItems: OrderItem[];
// }

// export default function StockOrderOverview({ replacementOrders, orderItems }: StockOrderOverviewProps) {
//   function formatDate(dateString: string) {
//     const date = new Date(dateString);

//     date.setHours(date.getHours() + 2);
//     const day = date.getDate().toString().padStart(2, "0");
//     const month = (date.getMonth() + 1).toString().padStart(2, "0");
//     const year = date.getFullYear();

//     const hours = date.getHours().toString().padStart(2, "0");
//     const minutes = date.getMinutes().toString().padStart(2, "0");

//     return `${day}-${month}-${year} ${hours}:${minutes}`;
//   }

//   // Sort replacementOrders by timeDate in descending order
//   const sortedReplacementOrders = [...replacementOrders].sort((a, b) => new Date(b.timeDate).getTime() - new Date(a.timeDate).getTime());

//   return (
//     <div className="overscroll-contain">
//       {sortedReplacementOrders.map((replacementOrder) => (
//         <div className="border-2 border-white p-2 my-4" key={replacementOrder.id}>
//           <h2 className="font-bold text-lg">{replacementOrder.title}</h2>
//           <h3 className="font-bold pb-1">Total Pris: {replacementOrder.totalPrice} kr.</h3>
//           <h3 className="font-bold pb-1">Tidspunkt: {formatDate(replacementOrder.timeDate)}</h3>
//           <table className="table-auto">
//             <thead>
//               <tr>
//                 <th className="px-4 py-2">Vare</th>
//                 <th className="px-4 py-2">Antal</th>
//                 <th className="px-4 py-2">Pris</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orderItems
//                 .filter((orderItem) => orderItem.replacementOrder.id === replacementOrder.id)
//                 .map((orderItem) => {
//                   return (
//                     <tr key={orderItem.stockItem.name}>
//                       <td className="border px-4 py-2">{orderItem.stockItem.name}</td>
//                       <td className="border px-4 py-2">{orderItem.amountToOrder}</td>
//                       <td className="border px-4 py-2">{orderItem.stockItem.price}</td>
//                     </tr>
//                   );
//                 })}
//             </tbody>
//           </table>
//         </div>
//       ))}
//     </div>
//   );
// }







// import { OrderItem } from './StockOrderPage';
// import { ReplacementOrder } from './StockOrderPage';

// export interface StockItem {
//     name: string;
//     price: number;
// }

// interface StockOrderOverviewProps {
//     replacementOrders: ReplacementOrder[];
//     orderItems: OrderItem[];
// }

// export default function StockOrderOverview({ replacementOrders, orderItems }: StockOrderOverviewProps) {
//     function formatDate(dateString: string) {
//         const date = new Date(dateString);

//         date.setHours(date.getHours() + 2);
//         const day = date.getDate().toString().padStart(2, '0');
//         const month = (date.getMonth() + 1).toString().padStart(2, '0');
//         const year = date.getFullYear();

//         const hours = date.getHours().toString().padStart(2, '0');
//         const minutes = date.getMinutes().toString().padStart(2, '0');

//         return `${day}-${month}-${year} ${hours}:${minutes}`;
//     }

//     return (
//         <div className="overscroll-contain">
//             {replacementOrders.map((replacementOrder) => (
//                 <div className="border-2 border-white p-2 my-4" key={replacementOrder.id}>
//                     <h2 className="font-bold text-lg">{replacementOrder.title}</h2>
//                     <h3 className="font-bold pb-1">Total Pris: {replacementOrder.totalPrice} kr.</h3>
//                     <h3 className="font-bold pb-1">Tidspunkt: {formatDate(replacementOrder.timeDate)}</h3>
//                     <table className="table-auto">
//                         <thead>
//                             <tr>
//                                 <th className="px-4 py-2">Vare</th>
//                                 <th className="px-4 py-2">Antal</th>
//                                 <th className="px-4 py-2">Pris</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {orderItems
//                                 .filter((orderItem) => orderItem.replacementOrder.id === replacementOrder.id)
//                                 .map((orderItem) => {
//                                     return (
//                                         <tr>
//                                             <td className="border px-4 py-2">{orderItem.stockItem.name}</td>
//                                             <td className="border px-4 py-2">{orderItem.amountToOrder}</td>
//                                             <td className="border px-4 py-2">{orderItem.stockItem.price}</td>
//                                         </tr>
//                                     );
//                                 })}
//                         </tbody>
//                     </table>
//                 </div>
//             ))}
//         </div>
//     );
// }
