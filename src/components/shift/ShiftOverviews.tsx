import { useEffect, useState } from 'react';
import ShiftTable from './ShiftTable';
import getAllShiftsApi from '../../api/shift/getAllShiftsApi';
export interface Shift {
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
    const [shifts, setShifts] = useState<Shift[]>([]);

    useEffect(() => {
        getAllShiftsApi().then((data) => {
            setShifts(data || []);
        });
    }, []); // empty dependency array to run only once on mount

    const handlePlaceNameSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);
        console.log(shifts);
    };
    return (
        <div className="w-screen px-4">
            <h1 className="mb-4">ShiftOverview</h1>
            <h3 className="mb.4 text-white">Vælg dato: Kalender</h3>
            {/* Send shifts som prop i Shifts component */}
            <ShiftTable setShifts={setShifts} />
            <h3 className="text-white mb.4"></h3>
            <form>
                Tilføj vagt: Role-dropdown medarbejder-dropdown
                {/* Form med  2 dropdowns */}
                <label>
                    {' '}
                    Vælg placename
                    <select onChange={handlePlaceNameSelect}>
                        <option value=""></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </label>
                <label>
                    Medarbejder
                    <select>
                        {shifts.map((shift) => (
                            <option key={shift.id} value={shift.saleDate}>
                                {shift.saleDate} {shift.saleDate}
                            </option>
                        ))}
                    </select>
                </label>
                <button>Tilføj vagt</button>
            </form>
        </div>
    );
}
