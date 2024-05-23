import { useState } from "react";
import BookingInputForm from "./BookingInputForm";
import DateForm from "./DateForm";
import CustomerForm from "./CustomerForm";
import { CustomerInterface } from "./CustomerForm";


export interface BookingData {
  id?: number;
  activity: string;
  date: string;
  time: string;
  endTime?: string;
  lanes?: number;
  tables?: number;
}

const components = [CustomerForm, DateForm, BookingInputForm];

export default function OnlineBooking() {
  const [bookingData, setBookingData] = useState<BookingData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [thisCustomer, setThisCustomer] = useState<CustomerInterface>();


  function handleNext() {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % components.length);
  }

  function handleReset() {
    setCurrentIndex(0);
    setBookingData([]);
  }

  function addBooking(newBooking: BookingData) {
    setBookingData([...bookingData, { ...newBooking, id: bookingData.length + 1 }]);
  }

  function handleSuperSubmit() {
    console.log(bookingData);
    console.log(thisCustomer);
    
  }

  const CurrentComponent = components[currentIndex];


  return (
    <div className="flex w-screen">
      <div>
        <h1 className="text-4xl self-center font-bold text-pink-300">Book en aktivitet her!!</h1>
      </div>
      <div>
        <CurrentComponent addBooking={addBooking} bookingData={bookingData} thisCustomer={thisCustomer} setThisCustomer={setThisCustomer} />
        <button onClick={handleNext}>Next</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div>
        <button onClick={handleSuperSubmit}>Send Booking</button>
      </div>
    </div>
  );
}
