import { useState } from "react";
import DatePicker from "react-date-picker";
import "./DateForm.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function DateForm() {
  const [bookingDate, setBookingDate] = useState<Value>(new Date());

  return (
    <div>
      <DatePicker onChange={setBookingDate} value={bookingDate} />
4    </div>
  );
}
