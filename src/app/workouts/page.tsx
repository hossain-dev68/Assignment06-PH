import React from "react";
import FitlogCard from "../components/shared/FitlogCard";
import { WFitlog } from "@/types/fitlog.type";

const WorkoutsPage = async () => {
  const res = await fetch("http://localhost:3000/fitlogworker.json");
  const fitlogs: WFitlog[] = await res.json();

  return (
    <main className="min-h-screen bg-[#0d0f13] pt-16">

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        
        <div className="mb-7">

          <div className="flex items-center gap-3">

            <span className="w-1 h-8 bg-lime-400 rounded-full"></span>

            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              THE LIBRARY
            </h1>

          </div>

          <p className="text-gray-400 text-sm mt-2 ml-4">
            Twelve lifts covering every major muscle group.
          </p>

        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {fitlogs.map((fitlog) => (
            <FitlogCard
              key={fitlog.id}
              fitlog={fitlog}
            />
          ))}

        </div>

      </section>

    </main>
  );
};

export default WorkoutsPage;