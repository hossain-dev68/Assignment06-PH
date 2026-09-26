"use client";

import React, { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FitlogContext } from "@/context/FitlogContext";
import { WFitlog } from "@/types/fitlog.type";

const ListedPage = () => {
  const context = useContext(FitlogContext);

  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const [toast, setToast] = useState("");


  const [sortBy, setSortBy] = useState<
    "duration" | "calories" | "rating"
  >("duration");

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


  const sortedData = [...activeData].sort((a, b) => {
    if (sortBy === "duration") {
      return a.duration - b.duration;
    }

    if (sortBy === "calories") {
      return a.caloriesBurned - b.caloriesBurned;
    }

    if (sortBy === "rating") {
      return b.rating - a.rating;
    }

    return 0;
  });

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
            className={`px-5 py-2 rounded-lg font-semibold transition ${activeTab === "plan"
              ? "bg-lime-400 text-black"
              : "bg-[#1a1d23] text-gray-400 hover:text-white"
              }`}
          >
            My Plan ({addPlan.length})
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`px-5 py-2 rounded-lg font-semibold transition ${activeTab === "saved"
              ? "bg-lime-400 text-black"
              : "bg-[#1a1d23] text-gray-400 hover:text-white"
              }`}
          >
            Saved ({addSave.length})
          </button>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

          <div className="bg-[#171a20] border border-gray-800 rounded-xl p-5">
            <p className="text-gray-400 text-sm">
              Total Workouts
            </p>

            <p className="text-2xl font-bold text-white mt-1">
              {activeData.length}
            </p>
          </div>

          <div className="bg-[#171a20] border border-gray-800 rounded-xl p-5">
            <p className="text-gray-400 text-sm">
              Total Duration
            </p>

            <p className="text-2xl font-bold text-white mt-1">
              {totalDuration} min
            </p>
          </div>

          <div className="bg-[#171a20] border border-gray-800 rounded-xl p-5">
            <p className="text-gray-400 text-sm">
              Calories
            </p>

            <p className="text-2xl font-bold text-white mt-1">
              {totalCalories} kcal
            </p>
          </div>

        </div>


        <div className="flex items-center justify-end gap-4 mb-6">

          <span className="text-gray-400 text-lg">
            Sort By
          </span>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as
                  | "duration"
                  | "calories"
                  | "rating"
                )
              }
              className="appearance-none bg-[#171a20] border border-gray-800 text-white rounded-xl px-4 py-3 pr-10 min-w-[160px] outline-none focus:border-lime-400 cursor-pointer"
            >
              <option value="duration">
                Duration
              </option>

              <option value="calories">
                Calories
              </option>

              <option value="rating">
                Rating
              </option>
            </select>


            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </div>

        </div>


        {sortedData.length === 0 ? (

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


          <div className="flex flex-col gap-6">

            {sortedData.map((fitlog) => {

              const isDone = completedIds.includes(
                fitlog.id
              );

              return (
                <div
                  key={fitlog.id}
                  className={`bg-white rounded-2xl overflow-hidden border transition ${isDone
                    ? "border-lime-400"
                    : "border-gray-800"
                    }`}
                >


                  <div className="flex flex-col md:flex-row">


                    <div className="w-full md:w-2/5 h-64 md:h-auto">
                      <Image
                        src={fitlog.image}
                        alt={fitlog.name}
                        width={800}
                        height={500}
                        className="w-full h-full object-cover"
                      />
                    </div>


                    <div className="w-full md:w-3/5 p-6 flex flex-col">


                      <div className="flex items-start justify-between gap-4">

                        <div>
                          <h2
                            className={`text-2xl font-bold ${isDone
                              ? "text-green-600"
                              : "text-gray-900"
                              }`}
                          >
                            {fitlog.name}
                          </h2>

                          <p className="text-gray-500 text-sm mt-2">
                            {fitlog.difficulty} ·{" "}
                            {fitlog.duration} min
                          </p>
                        </div>

                        <button
                          onClick={() =>
                            handleRemove(
                              fitlog.id,
                              fitlog.name
                            )
                          }
                          className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:text-red-500 hover:border-red-500 transition"
                        >
                          ✕
                        </button>

                      </div>


                      <p className="text-gray-600 text-sm leading-6 mt-4">
                        {fitlog.description}
                      </p>


                      <div className="grid grid-cols-2 gap-3 mt-5">

                        <div className="bg-gray-100 rounded-lg p-3">
                          <p className="text-gray-500 text-xs">
                            Sets
                          </p>

                          <p className="text-gray-900 font-semibold">
                            {fitlog.sets}
                          </p>
                        </div>

                        <div className="bg-gray-100 rounded-lg p-3">
                          <p className="text-gray-500 text-xs">
                            Reps
                          </p>

                          <p className="text-gray-900 font-semibold">
                            {fitlog.reps}
                          </p>
                        </div>

                        <div className="bg-gray-100 rounded-lg p-3">
                          <p className="text-gray-500 text-xs">
                            Calories
                          </p>

                          <p className="text-gray-900 font-semibold">
                            {fitlog.caloriesBurned} kcal
                          </p>
                        </div>

                        <div className="bg-gray-100 rounded-lg p-3">
                          <p className="text-gray-500 text-xs">
                            Equipment
                          </p>

                          <p className="text-gray-900 font-semibold">
                            {fitlog.equipment}
                          </p>
                        </div>

                      </div>


                      <div className="mt-4">
                        <span className="text-yellow-500">
                          ★
                        </span>

                        <span className="text-gray-700 ml-1 font-semibold">
                          {fitlog.rating}
                        </span>
                      </div>


                      <div className="flex gap-3 mt-auto pt-6">

                        <Link
                          href={`/details/${fitlog.id}`}
                          className="flex-1 text-center border border-gray-300 text-gray-900 py-2.5 rounded-lg hover:bg-gray-100 transition font-semibold"
                        >
                          View Details
                        </Link>

                        <button
                          onClick={() =>
                            handleDone(
                              fitlog.id,
                              fitlog.name
                            )
                          }
                          disabled={isDone}
                          className={`px-5 py-2.5 rounded-lg font-semibold transition ${isDone
                            ? "bg-lime-400 text-black cursor-default"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                            }`}
                        >
                          {isDone
                            ? "✓ Done"
                            : "✓ Mark as Done"}
                        </button>

                      </div>

                    </div>

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