import { useEffect, useState } from "react";
import BookingInputForm from "./bookingView/BookingInputForm";
import DateForm, { Value } from "./DateForm";
import CustomerForm from "./CustomerForm";
import { postReservation } from "../services/reservationServie";
import { postBooking } from "../services/activityBookingService";
import { getFilteredBookings } from "./ExistingBookingsTypescript";
import {
  BookingData,
  ReservationInterface,
  ActivityBookingsInterface,
  CustomerInterface,
} from "./bookingInterfaces";
import fetchActivityType from "../services/activityTypeService";
import { ActivityType } from "../services/activityTypeService";
import SuccessMessage from "../toasters/SuccesToaster";

export interface OnlineBookingProps {
  addBooking: (newBooking: BookingData) => void;
  bookingData: BookingData[];
  setBookingData: (bookingData: BookingData[]) => void;
  thisCustomer: CustomerInterface;
  setThisCustomer: (customer: CustomerInterface) => void;
  bookingDate: Value;
  setBookingDate: (value: Value) => void;
  setFormattedDate: (date: Date | null) => void;
  activityType: ActivityType[];
  bookingsByDate: ActivityBookingsInterface[];
  formattedDate: Date | null;
}

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
  const [ActivityType, setActivityType] = useState<ActivityType[]>([]);
  const [bookingsByDate, setBookingsByDate] = useState<
    ActivityBookingsInterface[]
  >([]);

  useEffect(() => {
    async function getActivityType() {
      const data = await fetchActivityType();
      setActivityType(data);
    }
    getActivityType();
  }, []);

  // en useeffect -- når formatted date bliver sat. kører vi så set booking.
  useEffect(() => {
    async function getBookingsByDate() {
      const filteredBookingsData = await getFilteredBookings(formattedDate);
      setBookingsByDate(filteredBookingsData);
    }
    getBookingsByDate();
  }, [formattedDate]);

  // console.log("dato: ", formattedDate, "filterede bookings: ", bookingsByDate);

  function handleNext() {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % components.length);
  }

  //const
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

    let price = 0;
    bookingData.forEach((activity) => {
      price += activity.price ?? 0;
    });

    const newReservation: ReservationInterface = {
      totalPrice: price,
      customer: thisCustomer,
      reservationDate: formattedDate,
    };

    const reservationData = await postReservation(newReservation);

    console.log("Here is the posted reservation!");
    console.log(reservationData);

    for (const activityData of bookingData) {
      const laneBookingsArray = await createObjectsActivityPost(
        activityData,
        reservationData
      );

      console.log(laneBookingsArray);

      //   const laneBookingsArray = await createObjectsActivityPost(

      //   if (!laneBookingsArray) {
      //     console.log(
      //       "laneBookingsArray ot acitivityData.bowlingParticiapnts are null"
      //     );
      //     return;
      //   }
      //   // ----------------------------------- where we will make activity participants ----------------
      //   console.log("this is the activity data");
      //   console.log(activityData);

      //   laneBookingsArray.forEach((laneBooking, index) => {
      //     if (!laneBookingsArray || !activityData.bowlingParticipants) {
      //       console.log(
      //         "laneBookingsArray ot acitivityData.bowlingParticiapnts are null"
      //       );
      //       return;
      //     }

      //   const lanesInputData = activityData.bowlingParticipants[index];
      //   const paricipantNamesArray = lanesInputData.textInputValues;

      //   // console.log("Participants:", paricipantNamesArray);
      //   // console.log("ActivityBooking:", laneBooking);

      //   if (paricipantNamesArray) {
      //     console.log("Lane input index", index);
      //     console.log("Participants:", paricipantNamesArray);
      //     paricipantNamesArray.forEach((participant) => {
      //       console.log("This is a participant", participant);
      //       //prepareActivityParticipantsForPosting(laneBooking, participant);
      //     });
      //   }
      // });
    }

    // All boookings completed:

    SuccessMessage({ messageString: "Du har oprettet en ny booking!" });
  }

  // interface activityBooking {
  //   id: number;
  // }

  // interface activityParticipants {
  //   name: string;
  //   activityBooking: activityBooking;
  // }

  // function prepareActivityParticipantsForPosting( laneBooking: ActivityBookingsInterface, textInput: participant) {
  //   const newParticipantObject: participant {
  //     activity:{
  //       id: laneBooking.id,
  //     },
  //     name: textInput
  //   };
  //   postParticipant(newParticipantObject);
  // }

  async function createObjectsActivityPost(
    bookingDataActivity: BookingData,
    reservationData: ReservationInterface
  ) {
    console.log("Create Activity Object - all the data: ", bookingDataActivity);

    const activityPostDataArray: ActivityBookingsInterface[] = [];

    if (bookingDataActivity.activitiesData === undefined) {
      console.error(`No valid ${bookingDataActivity} found`);
      return;
    }

    // sets an activity object and posts it for every lane selected on the activity booking
    for (const dataForActivityBooking of bookingDataActivity.activitiesData) {
      // her bliver id indsat men ID'et er fælles for alle i loopet!
      const newActivity: ActivityBookingsInterface = {
        startTime: dataForActivityBooking.startTime,
        endTime: dataForActivityBooking.endTime,
        numberParticipants: dataForActivityBooking.numberParticipants,
        activity: {
          id: dataForActivityBooking.activity.id,
        },
        reservation: reservationData,
      };
      const newActivityData = await sendActivtyToPost(newActivity);
      activityPostDataArray.push(newActivityData);
    }
    return activityPostDataArray;
  }

  async function sendActivtyToPost(activity: ActivityBookingsInterface) {
    return await postBooking(activity);
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
          setBookingData={setBookingData}
          thisCustomer={thisCustomer}
          setThisCustomer={setThisCustomer}
          bookingDate={bookingDate}
          setBookingDate={setBookingDate}
          setFormattedDate={setFormattedDate}
          activityType={ActivityType}
          bookingsByDate={bookingsByDate}
          formattedDate={formattedDate}
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
