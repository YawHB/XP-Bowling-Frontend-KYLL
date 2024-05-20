export default function StockOverview() {
    return (

        <div>
            <table className="table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Vare</th>
                        <th className="px-4 py-2">Antal</th>
                        <th className="px-4 py-2">Pris</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border px-4 py-2">Biljardkø</td>
                        <td className="border px-4 py-2">5</td>
                        <td className="border px-4 py-2">200</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">Bowlingkugle</td>
                        <td className="border px-4 py-2">10</td>
                        <td className="border px-4 py-2">100</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">Airhockey puck</td>
                        <td className="border px-4 py-2">20</td>
                        <td className="border px-4 py-2">10</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}