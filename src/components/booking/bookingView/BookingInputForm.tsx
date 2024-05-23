import BowlingForm from "./activityForms/BowlingForm";
import KidsBowlingForm from "./activityForms/KidsBowlingForm";
import AirhockeyForm from "./activityForms/AirhockeyForm";
import DinnertableForm from "./activityForms/DinnertableForm";
import BookingSelectActivity from "./BookingSelectActivity";
import BookingOverview from "./BookingOverview";
import { useState } from "react";
import { CustomerInterface } from "./CustomerForm";

interface FormProps {
  addBooking: (newBooking: BookingData) => void;
}
type FormComponents = {
  [key: string]: React.ComponentType<FormProps>;
};

interface BookingInputFormProps {
  addBooking: (newBooking: BookingData) => void;
  bookingData: BookingData[];
  thisCustomer: CustomerInterface | undefined;

}

interface BookingData {
  id?: number;
  activity: string;
  date: string;
  time: string;
  lanes?: number;
  tables?: number;
}

const forms: FormComponents = { bowling: BowlingForm, kidsBowling: KidsBowlingForm, airHockey: AirhockeyForm, restaurant: DinnertableForm };

export default function BookingInputForm({ addBooking, bookingData }: BookingInputFormProps) {
  const [currentFormName, setCurrentFormName] = useState<string>("bowling");

  function chooseInputForm(formName: string) {
    setCurrentFormName(formName);
    console.log(formName);
  }

  const CurrentForm = forms[currentFormName];

  return (
    <div>
      <BookingSelectActivity chosenForm={chooseInputForm} />
      <h1 className="text-2xl self-center font-semibold">Booking</h1>
      <CurrentForm addBooking={addBooking} />
      <BookingOverview bookingData={bookingData} />
    </div>
  );
}
