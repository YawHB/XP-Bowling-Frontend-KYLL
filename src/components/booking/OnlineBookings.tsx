import BookingOverview from "./BookingOverview";
import BookingSelectActivity from "./BookingSelectActivity";
import BookingInputForm from "./BookingInputForm";
import DateForm from "./DateForm";
import { useState } from "react";
import CustomerForm from "./CustomerForm";

export interface BookingData {
  id?: number;
  activity: string;
  date: string;
  time: string;
  endTime?: string;
  lanes?: number;
  tables?: number;
}

export default function OnlineBooking() {
  const [bookingData, setBookingData] = useState<BookingData[]>([]);

  function addBooking(newBooking: BookingData) {
    setBookingData([
      ...bookingData,
      { ...newBooking, id: bookingData.length + 1 },
    ]);
  }

  console.log(bookingData);

  return (
    <div className="flex w-screen">
      <div className="">
        <h1 className="text-4xl self-center font-bold text-pink-300">
          Book en aktivitet her!!
        </h1>
      </div>
      <div>
        <CustomerForm />
      </div>
      <div>
        <DateForm />
      </div>
      <div>
        <BookingSelectActivity />
      </div>
      <div>
        <BookingOverview bookingData={bookingData} />
      </div>
      <div>
        <BookingInputForm addBooking={addBooking} />
      </div>
    </div>
  );
}
