import { Employee } from '../../components/shift/ShiftOverviews';

export default async function getAlEmployeesApi() {
    try {
        const getEmployees = async () => {
            const response = await fetch('http://localhost:8080/employees');

            if (!response.ok) {
                const errorMessage = await response.text();
                console.log('Errormessage :O ' + errorMessage);
                return;
            }
            const employees: Employee[] = await response.json();

            console.log(employees);
            return employees;
        };

        return getEmployees();
    } catch (error) {
        console.log('Error ' + error);
    }
}
