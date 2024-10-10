"use client";

import Navbar from "@/app/components/Navbar";
import ResultsPage from "@/app/components/pages/Result";


export default function Home() {

  return (
    <div className="flex items-center justify-center min-h-screen bg-white poppins w-full">
      <div className="w-full p-4 min-h-screen flex flex-col items-center">
        <Navbar />
        <main className="w-full md:w-2/3 flex flex-col">
        <ResultsPage />
        </main>
      </div>
    </div>
  );
}
