import React, { useEffect, useState } from 'react';
import { getAllBookings } from '../../api/booking/GetAllBookingsApi';
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
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [days, setDays] = useState<string[]>([]);
    const [selectedDay, setSelectedDay] = useState<string>('');
    const [hourlyBookings, setHourlyBookings] = useState<Array<number>>(Array.from({ length: 13 }, () => 0));

    useEffect(() => {
        // data:Booking[] | undefined is part of the Promise when using async/await. It is a type assertion that tells TypeScript that the data is of type Booking[] or undefined.
        getAllBookings().then((data: Booking[] | undefined) => {
            setBookings(data || []);

            const days: string[] = [];
            for (let day = 1; day <= 31; day++) {
                if (day < 10) {
                    days.push(`0${day}`);
                } else {
                    days.push(day.toString());
                }
            }
            setDays(days);
        });
    }, []);

    useEffect(() => {
        handleShowDay();
    }, [selectedDay]);

    function handleShowDay() {
        console.log('Show bookings for day:', selectedDay);

        const bookingsByDay = bookings.filter((booking) => {
            const day = booking.reservation.reservationDate.split('-')[1];
            console.log('all the days booked ' + day);
            return day === selectedDay;
        });
        console.log('Bookings by day:', bookingsByDay);

        const hourlyBookings = Array.from({ length: 12 }, () => 0);

        // Increment the counter for each booking
        bookingsByDay.forEach((booking) => {
            const startHour = Math.max(parseInt(booking.startTime.split(':')[0]), 10);
            const endHour = Math.min(parseInt(booking.endTime.split(':')[0]), 21);
            for (let hour = startHour; hour < endHour; hour++) {
                hourlyBookings[hour - 10]++;
            }
        });

        console.log(hourlyBookings);
        setHourlyBookings(hourlyBookings);

        return bookingsByDay;
    }

    function handleDayChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedDay(event.target.value);
    }

    return (
        <div className="w-screen mx-auto px-4 py-8 max-w-screen-full px-56">
            <div>
                <div>
                    <label>
                        Dag
                        <select value={selectedDay} onChange={handleDayChange}>
                            <option value={1}></option>
                            {days.map((day) => (
                                <option key={day} value={day}>
                                    {day}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button className="mx-2">Uge</button>
                    <button className="mx-2">Måned</button>
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
                        <tr key={i}>
                            <td className="border px-4 py-2">{`${i + 10}:00`}</td>
                            <td className="border px-4 py-2">
                                <div>
                                    <div>Fuld booket </div>
                                    <div>Delvis booket </div>
                                    <div>Ledigr</div>
                                    <div>{`Antal bookinger: ${hourlyBookings[i]}`}</div>
                                </div>
                            </td>
                            <td className="border px-4 py-2">
                                <div>
                                    <div>Fuld booket</div>
                                    <div>Delvis booket</div>
                                    <div>Ledig</div>
                                </div>
                            </td>
                            <td className="border px-4 py-2">
                                <div>
                                    <div>Fuld booket</div>
                                    <div>Delvis booket</div>
                                    <div>Ledig</div>
                                </div>
                            </td>
                            <td className="border px-4 py-2">
                                <div>
                                    <div>Fuld booket</div>
                                    <div>Delvis booket</div>
                                    <div>Ledig</div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
