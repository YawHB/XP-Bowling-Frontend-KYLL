import BookingOverview from "./BookingOverview";
import BookingSelectActivity from "./BookingSelectActivity";

export default function Booking() {
   return (
     <div className="flex w-screen">
       <div className=" mx-auto px-4 py-8">
         <h1 className="text-4xl self-center font-bold text-pink-300">Book en aktivitet her!!</h1>
       </div>
       <div>
          <BookingSelectActivity />
       </div>
       <div>
        <BookingOverview />
       </div>
     </div>
   );
}
