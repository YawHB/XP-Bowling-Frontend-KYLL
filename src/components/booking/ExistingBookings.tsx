import React, { useState, useEffect, useCallback } from "react";
import { ActivitiesBookingEntityInterface } from "./bookingInterfaces";

export default function ExistingBookings({
  filterDate,
}: {
  filterDate: Date | null;
}) {
  const [existingBookings, setExistingBookings] = useState<
    ActivitiesBookingEntityInterface[] | null
  >(null);

  useEffect(() => {
    fetchActivityBookings();
  }, []);

  const filterDataByDate = useCallback(() => {
    if (existingBookings && filterDate) {
      const filteredBookings = existingBookings.filter(
        (booking) =>
          new Date(booking.date).toDateString() === filterDate.toDateString()
      );
      setExistingBookings(filteredBookings);
    }
  }, [existingBookings, filterDate]);

  useEffect(() => {
    if (filterDate) {
      filterDataByDate();
    }
  }, [filterDate, filterDataByDate]);

  function fetchActivityBookings() {
    fetch("http://localhost:8080/activityBookings")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setExistingBookings(data);
        // Automatically filter by date after fetching if filterDate is available
        if (filterDate) {
          const filteredBookings = data.filter(
            (booking: ActivitiesBookingEntityInterface) =>
              new Date(booking.date).toDateString() ===
              filterDate.toDateString()
          );
          setExistingBookings(filteredBookings);
        } else {
          setExistingBookings(data);
        }
      });
  }

  console.log(existingBookings);

  return (
    <div>
    </div>
  );
}
