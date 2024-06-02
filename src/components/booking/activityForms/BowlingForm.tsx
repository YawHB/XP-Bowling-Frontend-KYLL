import { useState, useEffect } from "react";
import {
  AcitivtyMicroData,
  ActivitiesBookingEntityInterface,
  BookingData,
  PreBookingDataInterface,
} from "../bookingInterfaces";
import createActivityObject from "../helperFunctions/createActivityData";

interface BowlingFormProps {
  addBooking: (newBooking: BookingData) => void;
  bookingsByDate: ActivitiesBookingEntityInterface[];
  formattedDate: Date;
}

interface LaneInput {
  laneNumber: number;
  textInputValues: string[];
}

export default function BowlingForm({
  addBooking,
  formattedDate,
}: BowlingFormProps) {
  const [startTime, setStartTime] = useState<string>("08:00");
  const [duration, setDuration] = useState<number>(1);
  const [playTime, setPlayTime] = useState<number>(1);
  const [endTime, setEndTime] = useState<string>(calculatedEndTime("08:00", 1));
  const [lanes, setLanes] = useState<number>(1);
  const [laneInputs, setLaneInputs] = useState<LaneInput[]>(
    Array.from({ length: lanes }, (_, laneIndex) => ({
      laneNumber: laneIndex + 1,
      textInputValues: Array(6).fill(""), // Assuming 6 inputs per lane
    }))
  );
  const [addNames, setAddNames] = useState<boolean>(false);

  // console.log(formattedDate);

  // --------------------------------------------------------------------------------------------------------------------------

  // -------------------------------------- booking filter
  // console.log("Here is filtered by date: ", bookingsByDate);
  // console.log("Here is filtered by type: ", bookingsByType);
  // console.log("Here is the bookings filtered by the hour", bookingsByHour);

  //...

  // Løsningen for get time.... min start slut vs. deres start slut.

  // Step 2: getAllTheActivitesInTheDataBase right!
  // Step 3: find out what is not taken offer that
  // Set 4 offer an available id? ----------------------------------------------------------------------------

  // Jeg laver en tøse løsning og går direkte til "ledige" bowlingbaner, og hiver et id fra listen. Jeg burde næsten gemme/modificere den liste i en parrent...
  // ...så ville jeg kunne fortsætte der ud af, men det er lidt farligt. Start lokalt og kør der udaf, demo vare alt for kort tid anyway.

  // ------------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    setLaneInputs(
      Array.from({ length: lanes }, (_, laneIndex) => ({
        laneNumber: laneIndex + 1,
        textInputValues: Array(6).fill(""), // Assuming 6 inputs per lane
      }))
    );
  }, [lanes]);

  function calculatedEndTime(startTime: string, playTime: number): string {
    const [hours, minutes] = startTime.split(":").map(Number);
    const endTime = new Date();
    endTime.setHours(hours + playTime);
    endTime.setMinutes(minutes);
    return endTime.toTimeString().slice(0, 5);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const newBookingMetaData: PreBookingDataInterface = {
      activity: "BOWLING_ADULT",
      time: startTime,
      endTime: endTime,
      lanes: lanes,
      bowlingParticipants: laneInputs,
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
      activity: "BOWLING_ADULT",
      date: formattedDate.toISOString().split("T")[0],
      time: startTime,
      endTime: endTime,
      lanes: lanes,
      bowlingParticipants: laneInputs,
      duration: duration,
      activitiesData: activityDataArray,
    };

    console.log("This is new booking DATA: ", newBooking);

    addBooking(newBooking);
  }

  function handleLaneSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
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

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAddNames(event.target.checked);
  }

  const handleInputChange = (
    laneIndex: number,
    inputIndex: number,
    value: string
  ) => {
    const updatedLaneInputs = laneInputs.map((lane, lIndex) => {
      if (lIndex === laneIndex) {
        const updatedTextInputValues = lane.textInputValues.map(
          (input, iIndex) => {
            if (iIndex === inputIndex) {
              return value;
            }
            return input;
          }
        );
        return { ...lane, textInputValues: updatedTextInputValues };
      }
      return lane;
    });

    setLaneInputs(updatedLaneInputs);
  };

  // ---------------------------------------- lane inputs
  // console.log("This is laneInputs:");
  // console.log(laneInputs);

  return (
    <form onSubmit={handleSubmit} className="container mx-auto pr-4 py-8 max-w-screen-md">
      <section className="flex flex-wrap -mx-2">
        <div className="w-full px-2 mb-4">
          <h2 className="text-2xl font-bold">Bowling</h2>
        </div>
        <div className="w-full sm:w-1/4 px-2 mb-4 sm:mb-0">
          <label htmlFor="laneSelector" className="block mb-2 text-xl font-medium">
            Baner
          </label>
          <select id="laneSelector" onChange={handleLaneSelectChange} value={lanes} className="ml-0 block w-full p-2 border border-gray-300 rounded-md bg-black text-white">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
        </div>

        <div className="w-full sm:w-1/4 px-2 mb-4 sm:mb-0">
          <label htmlFor="playTimeSelector" className="block mb-2 text-xl font-medium">
            Timer
          </label>
          <select id="playTimeSelector" onChange={handlePlayTimeChange} value={playTime} className="ml-0 bg-black text-white block w-full p-2 border border-gray-300 rounded-md">
            <option value={1}>1</option>
            <option value={2}>2</option>
          </select>
        </div>

        <div title="selectStartTime" className="w-full sm:w-1/4 px-2 mb-4 sm:mb-0">
          <label htmlFor="startTime" className="block mb-2 text-xl font-medium">
            Start Tid
          </label>
          <select id="startTime" onChange={handleStartTimeChange} value={startTime} className="ml-0 bg-black text-white block w-full p-2 border border-gray-300 rounded-md">
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

        <div className="w-full sm:w-1/4 px-2 mb-4 sm:mb-0">
          <label className="block mb-2 text-xl font-medium">Tilføj navne</label>
          <input type="checkbox" onChange={handleCheckboxChange} className="ml-0" />
        </div>
      </section>

      {addNames && (
        <div className="mt-4">
          {laneInputs.map((lane, laneIndex) => (
            <section key={laneIndex} className="flex flex-wrap -mx-2 mt-4">
              {lane.textInputValues.map((inputValue, index) => (
                <div key={index} className="w-full sm:w-1/2 px-2 mb-4">
                  <label className="block mb-2 text-sm font-medium">
                    Navn {index + 1} (Bane {lane.laneNumber})
                  </label>
                  <input
                    type="text"
                    className="block w-full p-2 border border-gray-300 rounded-md text-black"
                    placeholder={`Enter name ${index + 1}`}
                    value={inputValue}
                    onChange={(e) => handleInputChange(laneIndex, index, e.target.value)}
                  />
                </div>
              ))}
            </section>
          ))}
        </div>
      )}

      <button
        type="submit"
        className="w-36 p-2 text-lg font-bold text-white whitespace-nowrap bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 border-2 border-yellow-300"
      >
        Tilføj
      </button>
    </form>
  );
}
