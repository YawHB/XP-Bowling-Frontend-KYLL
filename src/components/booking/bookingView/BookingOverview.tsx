import { BookingData } from "../OnlineBooking";
import fetchActivityTypes from "../../services/activityTypeService";

interface BookingOverviewProps {
  bookingData: BookingData[];
  removeBooking: (id: number) => void;
}

// interface activityTypeInterface {
//   id: number;
//   type: string;
//   hourPrice: number;
//   maxCapacity: number;
// }



// TODO: implement 'antal timer' for bookings??

fetchActivityTypes()



export default function BookingOverview({ bookingData, removeBooking }: BookingOverviewProps) {

  function handleDeleteClicked(id: number) {
    console.log("Delete activity button clicked");
    removeBooking(id);
  }

  console.log(bookingData);

  // function acticityPrice(activityType: activityTypeInterface[]) {
  //   console.log("activityType: ", activityType);

  //   // console.log("bookingData: ", bookindData);
    
    
  //   //  console.log("hey", activityType);
  // }

  // function calculateTotalPrice(orderItems: OrderItem[]) {
  //   return orderItems.reduce((total, item) => {
  //     const itemPrice = item.stockItem.price || 0;
  //     return total + itemPrice * item.amountToOrder;
  //   }, 0);
  // }

  

  
  
  
 

 

  return (
    <div className="bg-blue-500 p-2">
      <div className="">
        <h1 className="text-2xl font-bold">Booking Oversigt</h1>
      </div>
      {/* <div>
        <h2 className="text-lg font-bold">Totalpris: {getTotalprice(bookingData[0])}</h2>
      </div> */}
      <table>
        <thead className="flex">
          <tr>
            <th className="self-left">Aktivitet</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="">
          {bookingData.map((booking) => (
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
                  {booking.lanes !== undefined ? (
                    <>
                      <p className="font-bold pr-2">Antal baner:</p>
                      <p>{booking.lanes}</p>
                    </>
                  ) : booking.tables !== undefined ? (
                    <>
                      <p className="font-bold pr-2">Antal borde:</p>
                      <p>{booking.tables}</p>
                    </>
                  ) : null}
                </div>
              </td>
              <td>
                <button className="mr-2 bg-red-400" onClick={() => booking.id && handleDeleteClicked(booking.id)}>
                  Slet
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
