import { useState } from "react";
import ShiftTable from "./ShiftTable";

interface Shift {
  id: number;
  date: string;
  startDate: string;
  placeName: string;
  employee: {
    id: number;
    firstName: string;
    lastName: string;
    employeeRole: {
      id: number;
      employeeRole: string;
    };
  };
}

export default function ShiftOverview() {
  //useState for shifts
  const [shifts, setShifts] = useState<Shift[]>([]);



  //Use effect


  

  return (
    <div className="w-screen px-4">
      <h1 className="mb-4">ShiftOverview</h1>
      <h3 className="mb.4 text-white">Vælg dato: Kalender</h3>
      {/* Send shifts som prop i Shifts component */}
      <ShiftTable />
      <h3 className="text-white mb.4">
        Tilføj vagt: Role-dropdown medarbejder-dropdown
        {/* Form med  2 dropdowns */}
      </h3>
      <button>Tilføj vagt</button>
    </div>
  );
}
