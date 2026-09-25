import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import Services from "@/components/Services";
import CtaBanner from "@/components/CtaBanner";
import Testimonials from "@/components/Testimonials";
import ModernLiving from "@/components/ModernLiving";
import InstagramFeed from "@/components/InstagramFeed";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

import { useSeo } from "@/lib/seo";

const Index = () => {
  useSeo({
    title: "Garden Rooms, Extensions & Renovations in Dublin & Meath | MF Project Solutions",
    description:
      "Builders for garden rooms, granny flats, extensions, kitchens and bathrooms across Dublin, Meath, Louth, Kildare and Wicklow. Rated 4.9 from 130+ Google reviews.",
    path: "/",
  });
  return (
  <div className="min-h-screen">
    <Header variant="home" />
    <Hero />
    <WhoWeAre />
    <Services />
    <CtaBanner />
    <Testimonials />
    <ModernLiving />
    <InstagramFeed />
    <Contact />
    <Footer />
  </div>
  );
};

export default Index;
