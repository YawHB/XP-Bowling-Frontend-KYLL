import { useEffect, useState } from 'react';
import ShiftTable from './ShiftTable';
import getAllShiftsApi from '../../api/shift/getAllShiftsApi';
import getAllEmployeesApi from '../../api/shift/getAllEmployeesApi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SuccessMessage from '../../components/toasters/SuccesToaster';
import FailMessage from '../../components/toasters/ErrorToaster';

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
    const [filteredShifts, setFilteredShifts] = useState<Shift[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [placeName, setPlaceName] = useState<string>('');
    const [employee, setEmployee] = useState<Employee | undefined>(undefined);
    const [dataId, setDataId] = useState<string>('');
    const [startDate, setStartDate] = useState(new Date());
    const [localDate, setLocalDate] = useState('');

    useEffect(() => {
        getAllShiftsApi().then((shifts) => {
            setShifts(shifts || []);
            setFilteredShifts(shifts || []);
        });
    }, []); // empty dependency array to run only once on mount

    useEffect(() => {
        getAllEmployeesApi().then((employees) => {
            setEmployees(employees || []);
        });
    }, []);

    const handlePlaceNameSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);

        const selectedIndex = event.target.selectedIndex;
        const dataId = event.target.options[selectedIndex].getAttribute('data-id');
        console.log(dataId);
        setDataId(dataId || '');
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

    function handleFilterShiftsByDate(date: string) {
        console.log('Shifts:');
        console.log(shifts);

        const newFilteredShifts = shifts.filter((shift) => shift.date === date);
        setFilteredShifts(newFilteredShifts);
        console.log(newFilteredShifts);
    }
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
                date: localDate,
                startTime: 10,
                placeName: dataId,
                employee: {
                    id: employee?.id,
                },
            }),
        });

        if (!response.ok) {
            console.error('Failed to create shift', await response.text());
            FailMessage({ messageString: 'Der skete en fejl ved oprettelse af vagt' });
        } else {
            console.log('Shift created successfully');
            SuccessMessage({ messageString: 'Vagt oprettet!' });
            setPlaceName('');
            getAllShiftsApi().then((shifts) => {
                setShifts(shifts || []);
                const filteredShifts = shifts?.filter((shift) => shift.date === localDate);
                setFilteredShifts(filteredShifts || []);
            });
        }
    };

    return (
      <div className="w-screen mx-auto px-4 py-8 max-w-screen-full px-56 ">
     
        <h1 className="text-3xl font-bold mb-4 text-pink-300">Vagtplan</h1>
        <h3 className="mb.4 text-white text-lg font-bold">Vælg dato: </h3>
        <DatePicker
          className="ml-0 mr-8 mb-6"
          dateFormat={"dd-MM-yyyy"}
          selected={startDate}
          onChange={(date: Date) => {
            setStartDate(date);
            const localDate = date.toISOString().split("T")[0];
            setLocalDate(localDate);
            handleFilterShiftsByDate(localDate);
          }}
        />
        {/* Send shifts som prop i Shifts component */}
        <ShiftTable shifts={filteredShifts} />
        <h3 className="text-white mb.4"></h3>
        {/* Form med  2 dropdowns */}
        <div className="">
          <div className="py-1.5">
            <label className=" ">
              {" "}
              Jobfunktion: &nbsp;
              <select className="border-white border" onChange={handlePlaceNameSelect} value={placeName}>
                <option value="">Vælg</option>
                <option value="RECEPTIONIST" data-id="Reception1">
                  Reception 1
                </option>
                <option value="RECEPTIONIST" data-id="Reception2">
                  Reception 2
                </option>
                <option value="MANAGER" data-id="Manager">
                  Manager
                </option>
                <option value="OPERATOR" data-id="Operator">
                  Operator
                </option>
                <option value="CLEANER" data-id="Cleaning1">
                  Cleaning 1
                </option>
                <option value="CLEANER" data-id="Cleaning2">
                  Cleaning 2
                </option>
              </select>
            </label>
          </div>
          <form onSubmit={handleSubmit}>
            <label>
              Medarbejder:
              <select className="border-white border" onChange={handleEmployeeChange} value={employee?.id || ""}>
                <option value="">Vælg</option>
                {employees
                  .filter((employee) => employee.employeeRole.employeeRole === placeName)
                  .map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.firstName + " "} {employee.lastName}
                    </option>
                  ))}
              </select>
            </label>
            <div className="py-1.5">
              <button
                className="w-40 text-lg font-bold text-white whitespace-nowrap bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 border-2 border-yellow-300"
                type="submit"
              >
                Tilføj vagt
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}
