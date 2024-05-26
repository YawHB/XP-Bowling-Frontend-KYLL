import React, { useState, useEffect, useCallback } from "react";
import { ActivityBookingsInterface } from "./bookingInterfaces";

export default function ExistingBookings({
  filterDate,
}: {
  filterDate: Date | null;
}) {
  const [existingBookings, setExistingBookings] = useState<
    ActivityBookingsInterface[] | null
  >(null);

  const [filteredBookings, setFilteredBookings] = useState<
    ActivityBookingsInterface[] | null
  >(null);

  useEffect(() => {
    fetchActivityBookings();
  }, []);




  const filterDataByDate = useCallback(() => {
    if (existingBookings && filterDate) {
      const filtered = existingBookings.filter(
        (booking) =>
          new Date(booking.reservation.reservationDate).toDateString() ===
          filterDate.toDateString()
      );
      setFilteredBookings(filtered);
    } else {
      setFilteredBookings(existingBookings);
    }
  }, [existingBookings, filterDate]);

  useEffect(() => {
    filterDataByDate();
  }, [filterDate, filterDataByDate]);

  function fetchActivityBookings() {
    fetch("http://localhost:8080/activityBookings")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setExistingBookings(data);
        if (filterDate) {
          console.log("FilteredDate");
          console.log(filterDate.toDateString());
          const filtered = data.filter(
            (booking: ActivityBookingsInterface) =>
              new Date(booking.reservation.reservationDate).toDateString() ===
              filterDate.toDateString()
          );
            console.log("filterDate: ", filterDate);
            console.log(filterDate.toString());
          setFilteredBookings(filtered);
        } else {
          setFilteredBookings(data);
        }
      });
  }

  // console.log("This is the filtered bookings", filteredBookings);

  return <div></div>;
}
