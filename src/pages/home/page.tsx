import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Work from "./components/Trabalho";
import Studio from "./components/Studio";
import Process from "./components/Process";
import Blog from "./components/Blog";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#fafafa] text-neutral-900">
      <Navbar />
      <Hero />
      <Work />
      <Studio />
      <Process />
      <Blog />
    </div>
  );
}