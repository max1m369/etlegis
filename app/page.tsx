import React from "react";
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Numbers from "@/components/sections/Numbers";
import Practices from "@/components/sections/Practices";
import Team from "@/components/sections/Team";
import Cases from "@/components/sections/Cases";
import Blog from "@/components/sections/Blog";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Numbers />
        <Practices />
        <Team />
        <Cases />
        <Blog />
      </main>
      <Footer />
    </div>
  );
}
