import { Booking } from '../../components/booking/DailyBookingOverview';

export const getAllBookings = async () => {
    try {
        const response = await fetch('http://localhost:8080/activityBookings');

        if (!response.ok) {
            const errorMessage = await response.text();
            console.error('Error:', errorMessage);
            return;
        }
        const bookings: Booking[] = await response.json();
        console.log('bookings for all days:', bookings);
        return bookings;
    } catch (error) {
        console.error('Error:', error, 'Failed to fetch consumables');
    }
};
