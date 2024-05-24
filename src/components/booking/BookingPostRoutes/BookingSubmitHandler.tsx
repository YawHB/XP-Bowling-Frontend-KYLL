import { postReservation } from "../../services/reservationServie";

interface Activity {
  id: number;
}

interface Reservation {
  id: number;
}

interface ActivityBookingsInterface {
  startTime: string;
  endTime: string;
  numberParticipants: number;
  activity: Activity;
  reservation: Reservation;
}

// Activity Participant

interface ActivityBooking {
  id: number;
}

interface ActivityParticipantsInterface {
  name: string;
  activityBooking: ActivityBooking;
}

// Reservation Interface

interface CustomerInterface {
  id: number;
  name: string;
  phone: string;
}

interface ReservationInterface {
  totalPrice: number;
  customer: CustomerInterface;
  reservationDate: Date;
}

function testSubmitBooking() {
  // Booking Interface

  const newBooking: ActivityBookingsInterface = {
    startTime: "21:00",
    endTime: "22:00",
    numberParticipants: 5,
    activity: {
      id: 1,
    },
    reservation: {
      id: 1,
    },
  };

  const newParticipant: ActivityParticipantsInterface = {
    name: "Lasse Odder",
    activityBooking: {
      id: 5,
    },
  };

  const newReservation: ReservationInterface = {
    totalPrice: 400.0,
    customer: {
      id: 1,
    },
    // DET SKAL VÆRE EN DATE FOR REASONS...
    reservationDate: new Date("2024-05-22"),
  };

  SubmitBookingEvent(newReservation);
}

async function SubmitBookingEvent(newReservation: ReservationInterface) {
  const newReservationData = await postReservation(newReservation);
  console.log("Ny reservation posted:");
  console.log(newReservationData);
}

export type {
  Customer,
  Reservation,
  Activity,
  ActivityBooking,
  ActivityBookingsInterface,
  ReservationInterface,
};

export { testSubmitBooking };

// Lav en metode som poster reservation og får ID´et.
// Lav en metode som poster en activity som ikke er bowling/kidsbowling
// Lav en metode som poster en bowling activit som den ved IKKE har particiapnts
// Lav en metode som poser en bowling activity som den ved HAR participants, HUSK gem id'erne for hver post!
// Lav en metode som poster activityParticipants... sørg for at de bliver fordelt på de rigtige lanes...
