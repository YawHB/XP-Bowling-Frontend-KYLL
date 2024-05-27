import { Booking } from '../../components/booking/DailyBookingOverview';

export const getBookingsForADay = async (date: string) => {
    console.log('date param: ', date);

    try {
        const response = await fetch(`http://localhost:8080/activitybookings/reservation/reservationdate/${date}`);

        if (!response.ok) {
            const errorMessage = await response.text();
            console.error('Error:', errorMessage);
            return;
        }
        const bookings: Booking[] = await response.json();
        console.log(`Bookings for ${date}: `);
        console.log(bookings);

        console.log('--------------------');

        return bookings;
    } catch (error) {
        console.error('Error:', error, 'Failed to fetch consumables');
    }
};
