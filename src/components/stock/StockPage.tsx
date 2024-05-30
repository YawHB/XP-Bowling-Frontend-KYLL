import StockOverview from "./StockOverview";
import { Link } from "react-router-dom";

export default function StockPage() {
  return (
    <main className="px-8 py-8 w-screen">
      <div className="min-h-screen flex flex-col items-center justify-center mx-auto px-4 py-8 max-w-screen-full">
        <div className="w-screen py-4 max-w-screen-lg">
          <div className="flex flex-wrap">
            <h1 className="w-screen text-3xl font-bold md:w-1/2 text-yellow-300">Lager</h1>

            <Link to={`/lagerBestilling`} className="w-screen md:w-1/2 md:pl-4 flex justify-center">
              <button
                className="text-lg font-bold text-white whitespace-nowrap bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 border-2 border-yellow-300"
                id="startSale"
              >
                Bestil Reservedele
              </button>
            </Link>

            <section className="flex flex-wrap items-strech mb-8">
              <article className="w-screen md:w-1/2 md:pr-4 flex item-strech mb-4">
                <div className="flex-grow">
                    <p>
                        Her kan du se en oversigt over vores lagerbeholdning. Du kan også bestille reservedele, ved tryk på knappen til højre.
                    </p>
                  <div className=" flex justify-center items-center mt-8">
                    <StockOverview />
                  </div>
                </div>
              </article>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
