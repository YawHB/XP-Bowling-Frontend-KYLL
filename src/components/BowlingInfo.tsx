export default function BowlingInfo() {
  return (
    <main className="containter mx-auto px-4 py-8 max-w-screen-full">
      <h2 className="text-3xl font-bold mb-4"> Bowling</h2>

      <section className="flex flex-wrap items-strech mb-8">
        <article
          title="grownupBowling"
          className="w-full md:w-1/2 md:pr-4 flex item-strech mb-4"
        >
          <div className="flex-grow text-lg h-full">
            <p>
              Tag dine venner eller familie med og oplev spændingen ved bowling
              på vores topmoderne baner. Vi tilbyder optil 2-timers bookingslots, hvor
              du kan nyde ubegrænset bowling i den valgte periode.
            </p>
            <p>
              <h2> Priser:</h2>
              199 kr. per person for 1 timer.
            </p>
            <p>Bemærk: Priserne inkluderer skoleje af bowlingkugle og sko.</p>
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

      <section className="flex flex-wrap items-strech">
        <article className="w-full md:w-1/2 flex items-stretch object-scale-down h-48 w-96">
          <img
            src="https://images.pexels.com/photos/5780930/pexels-photo-5780930.jpeg"
            alt="Image 2"
            className="w-full h-auto"
          />
        </article>

        <article
          title="kidsbowlAndTeams"
          className="w-full md:w-1/2 md:pl-4 flex-strech mb-4"
        >
          <div className="flex-grow text-lg h-full">
            <p className="pb-2">
              <h2>Børnebowling:</h2>
              Vi elsker at se de små have det sjovt, så vi har skræddersyet
              vores børnebowlingområde til at være sikkert og sjovt for alle
              børn. Hver bane er tilpasset til børns behov og har letvægtskugler
              og børnevenlige baner.
            </p>
            <p className="pb-2">Priser for børnebowling:</p>
            <p className="pb-2">179 kr. for 1 time.</p>
            <p className="pb-2">
              For børnebowling anbefaler vi en voksen ledsager til hvert barn.
            </p>
            <p className="pb-2">
              <h2>Holdspil:</h2>
              Vi arrangerer også holdspil mandag og fredag fra kl. 10 til 17.
              Vær opmærksom på, at der i dette tidsrum er færre baner
              tilgængelige på grund af holdaktiviteter. Holdspil er en
              fantastisk måde at styrke samhørigheden og konkurrencen mellem
              holdene!
            </p>
            <p>Kontakt os venligst for at reservere plads til holdspil.</p>
          </div>
        </article>
      </section>
    </main>
  );
}
