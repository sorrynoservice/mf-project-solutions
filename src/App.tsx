import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ServiceLanding from "@/pages/ServiceLanding";
import HowWeWork from "@/pages/HowWeWork";
import ServicePage from "@/components/ServicePage";
import { servicePages } from "@/data/servicePages";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Snagging from "@/pages/Snagging";
import GardenCalculator from "@/pages/GardenCalculator";
import Faqs from "@/pages/Faqs";
import { ProjectDetail, Projects } from "@/pages/Projects";
import NotFound from "@/pages/NotFound";

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      {servicePages.map((p) => (
        <Route key={p.route} path={p.route} element={<ServiceLanding route={p.route} />} />
      ))}
      <Route path="/how-we-work" element={<HowWeWork />} />
      {/* Old service addresses */}
      <Route path="/garden-rooms" element={<Navigate to="/residential/garden-buildings" replace />} />
      <Route path="/granny-flats" element={<ServicePage slug="granny-flats" />} />
      <Route path="/home-extensions" element={<Navigate to="/residential/extensions" replace />} />
      <Route path="/bathroom-renovations" element={<Navigate to="/residential/kitchens-bathrooms" replace />} />
      <Route path="/kitchen-renovations" element={<Navigate to="/residential/kitchens-bathrooms" replace />} />
      <Route path="/landscaping-pergolas" element={<Navigate to="/residential/outdoor-living" replace />} />
      <Route path="/snagging" element={<Snagging />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:slug" element={<ProjectDetail />} />
      <Route path="/faqs" element={<Faqs />} />
      <Route path="/garden-calculator" element={<GardenCalculator />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <FloatingWhatsApp />
  </BrowserRouter>
);

export default App;
