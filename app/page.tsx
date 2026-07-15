import TopAppBar from "@/components/TopAppBar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ChatSimulator from "@/components/ChatSimulator";
import Journey from "@/components/Journey";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <TopAppBar />
      <main className="flex-1 flex flex-col pt-16">
        <Hero />
        <Features />
        <ChatSimulator />
        <Journey />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
