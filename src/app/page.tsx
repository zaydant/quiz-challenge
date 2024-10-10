"use client";

import { useAuth } from "./hooks/useAuth";
import Navbar from "./components/Navbar";
import QuizPage from "./components/pages/Quiz";

export default function Home() {
  const { user, token, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user || !token) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white poppins w-full">
      <div className="w-full p-4 min-h-screen flex flex-col items-center">
        <Navbar />
        <main className="w-full md:w-2/3 flex flex-col">
          <QuizPage />
        </main>
      </div>
    </div>
  );
}