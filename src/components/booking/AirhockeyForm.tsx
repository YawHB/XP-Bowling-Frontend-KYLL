import { useState } from "react";

interface AirhockeyFormProps {
  addBooking: (newBooking: BookingData) => void;
}

interface BookingData {
  id?: number;
  activity: string;
  date: string;
  time: string;
  tables: number;
}

export default function AirhockeyForm({ addBooking }: AirhockeyFormProps) {
  const [startTime, setStartTime] = useState<string>("08:00");
  const [playTime, setPlayTime] = useState<number>(0);
  const [tables, setLanes] = useState<number>(0);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const newBooking: BookingData = {
      activity: "Airhockey",
      date: new Date().toISOString().split("T")[0],
      time: startTime,
      tables: tables
    };
    addBooking(newBooking);

    // handle form submission
  }

  function handleTableSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setLanes(Number(event.target.value));
  }

  function handlePlayTimeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setPlayTime(Number(event.target.value));
  }

  function handleStartTimeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setStartTime(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit} className="container mx-auto px-4 py-8 max-w-screen-md">
      <section className="flex flex-wrap -mx-2">
        <div className="w-full px-2 mb-4">
          <h2 className="text-2xl font-bold">Airhockey</h2>
        </div>
        <div className="w-full sm:w-1/4 px-2 mb-4 sm:mb-0">
          <label htmlFor="tableSelector" className="block mb-2 text-sm font-medium">
            Borde
          </label>
          <select id="tableSelector" onChange={handleTableSelectChange} value={tables} className="bg-black text-white block w-full p-2 border border-gray-300 rounded-md text-black">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
          </select>
        </div>

        <div className="w-full sm:w-1/4 px-2 mb-4 sm:mb-0">
          <label htmlFor="playTimeSelector" className="block mb-2 text-sm font-medium">
            Timer
          </label>
          <select id="playTimeSelector" onChange={handlePlayTimeChange} value={playTime} className="bg-black text-white block w-full p-2 border border-gray-300 rounded-md text-black">
            <option value={1}>1</option>
            <option value={2}>2</option>
          </select>
        </div>

        <div title="selectStartTime" className="w-full sm:w-1/4 px-2 mb-4 sm:mb-0">
          <label htmlFor="startTime" className="block mb-2 text-sm font-medium">
            Start Tid
          </label>
          <select id="playTimeSelector" onChange={handleStartTimeChange} value={startTime} className="bg-black text-white block w-full p-2 border border-gray-300 rounded-md text-black">
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

        <button type="submit" className="w-full sm:w-1/4 p-2 mt-4 bg-green-500 text-white rounded-md">
          Tilføj
        </button>
      </section>
    </form>
  );
}
