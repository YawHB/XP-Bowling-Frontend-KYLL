import { Shift } from '../../components/shift/ShiftOverviews';

export default async function getAllShiftsApi() {
    try {
        const getShifts = async () => {
            const response = await fetch('http://localhost:8080/shifts');

            if (!response.ok) {
                const errorMessage = await response.text();
                console.log('Errormessage :O: ' + errorMessage);
                return;
            }
            const shifts: Shift[] = await response.json();

            console.log(shifts);
            return shifts;
        };

        return getShifts();
    } catch (error) {
        console.log('Error ' + error);
    }
}
