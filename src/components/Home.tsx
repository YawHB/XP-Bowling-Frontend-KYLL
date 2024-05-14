export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-screen-full">
      <h1 className="text-3xl font-bold mb-4">Velkommen til XP Bowling!</h1>

      <div className="flex flex-wrap items-stretch mb-8">



        
        <div className="w-full md:w-1/2 md:pr-4 flex items-stretch mb-4">
          <div className="flex-grow">
            <p className="text-lg h-full">
              Træd ind i en verden af sjov og underholdning, hvor bowling er kun begyndelsen! Vi er stolte af at tilbyde en bred vifte af aktiviteter, der passer til enhver alder og enhver smag. For de, der elsker den klassiske udfordring, har vi
              vores topmoderne bowlingbaner, hvor du kan udfordre dine venner til en spændende match eller bare nyde en afslappet aften med familien. Vores børnebowlingområde er designet til at give de små en sjov og sikker oplevelse, hvor de kan
              udforske glæden ved bowling på deres egne vilkår.
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex items-stretch h-48">
          <img src="https://cdn2.picryl.com/photo/2019/12/07/children-and-families-enjoyed-time-together-all-day-d0e61f-1024.jpg" alt="Image 1" className="w-full h-auto" />
        </div>
      </div>

      <div className="flex flex-wrap items-stretch">
        <div className="w-full md:w-1/2 flex items-stretch h-48">
          <img src="https://images.pexels.com/photos/5780930/pexels-photo-5780930.jpeg" alt="Image 2" className="w-full h-auto" />
        </div>
      
        <div className="w-full md:w-1/2 md:pl-4 flex items-stretch">
          <div className="flex-grow">
            <p className="text-lg h-full">
              Efter en sjov dag med aktiviteter kan du forkæle dine smagsløg på vores førsteklasses restaurant, hvor vores kokke skaber lækre retter til enhver smag. Vores restaurant tilbyder en hyggelig atmosfære og en varieret menu, der er sikker
              på at tilfredsstille enhver sult. Og selvfølgelig kan du nyde din yndlingsdrink eller cocktail i vores hyggelige bar, mens du slapper af og genoplader efter en dag fyldt med sjov. Uanset om du er en erfaren bowler eller blot leder efter
              en sjov dag ud med familie og venner, har XP Bowling alt, hvad du behøver for en mindeværdig oplevelse!
            </p>
          </div>
        </div>
      
      </div>
    </div>
  );
}
