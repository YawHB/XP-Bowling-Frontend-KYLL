import { useState } from "react";
import BookingInputForm from "./bookingView/BookingInputForm";
import DateForm, { Value } from "./DateForm";
import CustomerForm from "./CustomerForm";
import { postReservation } from "../services/reservationServie";
//import { postBooking } from "../services/activityBookingService";

export interface BookingData {
  id?: number;
  activity: string;
  date: string;
  time: string;
  endTime?: string;
  lanes?: number;
  tables?: number;
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
  name: string;
  phone: string;
}

interface ReservationInterface {
  totalPrice: number;
  customer: CustomerInterface;
  reservationDate: Date;
}

export interface OnlineBookingProps {
  addBooking: (newBooking: BookingData) => void;
  bookingData: BookingData[];
  thisCustomer: CustomerInterface;
  setThisCustomer: (customer: CustomerInterface) => void;
  bookingDate: Value;
  setBookingDate: (value: Value) => void;
  setFormattedDate: (date: Date | null) => void;
}

// (2) [{…}, {…}]
// 0: {activity: 'Bowling', date: '2024-05-23', time: '08:00', endTime: '10:00', lanes: 3, …}
// 1: {activity: 'Børne Bowling', date: '2024-05-23', time: '09:00', endTime: '11:00', lanes: 4, …}
// length: 2
// [[Prototype]]: Array(0)

const components = [CustomerForm, DateForm, BookingInputForm] as ((
  props: OnlineBookingProps
) => JSX.Element)[];

export default function OnlineBooking() {
  const [bookingData, setBookingData] = useState<BookingData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [thisCustomer, setThisCustomer] = useState<CustomerInterface>({
    id: 0,
    name: "",
    phone: "",
  });
  const [bookingDate, setBookingDate] = useState<Value>(new Date());
  const [formattedDate, setFormattedDate] = useState<Date | null>(null);

  function handleNext() {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % components.length);
  }

  function handleReset() {
    setCurrentIndex(0);
    setBookingData([]);
    setThisCustomer({ id: 0, name: "", phone: "" });
    setBookingDate(new Date());
  }

  function addBooking(newBooking: BookingData) {
    setBookingData([
      ...bookingData,
      { ...newBooking, id: bookingData.length + 1 },
    ]);
  }

  async function handleSuperSubmit() {
    console.log("SuperSubmit: ");
    console.log("Aktiviteter: ", bookingData);
    console.log("Kunde: ", thisCustomer);
    console.log("Dato: ", formattedDate);

    if (!formattedDate) {
      console.error("No valid date selected");
      return;
    }

    if (!thisCustomer || !bookingDate) {
      console.error("Customer or booking date is missing");
      return;
    }

    const newReservation: ReservationInterface = {
      totalPrice: 0,
      customer: thisCustomer,
      reservationDate: formattedDate,
    };

    const reservationData = await postReservation(newReservation);

    for (const activityData of bookingData) {
      if (activityData.lanes != null) {
        console.log("We have lanes!");
        createActivityObject("lanes", activityData, reservationData);
      } else if (activityData.tables != null) {
        console.log("We have tables");
        createActivityObject("lanes", activityData, reservationData);
      }

      console.log("this is the data");
      console.log(activityData);

      //const activityData = await postBooking(newActivity);
    }

    console.log(reservationData);
  }

  function createActivityObject(
    tablesOrLanes: string,
    activityData: BookingData,
    reservationData: ReservationInterface
  ) {
    let activityAmount;
    if (tablesOrLanes === "lanes") {
      activityAmount = activityData.lanes;
    } else if (tablesOrLanes === "tables") {
      activityAmount = activityData.tables;
    }

    // Jeg har problemer med at tables og lanes kan være undefined, selv om jeg ved 1 af delene ikke er undefined.
    // Det samme gælder ID'et fra min activity... selvom jeg ved den ikke kan være null...
    // så kan jeg putte de der DELTAGERE PÅ...

    for (let i = 0; i <= activityAmount; i++) {
      const newActivity: ActivityBookingsInterface = {
        startTime: activityData.time,
        endTime: activityData.endTime,
        numberParticipants: activityAmount,
        activity: {
          id: activityData.id,
        },
        reservation: reservationData,
      };

      console.log(newActivity);
    }
  }

  const CurrentComponent = components[currentIndex];

  return (
    <div className="flex w-screen">
      <div>
        <h1 className="text-4xl self-center font-bold text-pink-300">
          Book en aktivitet her!!
        </h1>
      </div>
      <div>
        <CurrentComponent
          addBooking={addBooking}
          bookingData={bookingData}
          thisCustomer={thisCustomer}
          setThisCustomer={setThisCustomer}
          bookingDate={bookingDate}
          setBookingDate={setBookingDate}
          setFormattedDate={setFormattedDate}
        />
        <button className="bg-black" onClick={handleNext}>
          Next
        </button>
        <button className="bg-black" onClick={handleReset}>
          Reset
        </button>
      </div>
      <div>
        <button className="bg-black" onClick={handleSuperSubmit}>
          Send Booking
        </button>
      </div>
    </div>
  );
}