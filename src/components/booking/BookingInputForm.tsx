import BowlingForm from "./BowlingForm";
import KidsBowlingForm from "./KidsBowlingForm";
import AirhockeyForm from "./AirhockeyForm";
import DinnertableForm from "./DinnertableForm";

export default function BookingInputForm() {
  return (
    <div>
      <h1 className="text-2xl self-center font-semibold">Booking</h1>
      <BowlingForm />
      <KidsBowlingForm />
      <AirhockeyForm />
      <DinnertableForm />
    </div>
  );
}
