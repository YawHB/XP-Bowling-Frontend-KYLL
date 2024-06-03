import { useState } from "react";
import {
  ActivitiesBookingEntityInterface,
  BookingData,
  AcitivtyMicroData,
  PreBookingDataInterface,
} from "../bookingInterfaces";
import createActivityObject from "../helperFunctions/createActivityData";

interface AirhockeyFormProps {
  addBooking: (newBooking: BookingData) => void;
  bookingsByDate: ActivitiesBookingEntityInterface[];
  formattedDate: Date;
}

export default function AirhockeyForm({
  addBooking,
  formattedDate,
}: AirhockeyFormProps) {
  const [startTime, setStartTime] = useState<string>("10:00");
  const [playTime, setPlayTime] = useState<number>(1);
  const [endTime, setEndTime] = useState<string>(calculatedEndTime("10:00", 1));
  const [tables, setLanes] = useState<number>(1);
  const [duration, setDuration] = useState<number>(1);
  // ---------------------------------------------------------------

  function calculatedEndTime(startTime: string, playTime: number): string {
    const [hours, minutes] = startTime.split(":").map(Number);
    const endTime = new Date();
    endTime.setHours(hours + playTime);
    endTime.setMinutes(minutes);
    return endTime.toTimeString().slice(0, 5);
  }

  // console.log("Here is the bookings filtered by the hour", bookingsByHour);

  // Step 2: getAllTheActivitesInTheDataBase right!
  // Step 3: find out what is not taken offer that
  // Set 4 offer an available id? ----------------------------------------------------------------------------

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const newBookingMetaData: PreBookingDataInterface = {
      activity: "AIR_HOCKEY",
      time: startTime,
      endTime: endTime,
      tables: tables,
      duration: duration,
    };

    const activityDataArray = createActivityObject(newBookingMetaData);
    if (activityDataArray === undefined) {
      console.log("Activities Data Array was undefined!");
      return;
    }

    createBookingData(activityDataArray);
  }


  function createBookingData(activityDataArray: AcitivtyMicroData[]) {
    const newBooking: BookingData = {
      activity: "AIR_HOCKEY",
      date: formattedDate.toISOString().split("T")[0],
      time: startTime,
      endTime: endTime,
      tables: tables,
      duration: duration,
      activitiesData: activityDataArray,
    };

    console.log("This is new booking DATA: ", newBooking);

    addBooking(newBooking);
  }

  
  function handleTableSelectChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    setLanes(Number(event.target.value));
  }

  function handlePlayTimeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const newPlayTime = Number(event.target.value);
    setDuration(newPlayTime);
    setPlayTime(newPlayTime);
    setEndTime(calculatedEndTime(startTime, newPlayTime));
  }

  function handleStartTimeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const newStartTime = event.target.value;
    setStartTime(newStartTime);
    setEndTime(calculatedEndTime(newStartTime, playTime));
  }

  return (
    <form onSubmit={handleSubmit} className="container mx-auto pr-4 py-8 max-w-screen-md">
      <section className="flex flex-wrap -mx-2">
        <div className="w-full px-2 mb-4">
          <h2 className="text-2xl font-bold">Airhockey</h2>
        </div>
        <div className="w-full flex flex-wrap">
          <div className="w-full sm:w-1/4 px-2 mb-4 sm:mb-0">
            <label htmlFor="tableSelector" className="block mb-2 text-xl font-medium">
              Borde
            </label>
            <select id="tableSelector" onChange={handleTableSelectChange} value={tables} className="m-0 bg-black text-white block w-full p-2 border border-gray-300 rounded-md text-black">
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
            </select>
          </div>

          <div className="w-full sm:w-1/4 px-2 mb-4 sm:mb-0">
            <label htmlFor="playTimeSelector" className="block mb-2 text-xl font-medium">
              Timer
            </label>
            <select id="playTimeSelector" onChange={handlePlayTimeChange} value={playTime} className="m-0 bg-black text-white block w-full p-2 border border-gray-300 rounded-md text-black">
              <option value={1}>1</option>
              <option value={2}>2</option>
            </select>
          </div>

          <div className="w-full sm:w-1/4 px-2 mb-4 sm:mb-0">
            <label htmlFor="startTime" className="block mb-2 text-xl font-medium">
              Start Tid
            </label>
            <select id="startTime" onChange={handleStartTimeChange} value={startTime} className="m-0 bg-black text-white block w-full p-2 border border-gray-300 rounded-md text-black">
              <option value={"10:00"}>10:00</option>
              <option value={"11:00"}>11:00</option>
              <option value={"12:00"}>12:00</option>
              <option value={"13:00"}>13:00</option>
              <option value={"14:00"}>14:00</option>
              <option value={"15:00"}>15:00</option>
              <option value={"16:00"}>16:00</option>
              <option value={"17:00"}>17:00</option>
              <option value={"18:00"}>18:00</option>
              <option value={"19:00"}>19:00</option>
              <option value={"20:00"}>20:00</option>
            </select>
          </div>
        </div>

        <div className="w-full px-2 mb-4">
          <button
            type="submit"
            className="w-32 mt-4 p-2 text-lg font-bold text-white whitespace-nowrap bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 border-2 border-yellow-300"
          >
            Tilføj
          </button>
        </div>
      </section>
    </form>
  );


  // return (
  //   <form onSubmit={handleSubmit} className="container mx-auto pr-4 py-8 max-w-screen-md">
  //     <section className="flex flex-wrap -mx-2">
  //       <div className="w-full px-2 mb-4">
  //         <h2 className="text-2xl font-bold">Airhockey</h2>
  //       </div>
  //       <div className="w-full sm:w-1/4 px-2 mb-4 sm:mb-0">
  //         <label htmlFor="tableSelector" className="block mb-2 text-sm font-medium">
  //           Borde
  //         </label>
  //         <select id="tableSelector" onChange={handleTableSelectChange} value={tables} className="m-0 bg-black text-white block w-full p-2 border border-gray-300 rounded-md text-black">
  //           <option value={1}>1</option>
  //           <option value={2}>2</option>
  //           <option value={3}>3</option>
  //           <option value={4}>4</option>
  //           <option value={5}>5</option>
  //           <option value={6}>6</option>
  //         </select>
  //       </div>

  //       <div className="w-full sm:w-1/4 px-2 mb-4 sm:mb-0">
  //         <label htmlFor="playTimeSelector" className="block mb-2 text-sm font-medium">
  //           Timer
  //         </label>
  //         <select id="playTimeSelector" onChange={handlePlayTimeChange} value={playTime} className="m-0 bg-black text-white block w-full p-2 border border-gray-300 rounded-md text-black">
  //           <option value={1}>1</option>
  //           <option value={2}>2</option>
  //         </select>
  //       </div>

  //       <div title="selectStartTime" className="w-full sm:w-1/4 px-2 mb-4 sm:mb-0">
  //         <label htmlFor="startTime" className="block mb-2 text-sm font-medium">
  //           Start Tid
  //         </label>
  //         <select id="playTimeSelector" onChange={handleStartTimeChange} value={startTime} className="m-0 bg-black text-white block w-full p-2 border border-gray-300 rounded-md text-black">
  //           <option value={"10:00"}>10:00</option>
  //           <option value={"11:00"}>11:00</option>
  //           <option value={"12:00"}>12:00</option>
  //           <option value={"13:00"}>13:00</option>
  //           <option value={"14:00"}>14:00</option>
  //           <option value={"15:00"}>15:00</option>
  //           <option value={"16:00"}>16:00</option>
  //           <option value={"17:00"}>17:00</option>
  //           <option value={"18:00"}>18:00</option>
  //           <option value={"19:00"}>19:00</option>
  //           <option value={"20:00"}>20:00</option>
  //         </select>
  //       </div>

  //       <button
  //         type="submit"
  //         className="w-36 p-2 text-lg font-bold text-white whitespace-nowrap bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 border-2 border-yellow-300"
  //       >
  //         Tilføj
  //       </button>
  //     </section>
  //   </form>
  // );
}
