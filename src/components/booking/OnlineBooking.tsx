import { useEffect, useState } from "react";
import BookingInputForm from "./bookingView/BookingInputForm";
import DateForm, { Value } from "./DateForm";
import CustomerForm from "./CustomerForm";
import { postReservation } from "../services/reservationServie";
import { postBooking } from "../services/activityBookingService";
import ExistingBookings from "./ExistingBookings";
import {
  LaneInput,
  ReservationInterface,
  ActivityBookingsInterface,
  CustomerInterface,
} from "./bookingInterfaces";
//import { postBooking } from "../services/activityBookingService";
import fetchActivityType from "../services/activityTypeService";
import { ActivityType } from "../services/activityTypeService";

export interface BookingData {
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
}

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
}

// (2) [{…}, {…}]
// 0: {activity: 'Bowling', date: '2024-05-23', time: '08:00', endTime: '10:00', lanes: 3, …}
// 1: {activity: 'Børne Bowling', date: '2024-05-23', time: '09:00', endTime: '11:00', lanes: 4, …}
// length: 2
// [[Prototype]]: Array(0)

const components = [CustomerForm, DateForm, BookingInputForm] as ((props: OnlineBookingProps) => JSX.Element)[];

export default function OnlineBooking() {
  const [bookingData, setBookingData] = useState<BookingData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [thisCustomer, setThisCustomer] = useState<CustomerInterface>({
    id: 0,
    name: "",
    phone: ""
  });
  const [bookingDate, setBookingDate] = useState<Value>(new Date());
  const [formattedDate, setFormattedDate] = useState<Date | null>(null);
  const [ActivityType, setActivityType] = useState<ActivityType[]>([]);

  useEffect(() => {
    async function getActivityType() {
      const data = await fetchActivityType();
      setActivityType(data);
    }
    getActivityType();
  }, []);

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
    setBookingData([...bookingData, { ...newBooking, id: bookingData.length + 1 }]);
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
      reservationDate: formattedDate
    };
    // console.log("newRESERVATION                             ", newReservation);
    

    const reservationData = await postReservation(newReservation);

    console.log("Here is the posted reservation!");
    console.log(reservationData);

    for (const activityData of bookingData) {
      if (activityData.lanes != null) {
        console.log("We have lanes!");
        const laneBookingsArray = await createActivityObject(
          "lanes",
          activityData,
          reservationData
        );

        if (!laneBookingsArray) {
          console.log(
            "laneBookingsArray ot acitivityData.bowlingParticiapnts are null"
          );
          return;
        }
        // ----------------------------------- where we will make activity participants ----------------
        console.log("this is the activity data");
        console.log(activityData);

        laneBookingsArray.forEach((laneBooking, index) => {
          if (!laneBookingsArray || !activityData.bowlingParticipants) {
            console.log(
              "laneBookingsArray ot acitivityData.bowlingParticiapnts are null"
            );
            return;
          }

          // NÆSTSE STORE PROBLEM: laneBooking.id "findes ikke" pga id kan være null i dens interface! Men id'et ER DER!

          const lanesInputData = activityData.bowlingParticipants[index];
          const paricipantNamesArray = lanesInputData.textInputValues;

          console.log("Participants:", paricipantNamesArray);
          console.log("ActivityBooking:", laneBooking);

          if (paricipantNamesArray) {
            console.log("Lane input index", index);
            console.log("Participants:", paricipantNamesArray);
            paricipantNamesArray.forEach((participant) => {
              console.log("This is a participant", participant);
              //prepareActivityParticipantsForPosting(laneBooking, participant);
            });
          }
        });
        //we have to send the lanes ID AND thelaneBookingsArray tied to the ACTIVITY DATA? which means we have to do it in the loop.
        // prepateaActivityParticipantsForPosting(laneBookingsArray, activityData);
        console.log(laneBookingsArray);

        //--------------------------------------------------------------------------------------------------
      } else if (activityData.tables != null) {
        console.log("We have tables");
        createActivityObject("tables", activityData, reservationData);
      }
    }
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

  async function createActivityObject(tablesOrLanes: "tables" | "lanes", activityData: BookingData, reservationData: ReservationInterface) {
    const activityPostDataArray: ActivityBookingsInterface[] = [];

    // sets activity amount as number or undefined so it matches the bookindData interface.
    let activityAmount: number | undefined;

    // checks if the activity incluces lanes or tables, sets activityAmount equal to the given type
    if (tablesOrLanes === "lanes") {
      activityAmount = activityData.lanes;
    } else if (tablesOrLanes === "tables") {
      activityAmount = activityData.tables;
    }

    if (activityAmount === undefined) {
      console.error(`No valid ${tablesOrLanes} found in activityData`);
      return;
    }

    // sets an activity object and posts it for every lane selected on the activity booking
    for (let i = 0; i < activityAmount; i++) {
      const newActivity: ActivityBookingsInterface = {
        startTime: activityData.time,
        endTime: activityData.endTime,
        numberParticipants: 0,
        activity: {
          id: activityData.id!
        },
        reservation: reservationData
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
        <h1 className="text-4xl self-center font-bold text-pink-300">Book en aktivitet her!!</h1>
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
      <ExistingBookings filterDate={formattedDate} />
    </div>
  );
}
