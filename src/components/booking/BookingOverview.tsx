import { useEffect, useState } from "react";
import { fetchBookingData } from "../services/bookingService";

// IMPORTANT
// Delete fetch, and get data from booking form submit in stead



// how to check how many bowlong lanes are booked?
interface BookingData {
  id?: number;
  activity: string;
  date: string;
  time: string;
  lanes: number;
}

export default function BookingOverview() {
  const [bookingData, setBookingData] = useState<BookingData[]>([]);

  async function fetchedData() {
    const data = await fetchBookingData();
    setBookingData(data);
  }

  useEffect(() => {
    fetchedData();
  }, []);

  // placeholder log - fjern når fetch bruges
  console.log(bookingData);
  

  return (
    <div className="bg-blue-500 p-2">
      <div className="">
        <h1 className="text-2xl font-bold">Booking Oversigt</h1>
      </div>
      <table>
        <thead className="flex">
          <tr>
            <th className="self-left">Aktivitet</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="">
          {/* Koden her er klar ish til at tage imod data */}
          {/* {bookingData.map((booking) => (
            <tr key={booking.id} className=" bg-blue-300 border-4 border-blue-600">
              <td className="p-3 ">
                <div>
                  <p className="font-bold text-lg">{booking.activity}</p>
                </div>
                <div className="flex">
                  <p className="font-bold pr-5">Tidspunkt:</p>
                  <p className="pr-2">{booking.date}</p>
                  <p>{booking.time}</p>
                </div>
                <div className="flex">
                  <p className="font-bold pr-2">Antal baner:</p>
                  <p>{booking.lanes}</p>
                </div>
              </td>
              <td>
                <button className="m-2 bg-green-300">Rediger</button>
                <button className="mr-2 bg-red-400">Slet</button>
              </td>
            </tr>
          ))} */}
          <tbody className="">
            <tr className=" bg-blue-300 border-4 border-blue-600">
              <td className="p-3 ">
                <div>
                  <p className="font-bold text-lg">Bowling</p>
                </div>
                <div className="flex">
                  <p className="font-bold pr-5">Tidspunkt:</p>
                  <p className="pr-2">25-05-2024</p>
                  <p>kl. 17:00-18:55</p>
                </div>
                <div className="flex">
                  <p className="font-bold pr-2">Antal baner:</p>
                  <p>2</p>
                </div>
              </td>
              <td>
                <button className="m-2 bg-green-300">Rediger</button>
                <button className="mr-2 bg-red-400">Slet</button>
              </td>
            </tr>
          </tbody>
        </tbody>
      </table>
    </div>
  );
}

//   return (
//     <div className="bg-blue-500 p-2">
//       <div className="">
//         <h1 className="text-2xl font-bold">Booking Oversigt</h1>
//       </div>
//       <table>
//         <thead className="flex">
//           <tr>
//             <th className="self-left">Aktivitet</th>
//             <th></th>
//           </tr>
//         </thead>
//         <tbody className="">
//           <tr className=" bg-blue-300 border-4 border-blue-600">
//             <td className="p-3 ">
//               <div>
//                 <p className="font-bold text-lg">Bowling</p>
//               </div>
//               <div className="flex">
//                 <p className="font-bold pr-5">Tidspunkt:</p>
//                 <p className="pr-2">25-05-2024</p>
//                 <p>kl. 17:00-18:55</p>
//               </div>
//               <div className="flex">
//                 <p className="font-bold pr-2">Antal baner:</p>
//                 <p>2</p>
//               </div>
//             </td>
//             <td>
//               <button className="m-2 bg-green-300">Rediger</button>
//               <button className="mr-2 bg-red-400">Slet</button>
//             </td>
//           </tr>
//           <tr className=" bg-blue-300 border-4 border-blue-600">
//             <td className="p-3 ">
//               <div>
//                 <p className="font-bold text-lg">Bowling</p>
//               </div>
//               <div className="flex">
//                 <p className="font-bold pr-5">Tidspunkt:</p>
//                 <p className="pr-2">25-05-2024</p>
//                 <p>kl. 17:00-18:55</p>
//               </div>
//               <div className="flex">
//                 <p className="font-bold pr-2">Antal baner:</p>
//                 <p>2</p>
//               </div>
//             </td>
//             <td>
//               <button className="m-2 bg-green-300">Rediger</button>
//               <button className="mr-2 bg-red-400">Slet</button>
//             </td>
//           </tr>
//           <tr className=" bg-blue-300 border-4 border-blue-600">
//             <td className="p-3 ">
//               <div>
//                 <p className="font-bold text-lg">Bowling</p>
//               </div>
//               <div className="flex">
//                 <p className="font-bold pr-5">Tidspunkt:</p>
//                 <p className="pr-2">25-05-2024</p>
//                 <p>kl. 17:00-18:55</p>
//               </div>
//               <div className="flex">
//                 <p className="font-bold pr-2">Antal baner:</p>
//                 <p>2</p>
//               </div>
//             </td>
//             <td>
//               <button className="m-2 bg-green-300">Rediger</button>
//               <button className="mr-2 bg-red-400">Slet</button>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }
