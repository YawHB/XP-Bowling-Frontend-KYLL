interface BookingData {
  id?: number;
  activity: string;
  date: string;
  time: string;
  endTime: string;
  lanes?: number;
  tables?: number;
  price?: number;
  bowlingParticipants?: LaneInput[];
  duration?: number;
  activitiesData?: AcitivtyMicroData[];
}

interface PreBookingDataInterface {
  id?: number;
  activity: string;
  time: string;
  endTime: string;
  lanes?: number;
  tables?: number;
  bowlingParticipants?: LaneInput[];
  duration?: number;
}

interface LaneInput {
  laneNumber: number;
  textInputValues: string[];
}

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

// The data where the activity.id is assigned.
interface AcitivtyMicroData {
  id?: number;
  startTime: string;
  endTime: string;
  numberParticipants: number;
  activity: Activity;
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
  PreBookingDataInterface,
  AcitivtyMicroData,
  BookingData,
  LaneInput,
  Reservation,
  Activity,
  ActivityBookingsInterface,
  ReservationInterface,
  CustomerInterface,
  ActivitiesBookingEntityInterface,
};
