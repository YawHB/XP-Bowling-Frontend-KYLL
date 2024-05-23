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

interface activity {
  id: number;
}

interface reservation {
  id: number;
}

interface activityBookings {
  startTime: string;
  endTime: string;
  numberParticipants: number;
  activity: activity;
  reservation: reservation;
}

/*
activityBookings
{
        "startTime": "21:00:00",
        "endTime": "22:00:00",
        "numberParticipants": 5,
        "activity": {
            "id": 1
            }
        },
        "reservation": {
            "id": 1
            },
            "reservationDate": "2024-05-22"
        }
    }
*/

async function postBooking(
  newActivityBooking: activityBookings
): Promise<activityBookings> {
  console.log("post-route-data", newActivityBooking);
  const response = await fetch(`http://localhost:8080/activityParticipants`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newActivityBooking),
  });
  if (!response.ok) {
    throw new Error("An error occured while updating the movie");
  }
  return await (response.json() as Promise<activityBookings>);
}

export { fetchBookingData, postBooking };
