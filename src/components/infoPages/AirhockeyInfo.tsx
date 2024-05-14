import { Link } from "react-router-dom";

export default function AirhockeyInfo() {
  return (
    <main className="containter mx-auto px-4 py-8 max-w-screen-full">
      <div className=" mx-auto py-4 max-w-screen-full">
        <div className="flex flex-wrap">
          <h1 className="w-full text-3xl font-bold md:w-1/2 text-pink-300">Air Hockey</h1>
          <Link to={`/booking`} className="w-full md:w-1/2 md:pl-4 flex justify-center">
            <button
              className="text-lg font-bold text-white whitespace-nowrap bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 border-2 border-yellow-300"
              id="startSale"
            >
              Book Air Hockey
            </button>
          </Link>
        </div>
      </div>

      <section className="flex flex-wrap items-strech mb-8">
        <div className="w-full md:w-1/2 flex items-stretch max-h-80">
          <img src="https://images.pexels.com/photos/5780930/pexels-photo-5780930.jpeg" alt="Image 2" className="w-full h-full object-cover " />
        </div>
        <article className="w-full md:w-1/2 md:pl-4 flex item-strech mb-4">
          <div className="flew-grow text-lg h-full">
            <p>Velkommen til vores spændende airhockeyområde! Gør dig klar til at opleve pulserende action og intense konkurrencer på vores state-of-the-art airhockeyborde.</p>
            <h2>Spil så længe du vil: </h2>
            <p>Med vores airhockeyborde kan du spille så længe du vil i din bookede tid.</p>
            <p className="text-3xl font-semibold mb-4 text-pink-300">Priser:</p>
            <p> 149 kr. for 1 times spil.</p>
          </div>
        </article>
      </section>
    </main>
  );
}
