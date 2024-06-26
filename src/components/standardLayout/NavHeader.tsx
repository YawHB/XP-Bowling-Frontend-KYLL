import { NavLink } from 'react-router-dom';

export default function NavHeader() {
    return (
        <nav className="h-20 bg-green-500">
            <ul className="flex justify-evenly p-4">
                <li>
                    <NavLink to="/" className="text-white hover:text-gray-300 ">
                        Hjem
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/booking" className="text-white hover:text-gray-300">
                        Online Booking
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/bowlingInfo" className="text-white hover:text-gray-300">
                        Bowling
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/airHockeyInfo" className="text-white hover:text-gray-300">
                        AirHockey
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/restaurant" className="text-white hover:text-gray-300">
                        Restaurant
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/barInfo" className="text-white hover:text-gray-300">
                        Bar
                    </NavLink>
                </li>
                {/* make a drop down menu */}
                <li>
                    <NavLink to="/lager" className="text-white hover:text-gray-300">
                        Lager
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/bookingoverview" className="text-white hover:text-gray-300">
                        Booking Oversigt
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/vagtplan" className="text-white hover:text-gray-300">
                        Vagtplan
                    </NavLink>
                </li>
                {/* <li>
          <NavLink to="/lagerBestilling" className="text-white hover:text-gray-300">
            Bestil Reservedele
          </NavLink>
        </li> */}
            </ul>
        </nav>
    );
}
