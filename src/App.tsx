import Layout from './Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './components/standardLayout/Home';
import BowlingInfo from './components/infoPages/BowlingInfo';
import AirhockeyInfo from './components/infoPages/AirhockeyInfo';
import RestaurantInfo from './components/infoPages/RestaurantInfo';
import Booking from './components/booking/Onlinebooking';
import BarInfo from './components/infoPages/BarInfo';
import BarSale from './components/sale/BarSale';
import StockPage from './components/stock/StockPage';
import StockOrderPage from './components/stock/StockOrderPage';
import BookingOverview from './components/booking/DailyBookingOverview';
import ShiftOverview from './components/shift/ShiftOverviews';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
    return (
        <Layout>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/bowlingInfo" element={<BowlingInfo />} />
                <Route path="/airHockeyInfo" element={<AirhockeyInfo />} />
                <Route path="/restaurant" element={<RestaurantInfo />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/barInfo" element={<BarInfo />} />
                <Route path="/barSale" element={<BarSale />} />
                <Route path="/lager" element={<StockPage />} />
                <Route path="/lagerBestilling" element={<StockOrderPage />} />
                <Route path="/vagtplan" element={<ShiftOverview />} /> <Route path="/bookingoverview" element={<BookingOverview />} />
            </Routes>
        </Layout>
    );
}
