import { Booking } from '../../components/booking/DailyBookingOverview';

export const getBookingsForADay = async (date: string) => {
    try {
        const response = await fetch(`http://localhost:8080/activitybookings/reservation/reservationdate/2024-05-23`);

        if (!response.ok) {
            const errorMessage = await response.text();
            console.error('Error:', errorMessage);
            return;
        }
        const bookings: Booking[] = await response.json();
        return bookings;
    } catch (error) {
        console.error('Error:', error, 'Failed to fetch consumables');
    }
};
