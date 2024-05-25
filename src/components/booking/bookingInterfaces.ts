interface LaneInput {
  laneNumber: number;
  textInputValues: string[];
}

//------------------------------------------------------
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

//-------------------------------------------------------

interface CustomerInterface {
  id: number;
  name?: string;
  phone?: string;
}

interface ReservationInterface {
  totalPrice: number;
  customer: CustomerInterface;
  reservationDate: Date;
}

export type {
  LaneInput,
  Reservation,
  Activity,
  ActivityBookingsInterface,
  ReservationInterface,
  CustomerInterface,
};
