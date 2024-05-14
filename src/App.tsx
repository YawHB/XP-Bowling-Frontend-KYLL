import Layout from "./Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import BowlingInfo from "./components/BowlingInfo";
import AirhockeyInfo from "./components/AirhockeyInfo";
import RestaurantInfo from "./components/Restaurant";
import Booking from "./components/Onlinebooking";
import BarInfo from "./components/BarInfo";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bowlingInfo" element={<BowlingInfo />} />
        <Route path="/airHockeyInfo" element={<AirhockeyInfo />} />
        <Route path="/restaurant" element={<RestaurantInfo />} />
        <Route path="/booking" element={<Booking />} />
        {/* <Route path="about" element={<About />} />
      <Route path="services" element={<Services />} />
      <Route path="contact" element={<Contact />} /> */}
        <Route path="/barInfo" element={<BarInfo />} />
      </Routes>
    </Layout>
  );
}
