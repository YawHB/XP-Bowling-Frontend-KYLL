import { BookingData } from "../bookingInterfaces";
import { ActivityType } from "../../services/activityTypeService";
// import { ActivitiesBookingEntityInterface } from "../bookingInterfaces";

interface BookingOverviewProps {
  bookingData: BookingData[];
  removeBooking: (id: number) => void;
  activityType: ActivityType[];
  // bookingsByDate?: ActivitiesBookingEntityInterface[];
}

export default function BookingOverview({ bookingData, removeBooking, activityType }: BookingOverviewProps) {
  console.log("BookingOverview: ", bookingData);

  bookingData.forEach((booking) => {
    console.log("aktiviteten hhihihihihihihhihihih:          ", booking.activity);
    console.log("DET FINT!!                        ", booking);

    booking.price = 0;

    const activity = activityType.find((activity) => activity.type === booking.activity);
    console.log("bibububububububbububbub:          ", activity);

    if (activity) {
      console.log(activity.hourlyPrice);
      console.log(booking.duration);
      // console.log(booking.tables);
      // console.log(booking.lanes);

      booking.lanes
        ? (booking.price = activity.hourlyPrice * booking.duration! * booking.lanes!)
        : booking.tables
        ? (booking.price = activity.hourlyPrice * booking.duration! * booking.tables!)
        : // booking.price = activity.hourlyPrice * booking.duration! * booking.tables!;
          console.log("pris:          ", booking.price);
    }
  });
  function handleDeleteClicked(id: number) {
    console.log("Delete activity button clicked");
    removeBooking(id);
  }
  return (
    <div className="w-full bg-blue-500 p-2 flex flex-col items-center">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">Booking Oversigt</h1>
      </div>
      <div className="flex mb-4">
        <p className="font-bold pr-2">Total Pris:</p>
        <p>{bookingData.reduce((acc, booking) => acc + booking.price!, 0)}</p>
      </div>
      <table className="w-full">
        <thead className="flex">
          <tr>
            <th className="self-left">Aktivitet</th>
          </tr>
        </thead>
        <tbody>
          {bookingData.map((booking) => (
            <tr key={booking.id} className="bg-blue-300 border-4 border-blue-600">
              <td className="p-3">
                <div>
                  <p className="font-bold text-lg">
                    {booking.activity === "BOWLING_ADULT" ? "Bowling" : booking.activity === "BOWLING_CHILD" ? "Børne Bowling" : booking.activity === "AIR_HOCKEY" ? "Air-Hockey" : "Restaurant"}
                  </p>
                </div>
                <div className="flex">
                  <p className="font-bold pr-5">Tidspunkt:</p>
                  <p className="pr-5">Pris: {booking.price}</p>
                  <p className="pr-2">{booking.date}</p>
                  <p>{booking.time}</p>
                  <p className="px-2">Antal timer: {booking.duration}</p>
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
                <button className="mr-2 bg-red-400 hover:bg-red-500 border-2 border-yellow-300" onClick={() => booking.id && handleDeleteClicked(booking.id)}>
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
