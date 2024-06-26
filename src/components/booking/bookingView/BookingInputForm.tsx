import BowlingForm from "../activityForms/BowlingForm";
import KidsBowlingForm from "../activityForms/KidsBowlingForm";
import AirhockeyForm from "../activityForms/AirhockeyForm";
import DinnertableForm from "../activityForms/DinnertableForm";
import BookingSelectActivity from "./BookingSelectActivity";
import BookingOverview from "./BookingOverview";
import { useState } from "react";
import { CustomerInterface } from "../CustomerForm";
import { ActivityType } from "../../services/activityTypeService";
import {
  ActivitiesBookingEntityInterface,
  BookingData,
} from "../bookingInterfaces";

interface FormProps {
  addBooking: (newBooking: BookingData) => void;
  bookingsByDate: ActivitiesBookingEntityInterface[];
  formattedDate: Date;
}
type FormComponents = {
  [key: string]: React.ComponentType<FormProps>;
};

interface BookingInputFormProps {
  addBooking: (newBooking: BookingData) => void;
  bookingData: BookingData[];
  thisCustomer: CustomerInterface | undefined;
  setBookingData: (bookingData: BookingData[]) => void;
  activityType: ActivityType[];
  bookingsByDate: ActivitiesBookingEntityInterface[];
  formattedDate: Date;
}

const forms: FormComponents = {
  bowling: BowlingForm,
  kidsBowling: KidsBowlingForm,
  airHockey: AirhockeyForm,
  restaurant: DinnertableForm,
};

export default function BookingInputForm({
  addBooking,
  bookingData,
  setBookingData,
  activityType,
  bookingsByDate,
  formattedDate,
}: BookingInputFormProps) {
  const [currentFormName, setCurrentFormName] = useState<string>("bowling");

  function chooseInputForm(formName: string) {
    setCurrentFormName(formName);
    console.log(formName);
  }

  const CurrentForm = forms[currentFormName];

  function removeBooking(id: number) {
    const newBookingData = bookingData.filter((booking) => booking.id !== id);
    console.log(newBookingData);
    setBookingData(newBookingData);
  }

 return (
   <div className="flex">
     <div className="w-1/2 flex  flex-col">
       <BookingSelectActivity chosenForm={chooseInputForm} />
      
       <CurrentForm addBooking={addBooking} bookingsByDate={bookingsByDate} formattedDate={formattedDate} />
     </div>
     <div className="w-1/2 ml-4 w-full">
       <BookingOverview bookingData={bookingData} removeBooking={removeBooking} activityType={activityType} />
     </div>
   </div>
 );


}
