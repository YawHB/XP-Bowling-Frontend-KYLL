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
            <h1>Vælg aktivitet</h1>
            <div>
                <button onClick={() => handleClick('bowling')} className="bg-blue-500 p-2 m-2">
                    Bowling
                </button>
                <button onClick={() => handleClick('airHockey')} className="bg-blue-500 p-2 m-2">
                    Air Hockey
                </button>
                <button onClick={() => handleClick('kidsBowling')} className="bg-blue-500 p-2 m-2">
                    Børne Bowling
                </button>
                <button onClick={() => handleClick('restaurant')} className="bg-blue-500 p-2 m-2">
                    Restaurant
                </button>
            </div>
        </div>
    );
}

export default BookingSelectActivity;
