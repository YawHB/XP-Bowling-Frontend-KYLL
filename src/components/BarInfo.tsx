import { Link } from "react-router-dom";

export default function BarInfo() {
  return (
    <div className=" mx-auto px-4 py-8 max-w-screen-full">
      <div className=" mx-auto px-4 py-8 max-w-screen-full">
        <div className="flex flex-wrap">
          <h1 className="w-full text-3xl font-bold md:w-1/2 text-yellow-300">Velkommen til vores Bar!</h1>
          <Link to={`/barSale`} className="w-full md:w-1/2 md:pl-4 flex justify-center">
            <button className="text-lg font-bold text-white whitespace-nowrap bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300" id="startSale">
              Start Salg
            </button>
          </Link>
        </div>
      </div>

      {/* First row: Info about the bar */}
      <div className="flex flex-wrap items-stretch mb-8">
        <div className="w-full md:w-1/2 md:pr-4 flex items-stretch mb-4">
          <div className="flex-grow">
            <p className="text-lg h-full">
              Vi er glade for at præsentere vores brede udvalg af forfriskende og velsmagende drikkevarer. Uanset om du er på udkig efter en klassisk cocktail, en lokal håndværksøl eller en fin flaske vin, har vi noget for enhver smag.
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex items-stretch h-48">
          <img src="https://cdn2.picryl.com/photo/2019/12/07/children-and-families-enjoyed-time-together-all-day-d0e61f-1024.jpg" alt="Image 1" className="w-full h-auto" />
        </div>
      </div>

      {/* Second row: List of drinks */}
      <div className="flex flex-wrap items-stretch mb-8">
        <div className="w-full md:pr-4 flex items-stretch mb-4">
          <div className="flex flex-col w-full">
            <div className="mb-4">
              <div className="flex flex-wrap">
                <p className="w-full text-xl font-bold md:w-1/5 text-yellow-300">Med Alkohol</p>
                <p className="w-full text-xl font-bold md:w-1/5"></p>
                <p className="w-full text-xl font-bold md:w-1/5"></p>
                <p className="w-full text-xl font-bold md:w-1/5 md:pl-4 text-yellow-300">Uden Alkohol:</p>
              </div>

              <div className="flex flex-wrap">
                <div className="w-1/5">
                  <p className="text-xl font-bold">Cocktails:</p>
                  <ul className="list-disc list-inside">
                    <li>Mojito</li>
                    <li>Whiskey Sour</li>
                    <li>Margarita</li>
                    <li>Dark and Stormy</li>
                    <li>Old Fashioned</li>
                  </ul>
                </div>
                <div className="w-1/5">
                  <p className="text-xl font-bold">Øl:</p>
                  <ul className="list-disc list-inside">
                    <li>Carlsberg Classic</li>
                    <li>Tuborg Classic</li>
                    <li>Heineken</li>
                    <li>Guinness</li>
                    <li>Leffe Blonde</li>
                  </ul>
                </div>
                <div className="w-1/5">
                  <p className="text-xl font-bold">Vin:</p>
                  <ul className="list-disc list-inside">
                    <li>Chardonnay</li>
                    <li>Merlot</li>
                    <li>Pinot Grigio</li>
                    <li>Shiraz</li>
                    <li>Prosecco</li>
                  </ul>
                </div>

                <div className="w-1/5 md:pl-4">
                  <p className="text-xl font-bold">Sodavand:</p>
                  <ul className="list-disc list-inside">
                    <li>Coca-Cola</li>
                    <li>Coca-Cola Zero</li>
                    <li>Fanta</li>
                    <li>Sprite</li>
                    <li>Fanta Lemon</li>
                  </ul>
                </div>
                <div className="w-1/5">
                  <p className="text-xl font-bold">Slushice:</p>
                  <ul className="list-disc list-inside">
                    <li>Jordbær</li>
                    <li>Blå Hindbær</li>
                    <li>Cola</li>
                    <li>Lime</li>
                    <li>Appelsin</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Third row: Additional content */}
      <div className="flex flex-wrap items-stretch">
        <div className="w-full md:w-1/2 flex items-stretch h-48">
          <img src="https://images.pexels.com/photos/5780930/pexels-photo-5780930.jpeg" alt="Image 2" className="w-full h-auto" />
        </div>
        <div className="w-full md:w-1/2 md:pl-4 flex items-stretch">
          <div className="flex-grow">
            <div>
              <p className="text-lg h-full pb-2">Kom og udforsk vores udvalg af drikkevarer og lad vores erfarne bartendere guide dig gennem vores menu.</p>
              <p className="text-lg h-full pb-2">Vi ser frem til at byde dig velkommen og skabe uforglemmelige drikkeoplevelser sammen. Kontakt os for at høre mere information om vores drikkevarer.</p>
              <p className="text-lg h-full font-bold text-pink-300">Vi glæder os til at se dig i baren!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
