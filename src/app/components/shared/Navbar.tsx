"use client";

import Link from "next/link";
import React, { useContext } from "react";
import { FitlogContext } from "@/context/FitlogContext";
import { usePathname } from "next/navigation";
import Image from 'next/image';
import Logo from '@/asset/logo.png'

const Navbar = () => {
  const pathname = usePathname();
  const { addPlan, addSave } = useContext(FitlogContext);

  const isWorkoutActive =
    pathname.startsWith("/workouts") ||
    pathname.startsWith("/details");

  const isPlanActive = pathname.startsWith("/listed-plan");

  return (
    <nav className="fixed top-0 left-0 w-full bg-base-100 shadow-sm z-50">
      <div className="navbar container mx-auto">

      
        <div className="navbar-start">

         
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
            >
              ☰
            </div>

            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link
                  href="/workouts"
                  className={`transition-colors duration-200 ${
                    isWorkoutActive
                      ? "text-lime-400"
                      : "text-gray-200"
                  }`}
                >
                  Workouts
                </Link>
              </li>

              <li>
                <Link
                  href="/listed-plan"
                  className={`transition-colors duration-200 ${
                    isPlanActive
                      ? "text-lime-400"
                      : "text-gray-200"
                  }`}
                >
                  My Plan
                </Link>
              </li>
            </ul>
          </div>

         
          <div className="font-semibold text-lg">
            <Image
                  src = {Logo}
                  alt ="logo"
                  ></Image>
          </div>
        </div>

       
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">

            <li>
              <Link
                href="/workouts"
                className={`transition-colors duration-200 ${
                  isWorkoutActive
                    ? "text-lime-400"
                    : "text-gray-200"
                }`}
              >
                Workouts
              </Link>
            </li>

            <li>
              <Link
                href="/listed-plan"
                className={`transition-colors duration-200 ${
                  isPlanActive
                    ? "text-lime-400"
                    : "text-gray-200"
                }`}
              >
                My Plan
              </Link>
            </li>

          </ul>
        </div>

        
        <div className="navbar-end gap-2">

    
          <Link
            href="/listed-plan"
            className="btn hidden sm:inline-flex relative"
          >
            Plan

            {addPlan.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#ccff00] text-black text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                {addPlan.length}
              </span>
            )}
          </Link>

        
          <Link
            href="/listed-plan"
            className="btn hidden sm:inline-flex relative"
          >
            Saved

            {addSave.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#ccff00] text-black text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                {addSave.length}
              </span>
            )}
          </Link>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;