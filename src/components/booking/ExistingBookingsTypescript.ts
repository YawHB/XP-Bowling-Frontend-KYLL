import { ActivityBookingsInterface } from "./bookingInterfaces";

async function fetchActivityBookings(): Promise<ActivityBookingsInterface[]> {
  const response = await fetch("http://localhost:8080/activityBookings");
  const data = await response.json();
  return data;
}

function filterBookingsByDate(
  bookings: ActivityBookingsInterface[],
  formattedDate: Date | null
): ActivityBookingsInterface[] {
  if (!formattedDate) {
    return bookings;
  }

  return bookings.filter(
    (booking) =>
      new Date(booking.reservation.reservationDate).toDateString() ===
      formattedDate.toDateString()
  );
}

async function getFilteredBookings(
  formattedDate: Date | null
): Promise<ActivityBookingsInterface[]> {
  const bookings = await fetchActivityBookings();
  return filterBookingsByDate(bookings, formattedDate);
}

export { getFilteredBookings };
