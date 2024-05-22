import BowlingForm from "./BowlingForm";
import KidsBowlingForm from "./KidsBowlingForm";
import AirhockeyForm from "./AirhockeyForm";
import DinnertableForm from "./DinnertableForm";
import BookingSelectActivity from "./BookingSelectActivity";
import BookingOverview from "./BookingOverview";

interface BookingInputFormProps {
  addBooking: (newBooking: BookingData) => void;
  bookingData: BookingData[];
}

interface BookingData {
  id?: number;
  activity: string;
  date: string;
  time: string;
  lanes?: number;
  tables?: number;
}

export default function BookingInputForm({ addBooking, bookingData }: BookingInputFormProps) {
  
  return (
    <div>
      <BookingSelectActivity />
      <h1 className="text-2xl self-center font-semibold">Booking</h1>
      <BowlingForm addBooking={addBooking}/>
      <KidsBowlingForm addBooking={addBooking}/>
      <AirhockeyForm addBooking={addBooking} />
      <DinnertableForm addBooking={addBooking}/>
      <BookingOverview bookingData={bookingData} />
    </div>
  );
}
