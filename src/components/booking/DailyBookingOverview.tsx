import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { getBookingsForADay } from '../../api/booking/GetBookingsForADayApi';
export interface Booking {
    startTime: string;
    endTime: string;
    activity: {
        activityName: string;
        activityType: {
            type: string;
        };
    };
    reservation: {
        reservationDate: string;
    };
}

export default function DailyBookingOverview() {
    const [startDate, setStartDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState<string>(new Date().toISOString().split('T')[0]);

    const useHourlyBookings = () => useState<number[]>([0, ...Array.from({ length: 12 }, () => 0)]);

    const [hourlyBowlingAdultBookings, setHourlyBowlingAdultBookings] = useHourlyBookings();
    const [hourlyBowlingChildrenBookings, setHourlyBowlingChildrenBookings] = useHourlyBookings();
    const [hourlyAirHockeyBookings, setHourlyAirHockeyBookings] = useHourlyBookings();
    const [hourlyRestaurantBookings, setHourlyRestaurantBookings] = useHourlyBookings();

    useEffect(() => {
        const fetchBookings = async () => {
            if (selectedDay) {
                const bookings: Booking[] | undefined = await getBookingsForADay(selectedDay);

                const filteredBowlingAdultBookings = bookings?.filter((booking) => booking.activity.activityType.type === 'BOWLING_ADULT') || [];
                const filteredBowlingChildrenBookings = bookings?.filter((booking) => booking.activity.activityType.type === 'BOWLING_CHILD') || [];
                const filteredAirHockeyBookings = bookings?.filter((booking) => booking.activity.activityType.type === 'AIR_HOCKEY') || [];
                const filteredRestaurantBookings = bookings?.filter((booking) => booking.activity.activityType.type === 'RESTAURANT') || [];

                setHourlyBowlingAdultBookings(countHourlyBookings(filteredBowlingAdultBookings));
                setHourlyBowlingChildrenBookings(countHourlyBookings(filteredBowlingChildrenBookings));
                setHourlyAirHockeyBookings(countHourlyBookings(filteredAirHockeyBookings));
                setHourlyRestaurantBookings(countHourlyBookings(filteredRestaurantBookings));
                setStartDate(new Date(selectedDay));
            }
        };

        fetchBookings();
    }, [selectedDay]);

    function countHourlyBookings(bookings: Booking[]) {
        const hourlyBookings = Array.from({ length: 13 }, () => 0);

        bookings.forEach((booking) => {
            const startHour = Math.max(parseInt(booking.startTime.split(':')[0]), 10);
            const endHour = Math.min(parseInt(booking.endTime.split(':')[0]), 21);
            for (let hour = startHour; hour <= endHour; hour++) {
                hourlyBookings[hour - 10]++;
            }
        });

        return hourlyBookings;
    }

    return (
      <div className="w-screen mx-auto px-4 py-8 max-w-screen-full px-56">
        <div>
          <div className="flex items-center">
            <label>
              <p className="text-xl font-bold">Vælg dato:</p>
              <div className="mx-0 relative rounded-md shadow-sm">
                <DatePicker
                  className="ml-0 mr-8 mb-6"
                  dateFormat={"dd-MM-yyyy"}
                  selected={startDate}
                  onChange={(date: Date) => {
                    setStartDate(date);

                    const dateStr = date.toISOString().split("T")[0];
                    setSelectedDay(dateStr);
                  }}
                />
              </div>
            </label>
            <button className="w-22 text-lg font-bold text-white whitespace-nowrap bg-green-700 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 border-2 border-yellow-300">
              Dag
            </button>
            <button className="w-22 text-lg font-bold text-white whitespace-nowrap bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 border-2 border-yellow-300 ml-2">
              Uge
            </button>
            <button className="w-22 text-lg font-bold text-white whitespace-nowrap bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 border-2 border-yellow-300 ml-2">
              Måned
            </button>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-pink-300">Dagens booking oversigt</h1>

        <table className=" w-full table-auto border-pink-300 my-4 ">
          <thead>
            <tr className=" border-pink-300">
              <th className="border px-4 py-2 sm:border-4 border-pink-300">Tid</th>
              <th className="border px-4 py-2 sm:border-4 border-pink-300">Bowling</th>
              <th className="border px-4 py-2 sm:border-4 border-pink-300">Børnebowling</th>
              <th className="border px-4 py-2 sm:border-4 border-pink-300">Air-hockey</th>
              <th className="border px-4 py-2 sm:border-4 border-pink-300">Restaurant</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 12 }).map((_, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-gray-600" : "bg-gray-600/50  border-pink-300"}>
                <td className="border border-2 border-pink-300 px-4 py-2">{`${i + 10}:00`}</td>
                <td className="border px-4 py-2 border-2 border-pink-300">
                  <div>
                    <div>{`Booket: ${hourlyBowlingAdultBookings[i]}`}</div>
                    <div>{`Ledige: ${Math.abs(hourlyBowlingAdultBookings[i] - 20)} `}</div>
                  </div>
                </td>
                <td className="border px-4 py-2 border-2 border-pink-300">
                  <div>
                    <div>{`Antal baner booket: ${hourlyBowlingChildrenBookings[i]} `}</div>
                    <div>{`Ledige baner: ${Math.abs(hourlyBowlingChildrenBookings[i] - 4)} `}</div>
                  </div>
                </td>
                <td className="border px-4 py-2 border-2  border-pink-300">
                  <div>
                    <div>{`Antal baner booket: ${hourlyAirHockeyBookings[i]}`}</div>
                    <div>{`Ledige baner: ${Math.abs(hourlyAirHockeyBookings[i] - 6)} `}</div>
                  </div>
                </td>
                <td className="border px-4 py-2 border-2 border-pink-300">
                  <div>
                    <div>{`Antal borde booket: ${hourlyRestaurantBookings[i]}`}</div>
                    <div>{`Ledige borde: ${Math.abs(hourlyRestaurantBookings[i] - 50)} `}</div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
