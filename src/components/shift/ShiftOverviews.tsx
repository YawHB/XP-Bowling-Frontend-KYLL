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
    const [placeName, setPlaceName] = useState<string>('');
    const [employee, setEmployee] = useState<Employee | undefined>(undefined);

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
        setPlaceName(event.target.value);
    };

    const handleEmployeeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);

        const selectedEmployeeId = parseInt(event.target.value);
        const selectedEmployee = employees.find((employee) => employee.id === selectedEmployeeId);
        setEmployee(selectedEmployee);
        //setEmployee(event.target.value);

        // Add code to set the selected employee
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Submit');
        console.log(employee);

        const response = await fetch('http://localhost:8080/shifts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date: '2024-05-24',
                startTime: 10,
                placeName: 'Do not',
                employee: {
                    id: employee?.employeeRole.id,
                },
            }),
        });

        if (!response.ok) {
            console.error('Failed to create shift', await response.text());
        } else {
            console.log('Shift created successfully');
        }
    };

    return (
        <div className="w-screen px-4">
            <h1 className="mb-4">ShiftOverview</h1>
            <h3 className="mb.4 text-white">Vælg dato: Kalender</h3>
            {/* Send shifts som prop i Shifts component */}
            <ShiftTable setShifts={setShifts} />
            <h3 className="text-white mb.4"></h3>
            {/* Form med  2 dropdowns */}
            <label>
                {' '}
                Placename
                <select onChange={handlePlaceNameSelect}>
                    <option value=""></option>
                    <option value="RECEPTIONIST">Reception 1</option>
                    <option value="RECEPTIONIST">Reception 2</option>
                    <option value="MANAGER">Manager</option>
                    <option value="OPERATOR">Operator</option>
                    <option value="CLEANER">Cleaning 1</option>
                    <option value="CLEANER">Cleaning 2</option>
                </select>
            </label>
            <form onSubmit={handleSubmit}>
                <label>
                    Medarbejder
                    <select onChange={handleEmployeeChange} value={employee?.id || ''}>
                        <option value="">Vælg</option>
                        {employees
                            .filter((employee) => employee.employeeRole.employeeRole === placeName)
                            .map((operator) => (
                                <option key={operator.id} value={operator.id}>
                                    {operator.firstName + ' '} {operator.lastName}
                                </option>
                            ))}
                    </select>
                </label>
                <button type="submit">Tilføj vagt</button>
            </form>
        </div>
    );
}
