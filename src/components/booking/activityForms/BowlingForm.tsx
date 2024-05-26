import { useState, useEffect } from "react";

interface BowlingFormProps {
  addBooking: (newBooking: BookingData) => void;
}

interface BookingData {
  id?: number;
  activity: string;
  date: string;
  time: string;
  endTime: string;
  lanes: number;
  bowlingParticipants?: LaneInput[]; 
  duration: number;
}

interface LaneInput {
  laneNumber: number;
  textInputValues: string[];
}

export default function BowlingForm({ addBooking }: BowlingFormProps) {
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


    const newBooking: BookingData = {
      activity: "BOWLING_ADULT",
      date: new Date().toISOString().split("T")[0],
      time: startTime,
      endTime: endTime,
      lanes: lanes,
      bowlingParticipants: laneInputs,
      duration: duration
    };
    addBooking(newBooking);
  }

  function handleLaneSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setLanes(Number(event.target.value));
  }

  function handlePlayTimeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const newPlayTime = Number(event.target.value);
    setDuration(newPlayTime)
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

  console.log("This is laneInputs:");
  console.log(laneInputs);

  return (
    <form
      onSubmit={handleSubmit}
      className="container mx-auto px-4 py-8 max-w-screen-md"
    >
      <section className="flex flex-wrap -mx-2">
        <div className="w-full px-2 mb-4">
          <h2 className="text-2xl font-bold">Bowling</h2>
        </div>
        <div className="w-full sm:w-1/4 px-2 mb-4 sm:mb-0">
          <label
            htmlFor="laneSelector"
            className="block mb-2 text-sm font-medium"
          >
            Baner
          </label>
          <select
            id="laneSelector"
            onChange={handleLaneSelectChange}
            value={lanes}
            className="block w-full p-2 border border-gray-300 rounded-md bg-black text-white"
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
        </div>

        <div className="w-full sm:w-1/4 px-2 mb-4 sm:mb-0">
          <label
            htmlFor="playTimeSelector"
            className="block mb-2 text-sm font-medium"
          >
            Timer
          </label>
          <select
            id="playTimeSelector"
            onChange={handlePlayTimeChange}
            value={playTime}
            className="bg-black text-white block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
          </select>
        </div>

        <div
          title="selectStartTime"
          className="w-full sm:w-1/4 px-2 mb-4 sm:mb-0"
        >
          <label htmlFor="startTime" className="block mb-2 text-sm font-medium">
            Start Tid
          </label>
          <select
            id="startTime"
            onChange={handleStartTimeChange}
            value={startTime}
            className="bg-black text-white block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value={"08:00"}>08:00</option>
            <option value={"09:00"}>09:00</option>
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
          <label className="block mb-2 text-sm font-medium">Tilføj navne</label>
          <input type="checkbox" onChange={handleCheckboxChange} />
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
                    onChange={(e) =>
                      handleInputChange(laneIndex, index, e.target.value)
                    }
                  />
                </div>
              ))}
            </section>
          ))}
        </div>
      )}

      <button
        type="submit"
        className="w-full sm:w-1/4 p-2 mt-4 bg-green-500 text-white rounded-md"
      >
        Tilføj
      </button>
    </form>
  );
}
