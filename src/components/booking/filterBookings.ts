import { ActivitiesBookingEntityInterface } from "./bookingInterfaces";

function filterByActivityType(
  bookingsByDate: ActivitiesBookingEntityInterface[],
  activityId: number
) {
  return bookingsByDate.filter(
    (booking) =>
      booking.activity.activityType &&
      booking.activity.activityType.id === activityId
  );
}

function filterByTime(
  bookingsFilteredByTypes: ActivitiesBookingEntityInterface[],
  startTime: string
) {
  return bookingsFilteredByTypes.filter((booking) => {
    return booking.activity.startTime === startTime;
  });
}

export { filterByActivityType, filterByTime };
