
  import { postReservation } from "../../services/reservationServie";



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





  // Activity Participant

  interface activityBooking {
    id: number;
  }

  interface activityParticipants {
    name: string;
    activityBooking: activityBooking;
  }

  // Reservation Interface

  interface Customer {
    id: number;
  }

  interface ReservationData {
    totalPrice: number;
    customer: Customer;
    reservationDate: Date;
  }




function testSubmitBooking() {
  // Booking Interface


  const newBooking: activityBookings = {
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



  const newParticipant: activityParticipants = {
    name: "Lasse Odder",
    activityBooking: {
      id: 5,
    },
  };

  const newReservation: ReservationData = {
    totalPrice: 400.0,
    customer: {
      id: 1,
    },
    // DET SKAL VÆRE EN DATE FOR REASONS...
    reservationDate: new Date("2024-05-22"),
  };

SubmitBookingEvent(newReservation);
}

function SubmitBookingEvent(newReservation: ReservationData) {
  const newReservationData = postReservation(newReservation);
  console.log(newReservationData);
}

export { testSubmitBooking };

// Lav en metode som poster reservation og får ID´et.
// Lav en metode som poster en activity som ikke er bowling/kidsbowling
// Lav en metode som poster en bowling activit som den ved IKKE har particiapnts
// Lav en metode som poser en bowling activity som den ved HAR participants, HUSK gem id'erne for hver post!
// Lav en metode som poster activityParticipants... sørg for at de bliver fordelt på de rigtige lanes...
