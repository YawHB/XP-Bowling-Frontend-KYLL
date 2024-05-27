import { ActivityBookingsInterface } from "./bookingInterfaces";

async function fetchActivityBookings(): Promise<ActivityBookingsInterface[]> {
  const response = await fetch("http://localhost:8080/activityBookings");
  const data = await response.json();
  return data;
}

function filterBookingsByDate(
  bookings: ActivityBookingsInterface[],
  filterDate: Date | null
): ActivityBookingsInterface[] {
  if (!filterDate) {
    return bookings;
  }

  return bookings.filter(
    (booking) =>
      new Date(booking.reservation.reservationDate).toDateString() ===
      filterDate.toDateString()
  );
}

async function getFilteredBookings(
  filterDate: Date | null
): Promise<ActivityBookingsInterface[]> {
  const bookings = await fetchActivityBookings();
  return filterBookingsByDate(bookings, filterDate);
}

export { getFilteredBookings };
