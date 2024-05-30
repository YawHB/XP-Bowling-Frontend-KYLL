import React from "react";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { da } from "date-fns/locale";
import "./DateForm.css";

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function DateForm({
  setFormattedDate,
}: {
  setFormattedDate: (date: Date | null) => void;
}) {
  const [bookingDate, setBookingDate] = useState<Value>(new Date());

  function checkDate(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();

    const date = convertToDate(bookingDate);
    setFormattedDate(date);

    if (date) {
      console.log(date.toISOString()); 
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
    <div>
      <DatePicker
        selected={convertToDate(bookingDate)}
        onChange={(date) => setBookingDate(date as Date)}
        className="bg-black text-white"
        dateFormat={"dd/MM/yyyy"}
        locale={da}
      />
      <button type="submit" className="bg-black" onClick={checkDate}>
        Bekræft Dato
      </button>
    </div>
  );
}
