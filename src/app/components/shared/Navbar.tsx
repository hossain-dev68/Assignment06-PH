import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-base-100 shadow-sm z-50">
      <div className="navbar container mx-auto">

        {/* Left Side */}
        <div className="navbar-start">

          {/* Mobile Menu */}
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
                <Link href="">Workouts</Link>
              </li>

              <li>
                <Link href="">My Plan</Link>
              </li>
            </ul>
          </div>

          {/* Logo */}
          <div className="font-semibold text-lg">
            FITLOG
          </div>

        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="">Workouts</Link>
            </li>

            <li>
              <Link href="/listed-plan">My Plan</Link>
            </li>
          </ul>
        </div>

        {/* Right Side */}
        <div className="navbar-end gap-2">

          <button className="btn hidden sm:inline-flex">
            Plan
          </button>

          <button className="btn hidden sm:inline-flex">
            Saved
          </button>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;