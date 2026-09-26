"use client";

import React, { useContext, useState } from "react";
import Link from "next/link";
import { FitlogContext } from "@/context/FitlogContext";
import { WFitlog } from "@/types/fitlog.type";

const ListedPage = () => {
  const context = useContext(FitlogContext);

  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const [toast, setToast] = useState("");

  if (!context) {
    return null;
  }

  const {
    addPlan,
    addSave,
    removeFromPlan,
    removeFromSave,
  } = context;

  const activeData: WFitlog[] =
    activeTab === "plan" ? addPlan : addSave;

  const showToast = (message: string) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2000);
  };

  const handleDone = (id: number, name: string) => {
    if (!completedIds.includes(id)) {
      setCompletedIds([...completedIds, id]);
      showToast(`${name} marked as done`);
    }
  };

  const handleRemove = (id: number, name: string) => {
    if (activeTab === "plan") {
      removeFromPlan(id);
      showToast(`${name} removed from plan`);
    } else {
      removeFromSave(id);
      showToast(`${name} removed from saved`);
    }
  };

  const totalDuration = activeData.reduce(
    (total, item) => total + item.duration,
    0
  );

  const totalCalories = activeData.reduce(
    (total, item) => total + item.caloriesBurned,
    0
  );

  return (
    <main className="min-h-screen bg-[#0d0f13] pt-24 pb-10">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

       
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <span className="w-1 h-8 bg-lime-400 rounded-full"></span>

            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              MY WORKOUTS
            </h1>
          </div>

          <p className="text-gray-400 text-sm mt-2 ml-4">
            Manage your workout plan and saved workouts.
          </p>
        </div>

       
        <div className="flex gap-3 mb-7">
          <button
            onClick={() => setActiveTab("plan")}
            className={`px-5 py-2 rounded-lg font-semibold transition ${
              activeTab === "plan"
                ? "bg-lime-400 text-black"
                : "bg-[#1a1d23] text-gray-400 hover:text-white"
            }`}
          >
            My Plan ({addPlan.length})
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`px-5 py-2 rounded-lg font-semibold transition ${
              activeTab === "saved"
                ? "bg-lime-400 text-black"
                : "bg-[#1a1d23] text-gray-400 hover:text-white"
            }`}
          >
            Saved ({addSave.length})
          </button>
        </div>

       
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#171a20] border border-gray-800 rounded-xl p-5">
            <p className="text-gray-400 text-sm">Total Workouts</p>
            <p className="text-2xl font-bold text-white mt-1">
              {activeData.length}
            </p>
          </div>

          <div className="bg-[#171a20] border border-gray-800 rounded-xl p-5">
            <p className="text-gray-400 text-sm">Total Duration</p>
            <p className="text-2xl font-bold text-white mt-1">
              {totalDuration} min
            </p>
          </div>

          <div className="bg-[#171a20] border border-gray-800 rounded-xl p-5">
            <p className="text-gray-400 text-sm">Calories</p>
            <p className="text-2xl font-bold text-white mt-1">
              {totalCalories} kcal
            </p>
          </div>
        </div>

       
        {activeData.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">
              No workouts found.
            </p>

            <Link
              href="/workouts"
              className="inline-block mt-4 bg-lime-400 text-black font-semibold px-5 py-2 rounded-lg hover:bg-lime-300"
            >
              Browse Workouts
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {activeData.map((fitlog) => {
              const isDone = completedIds.includes(fitlog.id);

              return (
                <div
                  key={fitlog.id}
                  className={`bg-[#171a20] border rounded-xl p-5 transition ${
                    isDone
                      ? "border-lime-400"
                      : "border-gray-800"
                  }`}
                >
               
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2
                        className={`text-xl font-bold ${
                          isDone
                            ? "text-lime-400"
                            : "text-white"
                        }`}
                      >
                        {fitlog.name}
                      </h2>

                      <p className="text-gray-400 text-sm mt-1">
                        {fitlog.difficulty} · {fitlog.duration} min
                      </p>
                    </div>

                   
                    <button
                      onClick={() =>
                        handleRemove(fitlog.id, fitlog.name)
                      }
                      className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-600 text-gray-400 hover:text-red-400 hover:border-red-400 transition"
                    >
                      ✕
                    </button>
                  </div>

                 
                  <p className="text-gray-400 text-sm mt-4 leading-6">
                    {fitlog.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mt-5">
                    <div className="bg-[#20242c] rounded-lg p-3">
                      <p className="text-gray-500 text-xs">
                        Sets
                      </p>
                      <p className="text-white font-semibold">
                        {fitlog.sets}
                      </p>
                    </div>

                    <div className="bg-[#20242c] rounded-lg p-3">
                      <p className="text-gray-500 text-xs">
                        Reps
                      </p>
                      <p className="text-white font-semibold">
                        {fitlog.reps}
                      </p>
                    </div>

                    <div className="bg-[#20242c] rounded-lg p-3">
                      <p className="text-gray-500 text-xs">
                        Calories
                      </p>
                      <p className="text-white font-semibold">
                        {fitlog.caloriesBurned} kcal
                      </p>
                    </div>

                    <div className="bg-[#20242c] rounded-lg p-3">
                      <p className="text-gray-500 text-xs">
                        Equipment
                      </p>
                      <p className="text-white font-semibold">
                        {fitlog.equipment}
                      </p>
                    </div>
                  </div>

                 
                  <div className="flex gap-3 mt-5">
                    <Link
                      href={`/details/${fitlog.id}`}
                      className="flex-1 text-center border border-gray-600 text-white py-2.5 rounded-lg hover:bg-gray-800 transition"
                    >
                      View Details
                    </Link>

                    <button
                      onClick={() =>
                        handleDone(fitlog.id, fitlog.name)
                      }
                      disabled={isDone}
                      className={`px-4 py-2.5 rounded-lg font-semibold transition ${
                        isDone
                          ? "bg-lime-400 text-black cursor-default"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      {isDone ? "✓ Done" : "✓ Mark as Done"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

    
      {toast && (
        <div className="fixed bottom-6 right-6 bg-white text-black px-5 py-3 rounded-lg shadow-lg font-semibold z-50">
          {toast}
        </div>
      )}
    </main>
  );
};

export default ListedPage;