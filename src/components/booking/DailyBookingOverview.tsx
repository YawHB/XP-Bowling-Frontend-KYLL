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
            for (let hour = startHour; hour < endHour; hour++) {
                hourlyBookings[hour - 10]++;
            }
        });

        return hourlyBookings;
    }

    return (
        <div className="w-screen mx-auto px-4 py-8 max-w-screen-full px-56">
            <div>
                <div className="flex items-center">
                    <label className="block text-sm font-medium text-white mr-4 text-center">
                        Dag
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <DatePicker
                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-40 pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                dateFormat={'dd-MM-yyyy'}
                                selected={startDate}
                                onChange={(date: Date) => {
                                    setStartDate(date);

                                    const dateStr = date.toISOString().split('T')[0];
                                    setSelectedDay(dateStr);
                                }}
                            />
                        </div>
                    </label>
                    <button className="mx-2 bg-blue-500">Uge</button>
                    <button className="mx-2 bg-blue-500 ">Måned</button>
                </div>
            </div>
            <h1 className="text-3xl font-semibold">Dagens booking oversigt</h1>

            <table className=" w-full table-auto">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Tid</th>
                        <th className="border px-4 py-2">Bowling</th>
                        <th className="border px-4 py-2">Børnebowling</th>
                        <th className="border px-4 py-2">Air-hockey</th>
                        <th className="border px-4 py-2">Restaurant</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: 12 }).map((_, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-gray-600' : ''}>
                            <td className="border px-4 py-2">{`${i + 10}:00`}</td>
                            <td className="border px-4 py-2">
                                <div>
                                    <div>{`Booket: ${hourlyBowlingAdultBookings[i]}`}</div>
                                    <div>{`Ledige: ${Math.abs(hourlyBowlingAdultBookings[i] - 20)} `}</div>
                                </div>
                            </td>
                            <td className="border px-4 py-2">
                                <div>
                                    <div>{`Antal baner booket: ${hourlyBowlingChildrenBookings[i]} `}</div>
                                    <div>{`Ledige baner: ${Math.abs(hourlyBowlingChildrenBookings[i] - 4)} `}</div>
                                </div>
                            </td>
                            <td className="border px-4 py-2">
                                <div>
                                    <div>{`Antal baner booket: ${hourlyAirHockeyBookings[i]}`}</div>
                                    <div>{`Ledige baner: ${Math.abs(hourlyAirHockeyBookings[i] - 6)} `}</div>
                                </div>
                            </td>
                            <td className="border px-4 py-2">
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
