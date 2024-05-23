//

import React from 'react';

export default function DailyBookingOverview() {
    return (
        <div className="w-screen mx-auto px-4 py-8 max-w-screen-full px-56">
            <table className=" w-full table-auto">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Tid</th>
                        <th className="border px-4 py-2">Børnebowling</th>
                        <th className="border px-4 py-2">Air-hockey</th>
                        <th className="border px-4 py-2">Restaurant</th>
                        <th className="border px-4 py-2">Restaurant</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: 13 }).map((_, i) => (
                        <tr key={i}>
                            <td className="border px-4 py-2">{`${i + 10}:00`}</td>
                            <td className="border px-4 py-2">
                                <div>
                                    <div>Fuld booket</div>
                                    <div>Delvis booket</div>
                                    <div>Ledig</div>
                                </div>
                            </td>
                            <td className="border px-4 py-2">
                                <div>
                                    <div>Fuld booket</div>
                                    <div>Delvis booket</div>
                                    <div>Ledig</div>
                                </div>
                            </td>
                            <td className="border px-4 py-2">
                                <div>
                                    <div>Fuld booket</div>
                                    <div>Delvis booket</div>
                                    <div>Ledig</div>
                                </div>
                            </td>
                            <td className="border px-4 py-2">
                                <div>
                                    <div>Fuld booket</div>
                                    <div>Delvis booket</div>
                                    <div>Ledig</div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
