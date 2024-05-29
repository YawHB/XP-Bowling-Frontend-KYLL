interface LaneInput {
  laneNumber: number;
  textInputValues: string[];
}

//------------------------------------------------------

interface ActivityType {
  id?: number;
  maxCapacity: number;
  type: string;
}

interface Activity {
  id: number;
  activityType?: ActivityType;
  activityName?: string;
  startTime?: string;
  endTime?: string;
}

interface Reservation {
  id?: number;
  totalPrice: number;
  customer: CustomerInterface;
  reservationDate: Date;
}

interface ActivityBookingsInterface {
  id?: number;
  startTime: string;
  endTime: string;
  numberParticipants: number;
  activity: Activity;
  reservation: Reservation;
}

interface ActivitiesBookingEntityInterface {
  id: number;
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
  ActivitiesBookingEntityInterface,
};
