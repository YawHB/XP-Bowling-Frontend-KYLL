export default function BookingOverview() {
  return (
    <div className="bg-blue-500 p-2">
      <div className="">
        <h1 className="text-2xl font-bold">Booking Oversigt</h1>
      </div>
      <table>
        <thead className="flex">
          <tr>
            <th className="self-left">Aktivitet</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="">
          <tr className=" bg-blue-300 border-4 border-blue-600">
            <td className="p-3 ">
              <div>
                <p className="font-bold text-lg">Bowling</p>
              </div>
              <div className="flex">
                <p className="font-bold pr-5">Tidspunkt:</p>
                <p className="pr-2">25-05-2024</p>
                <p>kl. 17:00-18:55</p>
              </div>
              <div className="flex">
                <p className="font-bold pr-2">Antal baner:</p>
                <p>2</p>
              </div>
            </td>
            <td>
              <button className="m-2 bg-green-300">Rediger</button>
              <button className="mr-2 bg-red-400">Slet</button>
            </td>
          </tr>
          <tr className=" bg-blue-300 border-4 border-blue-600">
            <td className="p-3 ">
              <div>
                <p className="font-bold text-lg">Bowling</p>
              </div>
              <div className="flex">
                {" "}
                {/* Adjust margin as needed */}
                <p className="font-bold pr-5">Tidspunkt:</p>
                <p className="pr-2">25-05-2024</p>
                <p>kl. 17:00-18:55</p>
              </div>
              <div className="flex">
                <p className="font-bold pr-2">Antal baner:</p>
                <p>2</p>
              </div>
            </td>
            <td>
              <button className="m-2 bg-green-300">Rediger</button>
              <button className="mr-2 bg-red-400">Slet</button>
            </td>
          </tr>
          <tr className=" bg-blue-300 border-4 border-blue-600">
            <td className="p-3 ">
              <div>
                <p className="font-bold text-lg">Bowling</p>
              </div>
              <div className="flex">
                {" "}
                {/* Adjust margin as needed */}
                <p className="font-bold pr-5">Tidspunkt:</p>
                <p className="pr-2">25-05-2024</p>
                <p>kl. 17:00-18:55</p>
              </div>
              <div className="flex">
                <p className="font-bold pr-2">Antal baner:</p>
                <p>2</p>
              </div>
            </td>
            <td>
              <button className="m-2 bg-green-300">Rediger</button>
              <button className="mr-2 bg-red-400">Slet</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
