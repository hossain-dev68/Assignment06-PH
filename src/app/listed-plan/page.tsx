"use client";

import React, { useContext, useState } from "react";
import { FitlogContext } from "@/context/FitlogContext";
import Image from "next/image";
import Link from "next/link";
import type { WFitlog } from "@/types";

const ListedPage = () => {
  const { addPlan, addSave } = useContext(FitlogContext);

  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");


  const activeData = activeTab === "plan" ? addPlan : addSave;


  const totalMinutes = activeData.reduce(
    (total: number, item: WFitlog) => total + item.duration,
    0
  );

  
  const totalCalories = activeData.reduce(
    (total: number, item: WFitlog) => total + item.caloriesBurned,
    0
  );

  return (
    <div className="min-h-screen bg-[#0d0f13] text-white pt-16">

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

       
        <div className="mb-5">
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
            My Plan
          </h1>

          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Keep track of your workouts and complete your daily fitness goals.
          </p>
        </div>


        <div className="bg-[#12151b] border border-[#252a33] rounded-xl overflow-hidden mb-6">

          <div className="grid grid-cols-3">

         
            <div className="p-4 sm:p-5 border-r border-[#252a33]">
              <p className="text-[10px] sm:text-xs text-gray-500 uppercase">
                Exercises
              </p>

              <p className="text-2xl sm:text-3xl font-black text-lime-400 mt-1">
                {activeData.length}
              </p>
            </div>

          
            <div className="p-4 sm:p-5 border-r border-[#252a33]">
              <p className="text-[10px] sm:text-xs text-gray-500 uppercase">
                Minutes
              </p>

              <p className="text-2xl sm:text-3xl font-black text-white mt-1">
                {totalMinutes}
              </p>
            </div>

            
            <div className="p-4 sm:p-5">
              <p className="text-[10px] sm:text-xs text-gray-500 uppercase">
                Calories
              </p>

              <p className="text-2xl sm:text-3xl font-black text-white mt-1">
                {totalCalories}
              </p>
            </div>

          </div>
        </div>


        
        <div className="flex items-center justify-between gap-3 mb-4">

      
          <div className="flex bg-[#171a21] border border-[#272c35] rounded-lg p-1">

            <button
              onClick={() => setActiveTab("plan")}
              className={`px-3 sm:px-4 py-1.5 rounded-md text-xs font-semibold transition ${
                activeTab === "plan"
                  ? "bg-[#252a33] text-white"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              Today's Plan
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              className={`px-3 sm:px-4 py-1.5 rounded-md text-xs font-semibold transition ${
                activeTab === "saved"
                  ? "bg-[#252a33] text-white"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              Saved
            </button>

          </div>


          <div className="flex items-center gap-2">

            <span className="hidden sm:block text-xs text-gray-500">
              Sort By
            </span>

            <button className="border border-[#292f39] bg-[#15181e] rounded-lg px-3 py-2 text-xs text-white">
              Duration
            </button>

          </div>

        </div>


     
        <div className="space-y-3">

          {activeData.length > 0 ? (

            activeData.map((fitlog: WFitlog) => (

              <div
                key={fitlog.id}
                className="bg-[#14171d] border border-[#272c35] rounded-xl p-3 sm:p-4 hover:border-[#3a414d] transition"
              >

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">

               
                  <div className="relative w-full sm:w-[110px] h-40 sm:h-[70px] flex-shrink-0 rounded-lg overflow-hidden">

                    <Image
                      src={fitlog.image}
                      alt={fitlog.name}
                      fill
                      className="object-cover"
                    />

                  </div>


             
                  <div className="flex-1 min-w-0">

               
                    <h2 className="text-sm sm:text-base font-black uppercase text-white truncate">
                      {fitlog.name}
                    </h2>

                
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      {fitlog.equipment}
                    </p>


                  
                    <div className="flex flex-wrap items-center gap-3 mt-2">

                      <span className="text-[11px] text-gray-300">
                        ◯ {fitlog.duration} min
                      </span>

                      <span className="text-[11px] text-gray-300">
                        🔥 {fitlog.caloriesBurned} kcal
                      </span>

                      <span className="text-[11px] text-lime-400">
                        ⭐ {fitlog.rating}
                      </span>

                    </div>

                  </div>


                  
                  <div className="flex sm:flex-col md:flex-row gap-2 w-full sm:w-auto">

                    <Link
                      href={`/details/${fitlog.id}`}
                      className="flex-1 sm:flex-none"
                    >
                      <button
                        type="button"
                        className="w-full border border-[#3a414d] hover:bg-[#20242c] text-white text-xs font-semibold px-4 py-2 rounded-full transition"
                      >
                        View Details
                      </button>
                    </Link>

                    <button
                      type="button"
                      className="flex-1 sm:flex-none bg-lime-400 hover:bg-lime-300 text-black text-xs font-bold px-4 py-2 rounded-full transition"
                    >
                      Mark as Done
                    </button>

                  </div>

                </div>

              </div>

            ))

          ) : (

          
            <div className="bg-[#14171d] border border-[#272c35] rounded-xl py-16 text-center">

              <div className="text-4xl mb-3">
                💪
              </div>

              <h3 className="text-lg font-bold text-white">
                {activeTab === "plan"
                  ? "No workout added yet"
                  : "No saved workout"}
              </h3>

              <p className="text-xs text-gray-500 mt-2">
                Add some workouts to see them here.
              </p>

            </div>

          )}

        </div>

      </div>
    </div>
  );
};

export default ListedPage;