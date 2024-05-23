// import { useState } from "react";
import DatePicker from "react-date-picker";
import "./DateForm.css";

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function DateForm({bookingDate, setBookingDate}: {bookingDate: Value, setBookingDate: (value: Value) => void})  {
  // const [bookingDate, setBookingDate] = useState<Value>(new Date());

  function checkDate(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    console.log(bookingDate);
  }


  return (
    <div>
      <DatePicker onChange={setBookingDate} value={bookingDate} />
      <button type="submit" onClick={checkDate}>Bekræft Dato</button>
    </div>
  );
}
