import { Link } from "react-router-dom";


export default function RestaurantInfo() {
  
  return (
    <main className="container mx-auto px-4 py-8 max-w-screen-full">
      <h1 className="text-3xl font-bold mb-4 text-pink-300">Restaurant</h1>

      <Link to="/booking">
        <button id="toBooking" className="bg-green-500 text-white">
          Book Online
        </button>
      </Link>

      <section className="flex flex-wrap items-strech mb-8">
        <article className="w-full md:w-1/2 md:pr-4 flex item-strech mb-4">
          <div className="flex-grow">
            <p>
              Vores restaurant er det perfekte sted at slappe af og nyde lækker
              mad og forfriskende drikkevarer efter en sjov dag med aktiviteter.
              Med en varieret menu med noget for enhver smag tilbyder vi alt fra
              saftige burgere til frisklavet salater og velsmagende pizzaer.
            </p>
          </div>
        </article>
        <article className="w-full md:w-1/2 flex items-stretch object-scale-down h-48 w-96">
          <img
            src="https://cdn2.picryl.com/photo/2019/12/07/children-and-families-enjoyed-time-together-all-day-d0e61f-1024.jpg"
            alt="Image 1"
            className="w-full h-auto"
          />
        </article>
      </section>
      <section className="flex flex-wrap items-strech mb-8">
        <article className="w-full md:w-1/2 flex items-stretch object-scale-down h-48 w-96">
          <img
            src="https://images.pexels.com/photos/5780930/pexels-photo-5780930.jpeg"
            alt="Image 2"
            className="w-full h-auto"
          />
        </article>

        <article className="w-full md:w-1/2 md:pl-4 item-strech mb-4">
          <div title="flexDiv" className="flex-grow">
            <div title="gridContainer" className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xl font-bold mb-4 text-pink-300">
                  Forretter:
                </p>
                <p>Knækbrød: 10 kr.</p>
                <p>Tangsalat: 22 kr.</p>
                <p>Forårsruller: 39 kr.</p>
                <p>Brød: 15 kr.</p>
              </div>
              <div>
                <p className="text-xl font-bold mb-4 text-pink-300">
                  Hovedretter:{" "}
                </p>
                <p>Burgermenu: 89 kr.</p>
                <p>Pizza (stor): 99 kr.</p>
                <p>Salat: 79 kr. </p>
                <p>Sandwich: 69 kr.</p>
              </div>
              <div>
                <p className="text-xl font-bold mb-4 text-pink-300">
                  Deserter:
                </p>
                <p>Milkshake: 79 kr.</p>
                <p>Brownie: 49 kr.</p>
                <p>Regnbue is: 49 kr.</p>
                <p>Bananasplit: 69 kr.</p>
                <p>Ostekage: 49 kr.</p>
                <p>Drømmekage: 49 kr.</p>
              </div>

              <div>
                <p className="text-xl font-bold mb-4 text-pink-300">
                  Drikkevarer:
                </p>
                <p>Øl (flaske): 35 kr.</p>
                <p>Vin (glas): 45 kr.</p>
                <p>Sodavand: 25 kr.</p>
                <p>Cocktails: 65 kr.</p>
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
