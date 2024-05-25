import Layout from "./Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./components/standardLayout/Home";
import BowlingInfo from "./components/infoPages/BowlingInfo";
import AirhockeyInfo from "./components/infoPages/AirhockeyInfo";
import RestaurantInfo from "./components/infoPages/RestaurantInfo";
import OnlineBooking from "./components/booking/OnlineBooking";
import BarInfo from "./components/infoPages/BarInfo";
import BarSale from "./components/sale/BarSale";
import StockPage from "./components/stock/StockPage";
import StockOrderPage from "./components/stock/StockOrderPage";
import ShiftOverview from "./components/shift/ShiftOverviews";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bowlingInfo" element={<BowlingInfo />} />
        <Route path="/airHockeyInfo" element={<AirhockeyInfo />} />
        <Route path="/restaurant" element={<RestaurantInfo />} />
        <Route path="/booking" element={<OnlineBooking />} />
        {/* <Route path="about" element={<About />} />
      <Route path="services" element={<Services />} />
      <Route path="contact" element={<Contact />} /> */}
        <Route path="/barInfo" element={<BarInfo />} />
        <Route path="/barSale" element={<BarSale />} />
        <Route path="/lager" element={<StockPage />} />
        <Route path="/lagerBestilling" element={<StockOrderPage />} />
        <Route path="/vagtplan" element={<ShiftOverview />} />
      </Routes>
    </Layout>
  );
}
