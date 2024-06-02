interface BookingSelectActivityProps {
    chosenForm: (formName: string) => void;
}

function BookingSelectActivity({ chosenForm }: BookingSelectActivityProps): React.ReactElement {
    const handleClick = (value: string) => {
        console.log('You clicked me!');
        console.log(value);
        chosenForm(value);
    };

    return (
      <div>
        <h1 className="text-3xl font-bold">Vælg aktivitet</h1>
        <div className="flex justify-between mt-8 mb-8">
          <button
            onClick={() => handleClick("bowling")}
            className="w-36 p-2 text-lg font-bold text-white whitespace-nowrap bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 border-2 border-yellow-300"
          >
            Bowling
          </button>
          <button
            onClick={() => handleClick("airHockey")}
            className="w-36 p-2 text-lg font-bold text-white whitespace-nowrap bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 border-2 border-yellow-300"
          >
            Air Hockey
          </button>
          <button
            onClick={() => handleClick("kidsBowling")}
            className="w-36 p-2 text-lg font-bold text-white whitespace-nowrap bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 border-2 border-yellow-300"
          >
            Børnebowling
          </button>
          <button
            onClick={() => handleClick("restaurant")}
            className="w-36 p-2 text-lg font-bold text-white whitespace-nowrap bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 border-2 border-yellow-300"
          >
            Restaurant
          </button>
        </div>
      </div>
    );


    // return (
    //   <div>
    //     <h1 className="text-3xl font-bold">Vælg aktivitet</h1>
    //     <div>
    //       <button
    //         onClick={() => handleClick("bowling")}
    //         className="w-36  mr-4 mb-8 mt-8 p-2 text-lg font-bold text-white whitespace-nowrap bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 border-2 border-yellow-300"
    //       >
    //         Bowling
    //       </button>
    //       <button
    //         onClick={() => handleClick("airHockey")}
    //         className="w-36 mr-4 mb-8 mt-8 p-2 text-lg font-bold text-white whitespace-nowrap bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 border-2 border-yellow-300"
    //       >
    //         Air Hockey
    //       </button>
    //       <button
    //         onClick={() => handleClick("kidsBowling")}
    //         className="w-36 mr-4 mb-8 mt-8 p-2 text-lg font-bold text-white whitespace-nowrap bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 border-2 border-yellow-300"
    //       >
    //         Børnebowling
    //       </button>
    //       <button
    //         onClick={() => handleClick("restaurant")}
    //         className="w-36 mr-4 mb-8 mt-8 p-2 text-lg font-bold text-white whitespace-nowrap bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 border-2 border-yellow-300"
    //       >
    //         Restaurant
    //       </button>
    //     </div>
    //   </div>
    // );
}

export default BookingSelectActivity;
