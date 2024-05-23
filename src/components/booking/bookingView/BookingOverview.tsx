import { BookingData } from "../OnlineBooking";

interface BookingOverviewProps {
  bookingData: BookingData[];
}
// TODO: implement delete functionality
// TODO: implement 'antal timer' for bookings

export default function BookingOverview({ bookingData }: BookingOverviewProps) {
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
                <button className="mr-2 bg-red-400">Slet</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
