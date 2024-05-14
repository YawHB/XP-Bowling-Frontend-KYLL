export default function Footer() {
    return (
      <footer className="bg-green-500">
        <div className="flex justify-around container text-center p-4 text-white-500">
          <div>
            <p className="font-bold">Adresse</p>
            <p>Bådmandsgade 27</p>
            <p>Fredericia</p>
            <p>7000</p>
          </div>

          <div>
            <p className="font-bold">Kontakt</p>
            <p>Tlf: 27272711</p>
            <p>Mail: xpbowl@mail.com</p>
          </div>
          <div>
            <p className="font-bold">Parkering</p>
            <p>Vi har en masse</p>
            <p>båd parkering i havnen</p>
           
          </div>
        </div>
      </footer>
    );
    }