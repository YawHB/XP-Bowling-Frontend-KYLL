import React, { useEffect } from 'react';
import { Shift } from './ShiftOverviews';

interface ShiftTableProps {
    shifts: Shift[];
}

export function ShiftTable({ shifts }: ShiftTableProps) {
    useEffect(() => {
        console.log(shifts);
    }, [shifts]);

    const findShift = (placeName: string) => {
        const shift = shifts.find((shift) => shift.placeName === placeName);
        console.log(shift);

        return shift ? `${shift.employee.firstName} ${shift.employee.lastName}` : '';
    };

    return (
        <div className="overflow-x-auto">
            <table className="border-collapse border border-white text-white" style={{ width: 'auto' }}>
                <thead>
                    <tr>
                        <th className="border border-white px-4 py-2 font-bold text-left" style={{ width: '200px' }}>
                            Jobfunktion
                        </th>
                        <th className="border border-white px-4 py-2 font-bold text-left" style={{ width: '400px' }}>
                            Medarbejder
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-white px-4 py-2" style={{ width: '200px' }}>
                            Receptionist 1
                        </td>
                        <td id="Reception1" className="border border-white px-4 py-2" style={{ width: '400px' }}>
                            {findShift('Reception1')}
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-white px-4 py-2" style={{ width: '200px' }}>
                            Receptionist 2
                        </td>
                        <td id="Reception2" className="border border-white px-4 py-2" style={{ width: '400px' }}>
                            {findShift('Reception2')}
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-white px-4 py-2" style={{ width: '200px' }}>
                            Manager
                        </td>
                        <td id="Manager" className="border border-white px-4 py-2" style={{ width: '400px' }}>
                            {findShift('Manager')}
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-white px-4 py-2" style={{ width: '200px' }}>
                            Operator
                        </td>
                        <td id="Operator" className="border border-white px-4 py-2" style={{ width: '400px' }}>
                            {findShift('Operator')}
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-white px-4 py-2" style={{ width: '200px' }}>
                            Rengøring 1
                        </td>
                        <td id="Cleaning1" className="border border-white px-4 py-2" style={{ width: '400px' }}>
                            {findShift('Cleaning1')}
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-white px-4 py-2" style={{ width: '200px' }}>
                            Rengøring 2
                        </td>
                        <td id="Cleaning2" className="border border-white px-4 py-2" style={{ width: '400px' }}>
                            {findShift('Cleaning2')}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ShiftTable;
