import BookingInputForm from "./BookingInputForm";

export default function Booking() {
  return (
    <div className="flex w-screen">
      <div className="">
        <h1 className="text-4xl self-center font-bold text-red-500">
          Book en aktivitet her!!
        </h1>
        <BookingInputForm />
      </div>
    </div>
  );
}
