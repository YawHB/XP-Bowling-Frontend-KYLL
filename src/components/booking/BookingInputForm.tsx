import BowlingForm from "./BowlingForm";
import KidsBowlingForm from "./KidsBowlingForm";
import AirhockeyForm from "./AirhockeyForm";
import DinnertableForm from "./DinnertableForm";

interface BookingInputFormProps {
  addBooking: (newBooking: BookingData) => void;
}

interface BookingData {
  id?: number;
  activity: string;
  date: string;
  time: string;
  lanes: number;
}

export default function BookingInputForm({ addBooking }: BookingInputFormProps) {
  return (
    <div>
      <h1 className="text-2xl self-center font-semibold">Booking</h1>
      <BowlingForm addBooking={addBooking}/>
      <KidsBowlingForm />
      <AirhockeyForm />
      <DinnertableForm />
    </div>
  );
}
