// Define the Customer interface
interface Customer {
  id: number;
}

// Define the main data structure interface
interface ReservationData {
  totalPrice: number;
  customer: Customer;
  reservationDate: Date;
}

async function postReservation(
  newReservation: ReservationData
): Promise<ReservationData> {
  console.log("post-route-data", newReservation);
  const response = await fetch(`http://localhost:8080/reservations`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newReservation),
  });
  if (!response.ok) {
    throw new Error("An error occured when posting the reservation");
  }
  return await (response.json() as Promise<ReservationData>);
}

export { postReservation };
