import React, { useEffect, useState } from 'react';
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
    const [bookings, setBookingsForADay] = useState<Booking[]>([]);
    const [selectedDay, setSelectedDay] = useState<string>('');
    const [bowlingAdultBookings, setBowlingAdultBookings] = useState<Booking[]>([]);
    const [bowlingChildrenBookings, setBowlingChildrenBookings] = useState<Booking[]>([]);
    const [airHockeyBookings, setAirHockeyBookings] = useState<Booking[]>([]);

    //const [hourlyBookings, setHourlyBookings] = useState<Array<number>>(Array.from({ length: 13 }, () => 0));

    useEffect(() => {
        if (selectedDay) {
            console.log('Fetching bookings for selected day:', selectedDay);
            //console.log('startdate ' + startDate);

            // data:Booking[] | undefined is part of the Promise when using async/await. It is a type assertion that tells TypeScript that the data is of type Booking[] or undefined.
            getBookingsForADay(selectedDay).then((bookings: Booking[] | undefined) => {
                // setBookings(data || []);

                // const days: string[] = [];
                // for (let day = 1; day <= 31; day++) {
                //     if (day < 10) {
                //         days.push(`0${day}`);
                //     } else {
                //         days.push(day.toString());
                //     }
                // }
                // setDays(days);

                setBookingsForADay(bookings || []);
                console.log('Bookings for selected day:', bookings);
                const bowlingAdultBookings = bookings?.filter((booking) => booking.activity.activityType.type === 'BOWLING_ADULT');
                const bowlingChildrenBookings = bookings?.filter((booking) => booking.activity.activityType.type === 'BOWLING_CHILD');
                const airHockeyBookings = bookings?.filter((booking) => booking.activity.activityType.type === 'AIR_HOCKEY');
                const restaurantBookings = bookings?.filter((booking) => booking.activity.activityType.type === 'RESTAURANT');

                console.log('bookings for selected day on next line-----');

                console.log('Bowling adult bookings:', bowlingAdultBookings);
                console.log('Bowling children bookings:', bowlingChildrenBookings);
                console.log('Air hockey bookings:', airHockeyBookings);
                console.log('Restaurant bookings:', restaurantBookings);
            });
        }
    }, [selectedDay]);

    // useEffect(() => {
    //     handleShowDay();
    // }, [selectedDay]);

    // function countHourlyBookings(bookings: Booking[]) {
    //     const hourlyBookings = Array.from({ length: 13 }, () => 0);

    //     bookings.forEach((booking) => {
    //         const startHour = Math.max(parseInt(booking.startTime.split(':')[0]), 10);
    //         const endHour = Math.min(parseInt(booking.endTime.split(':')[0]), 21);
    //         for (let hour = startHour; hour < endHour; hour++) {
    //             hourlyBookings[hour - 10]++;
    //         }
    //     });

    //     return hourlyBookings;
    // }

    // function handleShowDay() {
    //     console.log('Show bookings for day:', selectedDay);

    //     const bookingsByDay = bookings.filter((booking) => {
    //         const day = booking.reservation.reservationDate.split('-')[1];
    //         console.log('all the days booked ' + day);
    //         return day === selectedDay;
    //     });
    //     console.log('Bookings by day:', bookingsByDay);

    //const hourlyBookings = Array.from({ length: 12 }, () => 0);

    // Increment the counter for each booking
    // bookingsByDay.forEach((booking) => {
    //     const startHour = Math.max(parseInt(booking.startTime.split(':')[0]), 10);
    //     const endHour = Math.min(parseInt(booking.endTime.split(':')[0]), 21);
    //     for (let hour = startHour; hour < endHour; hour++) {
    //         hourlyBookings[hour - 10]++;
    //     }
    // });

    //TODO I might need this later

    // const hourlyBowlingAdultBookings = countHourlyBookings(bowlingAdultBookings);
    // const hourlyBowlingChildrenBookings = countHourlyBookings(bowlingChildrenBookings);
    // const hourlyAirHockeyBookings = countHourlyBookings(airHockeyBookings);
    // const hourlyRestaurantBookings = countHourlyBookings(restaurantBookings);

    // console.log('Hourly bookings for each activity:', {
    //     bowlingAdult: hourlyBowlingAdultBookings,
    //     bowlingChildren: hourlyBowlingChildrenBookings,
    //     airHockey: hourlyAirHockeyBookings,
    //     restaurant: hourlyRestaurantBookings,
    // });

    // console.log(hourlyBookings);
    // setHourlyBookings(hourlyBookings);

    // return bookingsByDay;
    // }

    // function handleDayChange(event: React.ChangeEvent<HTMLSelectElement>) {
    //     setSelectedDay(event.target.value);
    // }

    // function handleFilterBookings(date: string) {
    //     const todaysBookings = bookings.filter((booking) => {
    //         return booking.reservation.reservationDate === date;
    //     });
    //     console.log(' bookings:', bookings);

    //     setTodaysBookings(todaysBookings);

    // }

    return (
        <div className="w-screen mx-auto px-4 py-8 max-w-screen-full px-56">
            <div>
                <div>
                    <label>
                        Dag
                        <DatePicker
                            timeFormat="dd:MM:yyyy"
                            selected={new Date()}
                            onChange={(date: Date) => {
                                const dateStr = date.toISOString().split('T')[0];
                                //setStartDate(date);
                                setSelectedDay(dateStr);
                                //console.log('Selected day:', date.toISOString().split('T')[0]);

                                //handleFilterBookings(dateStr);
                            }}
                        />
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
                                    {/* //TODO Fix hourlyBowlingAdultBookings dynamiske opdatering */}

                                    {/* <div>{`Antal baner booket: ${hourlyBowlingAdultBookings[i]}`}</div> */}
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
