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
  formattedDate: Date | null;
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
  formattedDate: Date | null;
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
    <div>
      <BookingSelectActivity chosenForm={chooseInputForm} />
      <h1 className="text-2xl self-center font-semibold">Booking</h1>
      <CurrentForm
        addBooking={addBooking}
        bookingsByDate={bookingsByDate}
        formattedDate={formattedDate}
      />
      <BookingOverview
        bookingData={bookingData}
        removeBooking={removeBooking}
        activityType={activityType}
      />
    </div>
  );
}
