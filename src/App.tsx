import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ServicePage from "@/components/ServicePage";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Snagging from "@/pages/Snagging";
import GardenCalculator from "@/pages/GardenCalculator";
import NotFound from "@/pages/NotFound";

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/garden-rooms" element={<ServicePage slug="garden-rooms" />} />
      <Route path="/home-extensions" element={<ServicePage slug="home-extensions" />} />
      <Route path="/bathroom-renovations" element={<ServicePage slug="bathroom-renovations" />} />
      <Route path="/landscaping-pergolas" element={<ServicePage slug="landscaping-pergolas" />} />
      <Route path="/kitchen-renovations" element={<ServicePage slug="kitchen-renovations" />} />
      <Route path="/interior-design" element={<ServicePage slug="interior-design" />} />
      <Route path="/snagging" element={<Snagging />} />
      <Route path="/garden-calculator" element={<GardenCalculator />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <FloatingWhatsApp />
  </BrowserRouter>
);

export default App;
