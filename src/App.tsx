import Layout from "./Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import BarInfo from "./components/BarInfo";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="about" element={<About />} />
      <Route path="services" element={<Services />} />
      <Route path="contact" element={<Contact />} /> */}
        <Route path="/barInfo" element={<BarInfo />} />
      </Routes>
    </Layout>
  );
}
