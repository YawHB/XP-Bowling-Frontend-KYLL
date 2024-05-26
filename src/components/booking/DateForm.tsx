import DatePicker from "react-date-picker";
import "./DateForm.css";
//import { Value } from "./DateForm";
//import { OnlineBookingProps } from "./OnlineBooking";

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function DateForm({ bookingDate, setBookingDate, setFormattedDate }: { bookingDate: Value; setBookingDate: (value: Value) => void; setFormattedDate: (date: Date | null) => void }) {
  function checkDate(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();

    const date = convertToDate(bookingDate);
    setFormattedDate(date);

    if (date) {
      console.log(date.toISOString()); // or any other format you need
    } else {
      console.log("No valid date selected");
    }
  }

  function convertToDate(value: Value): Date | null {
    if (value instanceof Date) {
      return value;
    } else if (Array.isArray(value)) {
      return value[0] instanceof Date ? value[0] : null;
    }
    return null;
  }

  return (
    //   <div>
    //     {/* <DatePicker onChange={setBookingDate} value={bookingDate} /> */}
    //     <input type="date" onChange={(e) => setBookingDate(e.target.value)} value={bookingDate} />
    //     <button type="submit" className="bg-black" onClick={checkDate}>
    //       Bekræft Dato
    //     </button>
    //   </div>

    <div>
      <DatePicker onChange={setBookingDate} value={bookingDate} />
      <button type="submit" className="bg-black" onClick={checkDate}>
        Bekræft Dato
      </button>
    </div>
  );
}
