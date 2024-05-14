import Layout from './Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import BowlingInfo from './components/BowlingInfo';


export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bowlingInfo" element={<BowlingInfo />} />
        {/* <Route path="about" element={<About />} />
      <Route path="services" element={<Services />} />
      <Route path="contact" element={<Contact />} /> */}
      </Routes>
    </Layout>
  );
}