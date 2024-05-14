import { Link } from "react-router-dom";

export default function AirhockeyInfo() {
  return (
    <main className="containter mx-auto px-4 py-8 max-w-screen-full">
      <h1 className="text-3xl font-semibold mb-4 text-pink-300">Airhockey </h1>

      <Link to="/booking">
        <button id="toBooking" className="bg-green-500 text-white">
          Book Online
        </button>
      </Link>

      <section className="flex flex-wrap items-strech mb-8">
        <article className="w-full md:w-1/2 flex items-stretch object-scale-down h-48 w-96">
          <img
            src="https://cdn2.picryl.com/photo/2019/12/07/children-and-families-enjoyed-time-together-all-day-d0e61f-1024.jpg"
            alt="Image 1"
            className="w-full h-auto"
          />
        </article>
        <article className="w-full md:w-1/2 md:pl-4 flex item-strech mb-4">
          <div className="flew-grow text-lg h-full">
            <p>
              Velkommen til vores spændende airhockeyområde! Gør dig klar til at
              opleve pulserende action og intense konkurrencer på vores
              state-of-the-art airhockeyborde.
            </p>
            <h2>Spil så længe du vil: </h2>
            <p>
              Med vores airhockeyborde kan du spille så længe du vil i din
              bookede tid.
            </p>
            <p className="text-3xl font-semibold mb-4 text-pink-300">Priser:</p>
            <p> 149 kr. for 1 times spil.</p>
          </div>
        </article>
      </section>
    </main>
  );
}
