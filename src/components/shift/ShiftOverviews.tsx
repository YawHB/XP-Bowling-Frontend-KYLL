import { useEffect, useState } from 'react';
import ShiftTable from './ShiftTable';
import getAllShiftsApi from '../../api/shift/getAllShiftsApi';
import getAllEmployeesApi from '../../api/shift/getAllEmployeesApi';

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

export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    employeeRole: {
        id: number;
        employeeRole: string;
    };
}

// While select OPERATOR -> employeeRole.Find by roleID
export default function ShiftOverview() {
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);

    useEffect(() => {
        getAllShiftsApi().then((shifts) => {
            setShifts(shifts || []);
        });
    }, []); // empty dependency array to run only once on mount

    useEffect(() => {
        getAllEmployeesApi().then((employees) => {
            setEmployees(employees || []);
        });
    }, []);

    const handlePlaceNameSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);
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
                    HEJ
                    <select onChange={handlePlaceNameSelect}>
                        <option value=""></option>
                        <option value="Reception1">Reception 1</option>
                        <option value="Reception2">Reception 2</option>
                        <option value="Manager">Manager</option>
                        <option value="Operator">Operator</option>
                        <option value="Cleaning1">Cleaning 1</option>
                        <option value="Cleaning2">Cleaning 2</option>
                    </select>
                </label>
                <label>
                    Medarbejder
                    <select>
                        {employees
                            .filter((employee) => employee.employeeRole.employeeRole === 'OPERATOR')
                            .map((operator) => (
                                <option key={operator.id}>
                                    {operator.firstName + ' '}
                                    {operator.lastName}{' '}
                                </option>
                            ))}
                    </select>
                </label>
                <button>Tilføj vagt</button>
            </form>
        </div>
    );
}
