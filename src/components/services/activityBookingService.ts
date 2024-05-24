async function fetchBookingData() {
  try {
    const response = await fetch("your-backend-api-endpoint");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}


interface CustomerInterface {
  id: number;
  name?: string;
  phone?: string;
}


interface Activity {
  id: number;
}

interface Reservation {
  id?: number;
  totalPrice: number;
  customer: CustomerInterface;
  reservationDate: Date;
}

interface ActivityBookingsInterface {
  startTime: string;
  endTime: string;
  numberParticipants: number;
  activity: Activity;
  reservation: Reservation;
}


async function postBooking(
  newActivityBooking: ActivityBookingsInterface
): Promise<ActivityBookingsInterface> {
  console.log("post-route-data", newActivityBooking);
  const response = await fetch(`http://localhost:8080/activityBookings`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newActivityBooking),
  });
  if (!response.ok) {
    throw new Error("An error occured when posting the booking");
  }
  return await(response.json() as Promise<ActivityBookingsInterface>);
}

export { fetchBookingData, postBooking };
