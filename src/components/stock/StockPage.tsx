import StockOverview from "./StockOverview";
import { Link } from "react-router-dom";

export default function StockPage() {
  return (
    <div className=" mx-auto px-4 py-8 max-w-screen-full">
      <div className=" mx-auto py-4 max-w-screen-full">
        <div className="flex flex-wrap">
          <h1 className="w-full text-3xl font-bold md:w-1/2 text-yellow-300">Lager</h1>

          <Link to={`/lagerBestilling`} className="w-full md:w-1/2 md:pl-4 flex justify-center">
            <button
              className="text-lg font-bold text-white whitespace-nowrap bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 border-2 border-yellow-300"
              id="startSale"
            >
              Bestil Reservedele
            </button>
          </Link>
          <div>
            <StockOverview />
          </div>
        </div>
      </div>
    </div>
  );
}
